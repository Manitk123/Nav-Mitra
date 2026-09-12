import prisma from "@/lib/prisma";
import Link from "next/link";
import { getApplicationsForChallenge } from "@/app/actions";

export default async function EvaluationsPage({ params }: { params: Promise<{ challengeId: string }> }) {
  const { challengeId } = await params;
  
  const challenge = await prisma.challenge.findUnique({
    where: { id: challengeId }
  });

  if (!challenge) {
    return <div className="p-10 text-center text-red-500">Challenge not found</div>;
  }

  const applications = await getApplicationsForChallenge(challengeId);

  return (
    <div className="flex-1 bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <Link href="/dept/dashboard" className="text-gov-blue hover:underline text-sm font-medium mb-4 inline-block">
              &larr; Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-text-primary">Proposal Screening</h1>
            <p className="text-text-secondary mt-1">Review startup applications for: <span className="font-semibold text-gov-blue">{challenge.title}</span></p>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-blue-800 flex items-center shadow-sm">
            <span className="text-xl mr-2">🤖</span>
            <span>The <strong>AI Startup Screener</strong> has automatically scored and ranked these proposals based on eligibility and solution alignment.</span>
          </div>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white p-10 rounded-xl border border-gray-200 text-center text-text-secondary">
            No applications received for this challenge yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {applications.map((app) => (
              <div key={app.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row relative">
                
                {/* AI Score Badge */}
                <div className="md:w-32 bg-gray-50 border-r border-gray-100 flex flex-col items-center justify-center p-6">
                  <div className={`text-3xl font-black ${
                    app.aiScore && app.aiScore >= 80 ? 'text-green-600' : 
                    app.aiScore && app.aiScore >= 60 ? 'text-orange-500' : 'text-red-500'
                  }`}>
                    {app.aiScore || 'N/A'}
                  </div>
                  <div className="text-xs text-text-secondary uppercase font-bold mt-1 tracking-wider text-center">AI Match Score</div>
                </div>

                {/* Application Details */}
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-text-primary">{app.startupName}</h2>
                    <span className="text-sm font-medium text-gray-500">DPIIT: {app.dpiitNumber}</span>
                  </div>
                  
                  <div className="flex gap-4 mb-4 text-sm text-text-secondary">
                    <div><strong>Estimated Cost:</strong> ₹{app.estimatedCost.toLocaleString()}</div>
                    <div><strong>Timeline:</strong> {app.estimatedTime} Months</div>
                    <div><strong>Submitted:</strong> {new Date(app.createdAt).toLocaleDateString()}</div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-100">
                    <h3 className="text-sm font-bold text-gov-blue mb-1 flex items-center">
                      <span className="mr-1">🤖</span> AI Summary
                    </h3>
                    <p className="text-sm text-text-secondary">{app.aiSummary || "No summary generated."}</p>
                  </div>

                  <div className="text-sm text-text-primary border-l-2 border-gray-200 pl-4 mb-6 line-clamp-3">
                    "{app.solutionDetails}"
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors border border-gray-200">
                      View Pitch Deck
                    </button>
                    <Link 
                      href={`/dept/pilot/design/${app.id}`}
                      className="bg-gov-orange hover:bg-orange-600 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
                    >
                      Accept & Structure Pilot &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
