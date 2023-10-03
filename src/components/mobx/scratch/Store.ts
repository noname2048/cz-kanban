import { Monitor } from "@/components/mobx/scratch/Monitor.ts";
import { Mouse } from "@/components/mobx/scratch/Mouse.ts";

export class Store {
  monitor: Monitor;
  mouse: Mouse;

  constructor() {
    this.monitor = new Monitor();
    this.mouse = new Mouse();
  }
}
