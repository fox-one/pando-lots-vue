export const wsBase = {} as Record<string, string>;

export function setWsBase(id: string, base: string) {
  wsBase[id] = base;
}

function execute(cb, ...args) {
  if (cb) {
    cb(...args);
  }
}

export default class Socket {
  private MAX_RETRY_NUM: number;
  private INTERVAL: number;
  private times: number;
  private timer: NodeJS.Timeout | null;
  private callbacks: any = {};
  private connecting: boolean;
  private websocket: WebSocket = {} as any;
  private url: string;
  private token: string;
  private isClose: boolean;

  public constructor() {
    this.MAX_RETRY_NUM = 10000;
    this.INTERVAL = 2000;
    this.times = 0;
    this.callbacks = {};
    this.connecting = false;
    this.url = '';
    this.token = '';
    this.timer = null;
    this.isClose = false;
  }

  public connect(url: string, token: string, opts: Record<string, Function>) {
    if (this.connecting) {
      return;
    }
    this.connecting = true;
    this.isClose = false;
    this.callbacks = opts;
    execute(this.callbacks.onconnect);
    this.websocket = new WebSocket(url, token);
    this.websocket.onopen = this._onopen.bind(this);
    this.websocket.onmessage = this._onmessage.bind(this);
    this.websocket.onerror = this._onerror.bind(this);
    this.websocket.onclose = this._onclose.bind(this);
    this.url = url;
    this.token = token;
  }

  public disconnect() {
    if (this.timer != null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.isClose = true;
    this.websocket?.close?.(1000);
  }

  public reconnect() {
    if (this.times < this.MAX_RETRY_NUM) {
      this.times++;
      this.connect(this.url, this.token, this.callbacks);
    } else {
      this.times = 0;
      execute(this.callbacks.onfail);
    }
  }

  public _onopen() {
    execute(this.callbacks.onconnected);
  }

  public _onclose() {
    this.connecting = false;
    execute(this.callbacks.onclose);
  }

  public _onmessage(evt) {
    const msg = JSON.parse(evt.data);
    execute(this.callbacks.onmessage, msg);
  }

  public _onerror() {
    if (this.isClose) return;
    execute(this.callbacks.onerror);
    this.timer = setTimeout(() => {
      this.connecting = false;
      this.reconnect();
    }, this.INTERVAL);
  }
}
