import { getDepartmentPilots } from "@/app/actions";
import PaymentsClient from "./PaymentsClient";
import Link from "next/link";

export default async function DeptPaymentsPage() {
  const pilots = await getDepartmentPilots();

  return (
    <div className="flex-1 bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/dept/dashboard" className="text-gov-blue hover:underline text-sm font-medium mb-4 inline-block">
            &larr; Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-text-primary">Milestone Payments</h1>
          <p className="text-text-secondary mt-1">Review AI-validated milestones and release funds to startups.</p>
        </div>

        {pilots.length === 0 ? (
          <div className="bg-white p-10 rounded-xl border border-gray-200 text-center text-gray-500">
            No active pilots found.
          </div>
        ) : (
          <PaymentsClient pilots={pilots} />
        )}
      </div>
    </div>
  );
}
