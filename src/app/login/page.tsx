import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Sign in to NavMitra
            </h2>
          </div>
          <p className="mt-2 text-center text-sm text-text-secondary">
            Select your portal to continue
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="flex flex-col gap-4">
            <Link 
              href="/dept/dashboard" 
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gov-blue hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gov-blue transition-colors"
            >
              Government Department Login
            </Link>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <Link 
              href="/startup/challenges" 
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gov-orange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gov-orange transition-colors"
            >
              Startup / Innovator Login
            </Link>
          </div>
        </div>
        
        <div className="mt-6 text-center text-xs text-gray-400">
          * This is a prototype. Authentication is simulated.
        </div>
      </div>
    </div>
  );
}
