import { useTeamStore } from "@/components/mobx/Leo/TermStore.tsx";
import { observer } from "mobx-react";

const TeamNameInfo = observer(() => {
  const { teamName, setMascot } = useTeamStore();
  return (
    <>
      <h1 className="mb-1 font-bold text-white">Team: {teamName}</h1>
      <input
        type="text"
        placeholder="Change mascot"
        onChange={(e) => setMascot(e.target.value)}
        className="text-black"
      />
    </>
  );
});

export default TeamNameInfo;
