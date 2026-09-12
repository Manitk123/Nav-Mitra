"use client";

import { useState } from "react";
import Link from "next/link";
import { createChallenge } from "@/app/actions";

type Challenge = {
  id: string;
  title: string;
  department: string;
  status: string;
  createdAt: Date;
  // We'll mock applications count for now
};

export default function DashboardClient({ initialChallenges }: { initialChallenges: Challenge[] }) {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    await createChallenge(formData);
    setShowForm(false);
    setIsSubmitting(false);
  };

  return (
    <div className="flex-1 bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gov-blue">Department Dashboard</h1>
            <p className="text-text-secondary mt-1">Manage your problem statements and review startup applications.</p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-gov-orange hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition-colors"
          >
            {showForm ? "Cancel" : "+ Post New Challenge"}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8 animate-in fade-in slide-in-from-top-4">
            <h2 className="text-xl font-bold text-text-primary mb-4">Draft Problem Statement</h2>
            <form action={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Problem Statement Title</label>
                <input name="title" type="text" className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-gov-blue focus:border-gov-blue outline-none" placeholder="e.g. AI-based traffic monitoring" required />
              </div>
              <input type="hidden" name="department" value="Maharashtra State Innovation Society" />
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Detailed Description & Outcomes</label>
                <textarea name="description" rows={4} className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-gov-blue focus:border-gov-blue outline-none" placeholder="Describe the operational bottleneck..." required></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Category</label>
                  <select name="category" className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-gov-blue outline-none">
                    <option value="Software">Software</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Estimated Pilot Budget (INR)</label>
                  <input name="budget" type="number" className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-gov-blue outline-none" placeholder="e.g. 500000" required />
                </div>
              </div>
              <div className="pt-2">
                <button type="submit" disabled={isSubmitting} className="bg-gov-blue hover:bg-blue-800 text-white px-6 py-2 rounded-md font-medium transition-colors disabled:opacity-50">
                  {isSubmitting ? 'Publishing...' : 'Publish Challenge'}
                </button>
              </div>
            </form>
          </div>
        )}

        <h2 className="text-xl font-bold text-text-primary mb-4">Your Challenges</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-sm text-text-secondary uppercase tracking-wider">
                  <th className="p-4 font-medium">ID</th>
                  <th className="p-4 font-medium">Title</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Posted Date</th>
                  <th className="p-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {initialChallenges.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-gray-500">No challenges posted yet.</td>
                  </tr>
                )}
                {initialChallenges.map((challenge) => (
                  <tr key={challenge.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-sm text-text-secondary">#{challenge.id.substring(0,6)}</td>
                    <td className="p-4">
                      <p className="text-sm font-medium text-text-primary">{challenge.title}</p>
                      <p className="text-xs text-text-secondary">{challenge.department}</p>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        challenge.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {challenge.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-text-secondary">{new Date(challenge.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">
                      <Link 
                        href={`/dept/evaluations/${challenge.id}`} 
                        className="text-gov-orange hover:text-orange-700 text-sm font-medium"
                      >
                        View Applications
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
