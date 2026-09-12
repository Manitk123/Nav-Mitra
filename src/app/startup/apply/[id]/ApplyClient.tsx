"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { submitApplication } from "@/app/actions";

type Challenge = {
  id: string;
  title: string;
  department: string;
};

export default function ApplyClient({ challenge }: { challenge: Challenge }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      await submitApplication(formData, challenge.id);
      alert("Application submitted successfully! Your proposal has been scored by our AI Screener.");
      router.push("/startup/challenges");
    } catch (e) {
      alert("Failed to submit application");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/startup/challenges" className="text-gov-blue hover:underline text-sm font-medium mb-4 inline-block">
            &larr; Back to Challenges
          </Link>
          <h1 className="text-3xl font-bold text-text-primary">Apply for Challenge #{challenge.id.substring(0,6)}</h1>
          <p className="text-text-secondary mt-2">
            <strong className="text-text-primary">Title:</strong> {challenge.title} <br/>
            <strong className="text-text-primary">Department:</strong> {challenge.department}
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gov-blue mb-6 border-b pb-2">Proposal Submission Form</h2>
          
          <form action={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Startup Name *</label>
                <input name="startupName" type="text" required className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-gov-orange outline-none" placeholder="Acme Corp" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">DPIIT Recognition Number *</label>
                <input name="dpiitNumber" type="text" required className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-gov-orange outline-none" placeholder="DIPP12345" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Proposed Solution Details *</label>
              <textarea name="solutionDetails" required rows={6} className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-gov-orange outline-none" placeholder="Describe your technology and how it solves the department's problem..."></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Estimated Pilot Cost (INR) *</label>
                <input name="estimatedCost" type="number" required className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-gov-orange outline-none" placeholder="e.g. 200000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Estimated Timeline (Months) *</label>
                <input name="estimatedTime" type="number" required className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-gov-orange outline-none" placeholder="e.g. 3" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Attach Pitch Deck (PDF)</label>
              <input type="file" accept=".pdf" className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-gov-orange outline-none text-sm" />
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end gap-4">
              <Link href="/startup/challenges" className="px-6 py-2.5 rounded-md font-medium text-text-secondary hover:bg-gray-100 transition-colors">
                Cancel
              </Link>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`bg-gov-orange text-white px-8 py-2.5 rounded-md font-medium transition-colors shadow-sm ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-orange-600'}`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
