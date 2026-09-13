"use client";

import Link from "next/link";

export default function LegalTemplatesPage() {
  return (
    <div className="flex-1 bg-gray-50 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 print:mb-4">
          <Link href="/dept/dashboard" className="text-gov-blue hover:underline text-sm font-medium mb-4 inline-block print:hidden">
            &larr; Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-text-primary print:text-4xl print:text-black">Standardized Legal Templates</h1>
          <p className="text-text-secondary mt-1 print:text-black">Pre-approved legal documentation for startup pilot procurement.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden print:shadow-none print:border-none print:overflow-visible">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex justify-between items-center print:border-b-2 print:border-black print:bg-white print:px-0">
            <h2 className="font-bold text-gray-800">IP Ownership & Data Sharing Agreement</h2>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">Approved by Legal</span>
          </div>
          <div className="p-8 prose max-w-none text-sm text-gray-700 print:p-0 print:pt-4 print:text-black">
            <h3 className="text-lg font-bold text-gray-900 mb-4 print:text-xl print:text-black">1. Intellectual Property (IP) Rights</h3>
            <p className="mb-4">
              <strong>1.1 Background IP:</strong> The Startup retains all rights, title, and interest in and to any pre-existing intellectual property, including algorithms, software, and proprietary technology ("Background IP") used in the execution of the Pilot.
            </p>
            <p className="mb-4">
              <strong>1.2 Foreground IP:</strong> Any intellectual property created specifically and exclusively as a deliverable for the Government Department during the Pilot ("Foreground IP") shall be jointly owned, or exclusively licensed to the Government for public utility purposes, as specified in the individual Milestone Agreement.
            </p>

            <h3 className="text-lg font-bold text-gray-900 mb-4 mt-8">2. Data Security and Confidentiality</h3>
            <p className="mb-4">
              <strong>2.1 Government Data:</strong> The Government Department shall provide access to necessary anonymized datasets ("Government Data"). The Startup shall not store, transmit, or process this data outside the territorial jurisdiction of India.
            </p>
            <p className="mb-4">
              <strong>2.2 Confidentiality:</strong> The Startup agrees to adhere to the Digital Personal Data Protection (DPDP) Act, 2023. Unauthorized sharing of Government Data with third-party APIs (including external LLMs without explicit authorization) is strictly prohibited and grounds for immediate termination of the contract.
            </p>

            <h3 className="text-lg font-bold text-gray-900 mb-4 mt-8">3. Rules & Regulations (Dos & Don'ts)</h3>
            <div className="bg-orange-50 border border-orange-200 p-4 rounded-md mb-4">
              <h4 className="font-bold text-orange-800 mb-2">What NOT to do (Strict Prohibitions):</h4>
              <ul className="list-disc pl-5 space-y-1 text-orange-900">
                <li>Do NOT outsource the core pilot development to unverified third-party vendors.</li>
                <li>Do NOT use actual citizen Personally Identifiable Information (PII) in testing environments.</li>
                <li>Do NOT upload fake progress images/videos. All milestone submissions must be done via Live Camera Capture.</li>
              </ul>
            </div>
            <div className="bg-green-50 border border-green-200 p-4 rounded-md">
              <h4 className="font-bold text-green-800 mb-2">What TO do (Compliance & Execution):</h4>
              <ul className="list-disc pl-5 space-y-1 text-green-900">
                <li>Submit weekly progress summaries mapping directly to the AI-generated pilot checkpoints.</li>
                <li>Ensure all code repositories associated with Foreground IP are handed over upon milestone completion.</li>
                <li>Cooperate fully with the assigned Field Verification Officer during on-site inspections.</li>
              </ul>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-4 print:hidden">
            <button 
              onClick={() => window.print()}
              className="px-4 py-2 text-sm font-bold text-gray-600 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              Download PDF
            </button>
            <button 
              onClick={() => {
                alert("Contract successfully attached to the pilot! Notifications sent to Startup and Field Verification Officer.");
                window.location.href = '/dept/payments';
              }}
              className="px-4 py-2 text-sm font-bold text-white bg-gov-blue rounded-md shadow-sm hover:bg-blue-800"
            >
              Attach to Pilot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
