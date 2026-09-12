import { getActiveChallenges } from "@/app/actions";
import DashboardClient from "./DashboardClient";

export default async function DeptDashboard() {
  const challenges = await getActiveChallenges();
  return <DashboardClient initialChallenges={challenges} />;
}
