import Athlete from "@/components/mobx/Leo/Athlete.ts";
import TradeForm from "@/components/mobx/Leo/TradeForm.tsx";
import { observer } from "mobx-react";

const lebronJames = new Athlete("lebron James", 37);
const stephCurry = new Athlete("Steph Curry", 34);

const Roster = observer(() => {
  return (
    <table>
      <thead>
        <tr>
          <th className="border p-2 text-left">Name</th>
          <th className="border p-2 text-left">Age</th>
          <th className="border p-2 text-left">Teams</th>
          <th className="border p-2 text-left">Trade Form</th>
          <th className="border p-2 text-left">Is it their birthday?</th>
        </tr>
      </thead>
      <tbody>
        {[lebronJames, stephCurry].map((athlete) => {
          return (
            <tr key={athlete.name}>
              <td className="border p-2 text-left">{athlete.name}</td>
              <td className="border p-2 text-left">{athlete.age}</td>
              <td className="border p-2 text-left">{athlete.teamHistory}</td>
              <td>
                <TradeForm athlete={athlete} />
              </td>
              <td className="border p-2 text-left">
                <button
                  className="w-full hover:text-blue-500"
                  type="button"
                  onClick={() => athlete.wishHappyBirthday()}
                >
                  Wish happy birthday 🎉
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});

export default Roster;
