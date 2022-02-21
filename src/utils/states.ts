export class State {
  private _chats: { [key: string]: API.Message[] } = {};
  private _groups: { [key: string]: API.GroupInfo } = {};

  public constructor() {
    this._chats = {};
    this._groups = {};
  }

  public getChat(id: string) {
    return this._chats[id];
  }

  public setChat(id: string, messages: API.Message[]) {
    this._chats[id] = messages;
  }

  public getGroup(id: string) {
    return this._groups[id];
  }

  public setGroup(id: string, group: API.GroupInfo) {
    this._groups[id] = group;
  }
}

export default new State();