export class Tab {
  id: number;
  key: string;
  header: string;
  type: string;
  args = {};
  tab_sys: any;

  constructor(tab_sys, type, args) {
      this.header = '^_^';
      this.type = type;
      this.tab_sys = tab_sys;
      this.args = args;
  }

  reborn(type, args) {
      this.header = '^_^';
      this.type = type;
      this.args = args;
  }
}
