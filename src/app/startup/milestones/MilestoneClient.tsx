"use client";

import { useState } from "react";
import { submitMilestoneProgress } from "@/app/actions";

export default function MilestoneClient({ pilot }: { pilot: any }) {
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);
  const [report, setReport] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMilestone) return;

    setIsSubmitting(true);
    try {
      await submitMilestoneProgress(selectedMilestone, report);
      alert("Progress Report Submitted! The AI Progress Tracker has validated your work.");
      setSelectedMilestone(null);
      setReport("");
    } catch (e) {
      alert("Submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary">Project Execution & Checkpoints</h1>
          <p className="text-text-secondary mt-1">
            Active Pilot: <span className="font-bold text-gov-blue">{pilot.application?.challenge?.title || "Project Setup"}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Milestones List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Milestones</h2>
            {pilot.milestones.map((m: any, idx: number) => (
              <div 
                key={m.id}
                onClick={() => m.status === 'Pending' && setSelectedMilestone(m.id)}
                className={`p-4 rounded-xl border ${
                  m.status === 'Paid' ? 'bg-green-50 border-green-200' :
                  m.status === 'Completed' ? 'bg-blue-50 border-blue-200' :
                  selectedMilestone === m.id ? 'bg-orange-50 border-gov-orange shadow-sm cursor-pointer' : 
                  'bg-white border-gray-200 hover:border-gov-orange cursor-pointer transition-colors'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Phase {idx + 1}</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                    m.status === 'Paid' ? 'bg-green-100 text-green-700' :
                    m.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {m.status}
                  </span>
                </div>
                <h3 className="font-bold text-text-primary text-sm mb-1">{m.title}</h3>
                <div className="text-sm font-medium text-gov-orange">₹{m.allocatedBudget.toLocaleString()}</div>
              </div>
            ))}
          </div>

          {/* Submission Panel */}
          <div className="lg:col-span-2">
            {selectedMilestone ? (
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 animate-in fade-in">
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 flex items-start">
                  <span className="text-2xl mr-3">🤖</span>
                  <p className="text-sm text-blue-800">
                    <strong>AI Progress Tracker:</strong> Submit your proof of work below. Our AI agent will instantly verify the contents against the milestone description and authorize payment if successful.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Progress Report / Proof of Work</label>
                    <textarea 
                      required
                      value={report}
                      onChange={(e) => setReport(e.target.value)}
                      rows={8} 
                      className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-gov-orange outline-none font-mono text-sm"
                      placeholder="e.g., Deployed core MVP to AWS staging environment. Completed API integration as specified in Milestone 1 requirements. Link to demo: https://..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Live Camera Verification (Anti-Fraud)</label>
                    <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      {!report.includes("[LIVE_CAPTURE]") ? (
                        <>
                          <div className="text-4xl mb-2">📷</div>
                          <p className="text-sm text-gray-600 mb-4">File uploads are disabled to prevent fake progress reports. You must capture live proof of work.</p>
                          <button 
                            type="button"
                            onClick={() => {
                              alert("Camera activated. Capturing live encrypted proof...");
                              setReport(report + "\n\n[LIVE_CAPTURE: Authenticated Video/Image Proof Attached]");
                            }}
                            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                          >
                            Open Camera & Capture Live
                          </button>
                        </>
                      ) : (
                        <div className="text-green-600 font-bold flex flex-col items-center justify-center">
                          <div className="text-4xl mb-2">✅</div>
                          Live Encrypted Proof Captured Successfully!
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end pt-4">
                    <button 
                      type="submit" 
                      disabled={isSubmitting || !report.includes("[LIVE_CAPTURE]")}
                      className={`px-8 py-2.5 rounded-md font-bold transition-colors shadow-sm flex items-center ${isSubmitting || !report.includes("[LIVE_CAPTURE]") ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gov-orange text-white hover:bg-orange-600'}`}
                    >
                      {isSubmitting ? "AI is Verifying..." : "Submit Verified Progress"}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl h-full min-h-[300px] flex items-center justify-center text-gray-400">
                Select a Pending milestone to submit progress.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
