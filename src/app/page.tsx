import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Hero Section */}
      <section className="w-full bg-gov-blue text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Bridging Government with <span className="text-gov-orange">Startup Innovation</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-10 text-blue-100">
            A transparent, compliant, and startup-friendly public procurement mechanism. Identify, pilot, and scale novel solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/login" className="bg-gov-orange hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors text-lg">
              Get Started
            </Link>
            <Link href="/startup/challenges" className="bg-white text-gov-blue hover:bg-gray-100 font-bold py-3 px-8 rounded-lg shadow-lg transition-colors text-lg">
              Browse Challenges
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 flex-1">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gov-blue mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="h-14 w-14 bg-blue-100 text-gov-blue rounded-full flex items-center justify-center mb-6 text-2xl font-bold">1</div>
              <h3 className="text-xl font-bold mb-3 text-text-primary">Problem Statements</h3>
              <p className="text-text-secondary">Government departments post outcome-based challenges targeting operational bottlenecks.</p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="h-14 w-14 bg-orange-100 text-gov-orange rounded-full flex items-center justify-center mb-6 text-2xl font-bold">2</div>
              <h3 className="text-xl font-bold mb-3 text-text-primary">Startup Discovery</h3>
              <p className="text-text-secondary">Eligible startups apply with novel technologies. Expert panels evaluate and select the best fit.</p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="h-14 w-14 bg-green-100 text-success-green rounded-full flex items-center justify-center mb-6 text-2xl font-bold">3</div>
              <h3 className="text-xl font-bold mb-3 text-text-primary">Pilot & Procure</h3>
              <p className="text-text-secondary">Structure controlled pilots with milestone-based payments, paving the way for scale-up.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
