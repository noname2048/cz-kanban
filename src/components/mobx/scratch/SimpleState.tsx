import { makeObservable, observable, action } from "mobx";
import { observer } from "mobx-react";
import { createContext, useContext } from "react";

class Monitor {
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

const monitor = new Monitor();

const SimpleState = observer(() => {
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded border border-white p-2">
        {monitor.width} * {monitor.height}
      </div>
      <input
        value={monitor.width}
        className="rounded border border-white p-2 text-black"
        onChange={(e) => {
          const val = Number(e.target.value);
          if (!Number.isNaN(val)) monitor.setWidth(val);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur();
          }
        }}
      />
      <input
        value={monitor.height}
        className="rounded border border-white p-2 text-black"
        onChange={(e) => {
          const val = Number(e.target.value);
          if (!Number.isNaN(val)) monitor.setHeight(val);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur();
          }
        }}
      />
    </div>
  );
});

export default SimpleState;
