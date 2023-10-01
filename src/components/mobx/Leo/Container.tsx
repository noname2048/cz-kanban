import Athlete from "@/components/mobx/Leo/Athlete.ts";
import MoneyForm from "@/components/mobx/Leo/MoneyForm.tsx";
import Roster from "@/components/mobx/Leo/Roster.tsx";
import TeamNameInfo from "@/components/mobx/Leo/TeamInfo.tsx";
import { TeamStoreProvider } from "@/components/mobx/Leo/TermStore.tsx";

const lebronJames = new Athlete("lebron James", 37, 5);
const stephCurry = new Athlete("Steph Curry", 34, 4);

function getPlayersFromBackend(): Athlete[] {
  return [lebronJames, stephCurry];
}

export default function Container() {
  const players = getPlayersFromBackend();
  return (
    <>
      <TeamStoreProvider players={players}>
        <TeamNameInfo />
        <Roster />
        <MoneyForm />
      </TeamStoreProvider>
    </>
  );
}
