import Athlete from "@/components/mobx/Leo/Athlete.ts";
import { useTeamStore } from "@/components/mobx/Leo/TermStore.tsx";
import { action, observable } from "mobx";
import { observer } from "mobx-react";

type FormState = {
  name: string;
  age: number;
  salary: number;
};

const initialState: FormState = {
  name: "",
  age: 0,
  salary: 0,
};

let formState: FormState = observable({
  name: "",
  age: 0,
  salary: 0,
});

const MoneyForm = observer(() => {
  const { totalYearlyCost, addPlayer } = useTeamStore();

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="mb-0 text-center text-5xl">Money Talks</h1>
      <p>Total: {totalYearlyCost}</p>
      <input
        className="h-[40px] text-black"
        type="text"
        placeholder="Player name..."
        value={formState.name}
        onChange={action((e) => {
          formState.name = e.target.value;
        })}
      />
      <input
        className="h-[40px] text-black"
        type="number"
        placeholder="Player age..."
        value={formState.age}
        onChange={action((e) => {
          formState.age = Number(e.target.value);
        })}
      />
      <input
        className="h-[40px] text-black"
        type="number"
        placeholder="Player salary..."
        value={formState.salary}
        onChange={action((e) => {
          formState.salary = Number(e.target.value);
        })}
      />
      <button
        className="cursor-pointer rounded bg-gray-400 p-4 hover:text-blue-500"
        type="button"
        onClick={action(() => {
          addPlayer(
            new Athlete(formState.name, formState.age, formState.salary),
          );
          formState = initialState;
        })}
      >
        Calculate total
      </button>
    </div>
  );
});

export default MoneyForm;
