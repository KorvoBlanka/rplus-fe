export class Tab {
  id: number;
  key: string;
  header: string;
  type: string;
  args: any;
  tabSys: any;

  constructor(tabSys, type, args) {
      this.header = 'Loading...';
      this.type = type;
      this.tabSys = tabSys;
      this.args = args;
  }

  reborn(type, args) {
      this.header = 'Loading...';
      this.type = type;
      this.args = args;
  }
}
