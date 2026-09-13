"use client";

import { useState, use } from "react";
import Link from "next/link";
import { generatePilotStructure, getPilotDetails, updateMilestones } from "@/app/actions";

export default function PilotDesignSandbox({ params }: { params: Promise<{ applicationId: string }> }) {
  const { applicationId } = use(params);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [pilot, setPilot] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const generatedPilot = await generatePilotStructure(applicationId);
      // Re-fetch full details to get the milestones
      const details = await getPilotDetails(applicationId);
      setPilot(details);
    } catch (e) {
      alert("Failed to structure pilot. See console.");
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveEdits = async () => {
    setIsSaving(true);
    try {
      await updateMilestones(pilot.milestones, applicationId);
      setIsEditing(false);
    } catch(e) {
      alert("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  const updateMilestoneField = (id: string, field: string, value: number) => {
    setPilot((prev: any) => ({
      ...prev,
      milestones: prev.milestones.map((m: any) => m.id === id ? { ...m, [field]: value || 0 } : m)
    }));
  };

  return (
    <div className="flex-1 bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/dept/dashboard" className="text-gov-blue hover:underline text-sm font-medium mb-4 inline-block">
            &larr; Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-text-primary">Pilot Design Sandbox</h1>
          <p className="text-text-secondary mt-2">
            Structure the pilot project and establish payment milestones for the selected startup.
          </p>
        </div>

        {!pilot ? (
          <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-200 text-center animate-in fade-in">
            <div className="text-6xl mb-4">🤖</div>
            <h2 className="text-2xl font-bold text-gov-blue mb-2">AI Pilot Structurer</h2>
            <p className="text-text-secondary max-w-lg mx-auto mb-8">
              Our AI agent will automatically divide the startup's proposal into actionable checkpoints, estimating the time and budget required for each phase to ensure a legally compliant milestone-based contract.
            </p>
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`bg-gov-orange text-white px-8 py-3 rounded-lg font-bold transition-all shadow-md flex items-center justify-center mx-auto ${isGenerating ? 'opacity-75' : 'hover:bg-orange-600 hover:-translate-y-0.5'}`}
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Proposal & Generating...
                </>
              ) : (
                "Generate Pilot Structure with AI"
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-in slide-in-from-bottom-4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-green-200 border-l-4 border-l-green-500">
              <h2 className="text-xl font-bold text-green-700 flex items-center">
                <span className="mr-2">✓</span> Pilot Structure Generated Successfully
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                The AI has successfully broken the project into {pilot.milestones.length} distinct milestones. Total Budget: <strong className="text-gov-orange">₹{pilot.totalBudget.toLocaleString()}</strong>.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-text-primary mb-6 border-b pb-2">Proposed Milestones (Checkpoints)</h3>
              
              <div className="space-y-6">
                {pilot.milestones.map((m: any, index: number) => (
                  <div key={m.id} className="relative pl-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-[-24px] before:w-0.5 before:bg-gray-200 last:before:hidden">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-gov-blue text-white flex items-center justify-center text-xs font-bold ring-4 ring-white">
                      {index + 1}
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gov-blue">{m.title}</h4>
                        {isEditing ? (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-500">₹</span>
                            <input 
                              type="number" 
                              value={m.allocatedBudget} 
                              onChange={(e) => updateMilestoneField(m.id, 'allocatedBudget', parseInt(e.target.value))}
                              className="border border-gray-300 rounded px-2 py-1 text-sm font-bold text-gov-orange w-32 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                          </div>
                        ) : (
                          <span className="bg-orange-50 text-gov-orange px-3 py-1 rounded-full text-sm font-bold border border-orange-100">
                            ₹{m.allocatedBudget.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-text-secondary mb-3">{m.description}</p>
                      <div className="text-xs text-gray-500 font-medium flex items-center">
                        Estimated Duration: 
                        {isEditing ? (
                          <input 
                            type="number" 
                            value={m.durationDays} 
                            onChange={(e) => updateMilestoneField(m.id, 'durationDays', parseInt(e.target.value))}
                            className="border border-gray-300 rounded px-2 py-1 ml-2 text-xs w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <span className="ml-1">{m.durationDays}</span>
                        )} Days
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex justify-end gap-4 border-t border-gray-100 pt-6">
                {isEditing ? (
                  <button 
                    onClick={handleSaveEdits}
                    disabled={isSaving}
                    className="px-6 py-2.5 rounded-md font-medium text-white bg-green-600 hover:bg-green-700 transition-colors flex items-center shadow-sm"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                ) : (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2.5 rounded-md font-medium text-text-secondary border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    Edit Milestones
                  </button>
                )}
                <button 
                  onClick={() => {
                    alert("Pilot Contract Generated Successfully! Standard IP & Data-sharing clauses applied. Redirecting to Legal Templates vault...");
                    window.location.href = '/dept/templates';
                  }}
                  className="bg-gov-blue hover:bg-blue-800 text-white px-8 py-2.5 rounded-md font-medium transition-colors shadow-sm"
                >
                  Finalize & Generate Contract
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
