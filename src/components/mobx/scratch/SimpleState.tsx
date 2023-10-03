import { Store } from "@/components/mobx/scratch/Store.ts";
import {
  StoreContext,
  useStore,
} from "@/components/mobx/scratch/StoreContext.ts";
import { observer } from "mobx-react";

const SimpleState = observer(() => {
  return (
    <StoreContext.Provider value={new Store()}>
      <SimpleStateView />
    </StoreContext.Provider>
  );
});

const SimpleStateView = observer(() => {
  const { monitor, mouse } = useStore();
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
      <div className="rounded border border-white p-2">dpi: {mouse.dpi}</div>
      <input
        value={mouse.dpi}
        className="rounded border border-white p-2 text-black"
        onChange={(e) => {
          const val = Number(e.target.value);
          if (!Number.isNaN(val)) mouse.setDpi(val);
        }}
      />
    </div>
  );
});

export default SimpleState;
