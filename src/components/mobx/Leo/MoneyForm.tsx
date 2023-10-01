import { action, computed, toJS } from "mobx";
import { observer } from "mobx-react";

type FormState = {
  total: number;
  years: number;
  salary: number;
};

const formState: FormState = {
  total: 0,
  years: 0,
  salary: 0,
};

const MoneyForm = observer(() => {
  const totalValue = computed(() => formState.salary * formState.years);
  const updateYears = action((value: number) => {
    formState.years = value;
  });
  const updateSalary = action((value: number) => {
    formState.salary = value;
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="mb-0 text-center text-5xl">Money Talks</h1>
      <p>Total: {toJS<Number>(totalValue)}</p>
      <input
        className="h-[40px] text-black"
        type="number"
        placeholder="Years..."
        value={formState.years}
        onChange={(e) => {
          updateYears(Number(e.target.value));
        }}
      />
      <input
        className="h-[40px] text-black"
        type="number"
        placeholder="Yearly salary..."
        value={formState.salary}
        onChange={(e) => {
          updateSalary(Number(e.target.value));
        }}
      />
      {/*<button*/}
      {/*  className="cursor-pointer rounded bg-gray-400 p-4 hover:text-blue-500"*/}
      {/*  type="button"*/}
      {/*>*/}
      {/*  Calculate total*/}
      {/*</button>*/}
    </div>
  );
});

export default MoneyForm;
