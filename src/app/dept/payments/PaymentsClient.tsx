"use client";

import { useState } from "react";
import { releasePayment } from "@/app/actions";

export default function PaymentsClient({ pilots }: { pilots: any[] }) {
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handlePayment = async (milestoneId: string) => {
    setProcessingId(milestoneId);
    try {
      // Simulate payment gateway delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      await releasePayment(milestoneId);
      alert("Funds successfully transferred to the startup!");
    } catch (e) {
      alert("Payment failed.");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-8">
      {pilots.map((pilot) => (
        <div key={pilot.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 p-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-gov-blue">{pilot.application?.challenge?.title || "Project"}</h2>
                <p className="text-sm font-medium text-gray-600 mt-1">Contractor: {pilot.application.startupName}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1">Total Pilot Budget</div>
                <div className="text-xl font-bold text-text-primary">₹{pilot.totalBudget.toLocaleString()}</div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Payment Milestones</h3>
            <p className="text-xs font-bold text-gov-orange mb-4 bg-orange-50 inline-block px-2 py-1 rounded">👤 Human Intervention: Field Verification Officer Role</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-sm text-text-secondary">
                    <th className="p-3 font-medium">Phase</th>
                    <th className="p-3 font-medium">Amount</th>
                    <th className="p-3 font-medium">AI Pre-Screening</th>
                    <th className="p-3 font-medium text-right">Human Officer Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pilot.milestones.map((m: any, idx: number) => (
                    <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3">
                        <div className="font-bold text-text-primary text-sm">{m.title}</div>
                      </td>
                      <td className="p-3 font-bold text-gov-orange">
                        ₹{m.allocatedBudget.toLocaleString()}
                      </td>
                      <td className="p-3">
                        {m.status === 'Completed' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
                            ✓ Pre-Verified by AI
                          </span>
                        ) : m.status === 'Paid' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                            $ Paid
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-600">
                            Pending Work
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        {m.status === 'Completed' ? (
                          <button 
                            onClick={() => handlePayment(m.id)}
                            disabled={processingId === m.id}
                            className={`bg-green-600 text-white px-4 py-2 rounded-md text-sm font-bold shadow-sm transition-all ${processingId === m.id ? 'opacity-70' : 'hover:bg-green-700 hover:-translate-y-0.5'}`}
                          >
                            {processingId === m.id ? 'Processing...' : 'Release Funds'}
                          </button>
                        ) : m.status === 'Paid' ? (
                          <button disabled className="text-sm font-bold text-gray-400 cursor-not-allowed">
                            Settled
                          </button>
                        ) : (
                          <button disabled className="text-sm font-bold text-gray-300 cursor-not-allowed">
                            Locked
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
