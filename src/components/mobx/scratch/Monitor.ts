import { action, makeObservable, observable } from "mobx";

export class Monitor {
  width: number;
  height: number;
  constructor() {
    this.width = 1920;
    this.height = 1080;
    makeObservable(this, {
      width: observable,
      height: observable,
      setWidth: action,
      setHeight: action,
    });
  }
  setWidth(width: number) {
    this.width = width;
  }
  setHeight(height: number) {
    this.height = height;
  }
}
