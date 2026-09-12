import prisma from "@/lib/prisma";
import ApplyClient from "./ApplyClient";
import Link from "next/link";

export default async function ApplyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const challenge = await prisma.challenge.findUnique({ where: { id } });

  if (!challenge) {
    return (
      <div className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Challenge Not Found</h1>
          <Link href="/startup/challenges" className="text-gov-blue mt-4 inline-block hover:underline">
            Return to Challenges
          </Link>
        </div>
      </div>
    );
  }

  return <ApplyClient challenge={challenge} />;
}
