function execute(cb, ...args) {
  if (cb) {
    cb(...args);
  }
}

export default class Socket {
  private MAX_RETRY_NUM: number;
  private INTERVAL: number;
  private times: number;
  private callbacks: any = {};
  private connecting: boolean;
  private websocket: WebSocket = {} as any;
  private url: string;
  private token: string;

  public constructor() {
    this.MAX_RETRY_NUM = 3;
    this.INTERVAL = 1000;
    this.times = 0;
    this.callbacks = {};
    this.connecting = false;
    this.url = '';
    this.token = '';
  }

  public connect(url: string, token: string, opts: Record<string, Function>) {
    if (this.connecting) {
      return;
    }
    this.connecting = true;
    this.callbacks = opts;
    execute(this.callbacks.onconnect);
    this.websocket = new WebSocket(url, token);
    this.websocket.onopen = this._onopen.bind(this);
    this.websocket.onclose = this._onclose.bind(this);
    this.websocket.onmessage = this._onmessage.bind(this);
    this.websocket.onerror = this._onerror.bind(this);
    this.url = url;
    this.token = token;
  }

  public disconnect() {
    this.websocket?.close?.(1000);
  }

  public reconnect() {
    if (this.times < this.MAX_RETRY_NUM) {
      this.times += 1;
      this.connect(this.url, this.token, this.callbacks);
    } else {
      this.times = 0;
      execute(this.callbacks.onfail);
    }
  }

  public _onopen() {
    execute(this.callbacks.onconnected);
  }

  public _onmessage(evt) {
    const msg = JSON.parse(evt.data);
    execute(this.callbacks.onmessage, msg);
  }

  public _onerror() {
    setTimeout(() => {
      this.reconnect();
    }, this.INTERVAL);
  }

  public _onclose() {
    setTimeout(() => {
      this.reconnect();
    }, this.INTERVAL);
  }
}
