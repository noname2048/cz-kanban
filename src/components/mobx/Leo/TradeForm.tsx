import Athlete from "@/components/mobx/Leo/Athlete.ts";
import { observer } from "mobx-react";
import { useState } from "react";

type Props = {
  athlete: Athlete;
};

const TradeForm = observer(({ athlete }: Props) => {
  const [teamName, setTeamName] = useState<string>("");

  return (
    <>
      <input
        className="text-black"
        type="text"
        placeholder="Team name..."
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />
      <span>
        <button type="button" onClick={() => athlete.tradePlayer(teamName)}>
          Trade
        </button>
      </span>
    </>
  );
});

export default TradeForm;
