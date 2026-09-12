import Link from "next/link";
import { getActiveChallenges } from "@/app/actions";

export default async function StartupChallenges() {
  const activeChallenges = await getActiveChallenges();

  return (
    <div className="flex-1 bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gov-blue">Startup Portal: Active Challenges</h1>
          <p className="text-text-secondary mt-1">Discover outcome-based problem statements from government departments.</p>
        </div>

        {/* Filters/Search Mock */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8 flex flex-col sm:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Search challenges..." 
            className="flex-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-gov-orange focus:border-gov-orange outline-none"
          />
          <select className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-gov-orange outline-none bg-white">
            <option>All Categories</option>
            <option>Software</option>
            <option>Hardware</option>
          </select>
          <button className="bg-gray-100 hover:bg-gray-200 text-text-primary px-6 py-2 rounded-md font-medium transition-colors">
            Filter
          </button>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeChallenges.length === 0 && (
            <div className="col-span-full text-center p-8 text-gray-500 bg-white rounded-xl border border-gray-200">
              No active challenges found. Check back later!
            </div>
          )}
          {activeChallenges.map((challenge) => (
            <div key={challenge.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-gov-blue mb-2">
                    {challenge.category}
                  </span>
                  <h2 className="text-xl font-bold text-text-primary">{challenge.title}</h2>
                  <p className="text-sm text-text-secondary mt-1">{challenge.department}</p>
                </div>
                <span className="text-sm font-bold text-gov-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                  ₹{challenge.budget.toLocaleString()}
                </span>
              </div>
              
              <p className="text-text-secondary text-sm mb-6 flex-1">
                {challenge.description}
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <div className="text-sm">
                  <span className="text-text-secondary">Posted: </span>
                  <span className="font-medium text-text-primary">{new Date(challenge.createdAt).toLocaleDateString()}</span>
                </div>
                <Link 
                  href={`/startup/apply/${challenge.id}`}
                  className="bg-gov-orange hover:bg-orange-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
