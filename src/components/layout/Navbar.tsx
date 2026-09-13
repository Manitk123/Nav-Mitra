"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  // Simple check: If we are not on the homepage or login page, we are 'logged in' for the demo
  const isLoggedIn = pathname !== "/" && pathname !== "/login";

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gov-blue">Nav-</span>
              <span className="text-2xl font-bold text-gov-orange">Mitra</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/startup/challenges" className="text-text-secondary hover:text-gov-blue px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Browse Challenges
            </Link>
            {isLoggedIn && (
              <Link href="/startup/milestones" className="text-text-secondary hover:text-gov-blue px-3 py-2 rounded-md text-sm font-medium transition-colors">
                My Projects
              </Link>
            )}
            <Link href="/login" className="bg-gov-blue text-white hover:bg-blue-800 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
