"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  
  const isPublicPage = pathname === "/" || pathname === "/login";
  const isDept = pathname.startsWith("/dept");
  const isStartup = pathname.startsWith("/startup");

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gov-blue">Nav</span>
              <span className="text-2xl font-bold text-gov-orange">Mitra</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {/* Startup & Public Links */}
            {(isPublicPage || isStartup) && (
              <Link href="/startup/challenges" className="text-text-secondary hover:text-gov-blue px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Browse Challenges
              </Link>
            )}

            {/* Startup Only Links */}
            {isStartup && (
              <Link href="/startup/milestones" className="text-text-secondary hover:text-gov-blue px-3 py-2 rounded-md text-sm font-medium transition-colors">
                My Projects
              </Link>
            )}

            {/* Department Only Links */}
            {isDept && (
              <Link href="/dept/dashboard" className="text-text-secondary hover:text-gov-blue px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Dashboard
              </Link>
            )}

            {/* Authentication Buttons */}
            {isPublicPage ? (
              <Link href="/login" className="bg-gov-blue text-white hover:bg-blue-800 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
                Sign In
              </Link>
            ) : (
              <Link href="/" className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm border border-red-200">
                Sign Out
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
