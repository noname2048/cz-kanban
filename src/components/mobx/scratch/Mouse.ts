import { action, makeObservable, observable } from "mobx";

export class Mouse {
  dpi: number;

  constructor() {
    this.dpi = 800;
    makeObservable(this, {
      dpi: observable,
      setDpi: action,
    });
  }

  setDpi(dpi: number) {
    this.dpi = dpi;
  }
}
