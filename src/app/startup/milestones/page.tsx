import { getStartupPilots } from "@/app/actions";
import MilestoneClient from "./MilestoneClient";

export default async function StartupMilestonesPage() {
  const pilots = await getStartupPilots();
  
  if (pilots.length === 0) {
    return (
      <div className="flex-1 bg-gray-50 flex items-center justify-center p-10">
        <div className="bg-white p-10 rounded-xl text-center border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-2">No Active Pilots Found</h2>
          <p className="text-gray-500">Apply to a challenge to get started.</p>
        </div>
      </div>
    );
  }

  // Pass the first active pilot
  return <MilestoneClient pilot={pilots[0]} />;
}
