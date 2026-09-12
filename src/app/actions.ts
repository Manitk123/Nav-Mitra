'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createChallenge(formData: FormData) {
  const title = formData.get('title') as string
  const department = formData.get('department') as string
  const category = formData.get('category') as string
  const budget = parseInt(formData.get('budget') as string)
  const description = formData.get('description') as string

  if (!title || !department || !category || isNaN(budget) || !description) {
    throw new Error('Missing required fields')
  }

  await prisma.challenge.create({
    data: {
      title,
      department,
      category,
      budget,
      description,
    },
  })

  revalidatePath('/dept/dashboard')
  revalidatePath('/startup/challenges')
}

export async function getActiveChallenges() {
  return await prisma.challenge.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export async function submitApplication(formData: FormData, challengeId: string) {
  const startupName = formData.get('startupName') as string
  const dpiitNumber = formData.get('dpiitNumber') as string
  const solutionDetails = formData.get('solutionDetails') as string
  const estimatedCost = parseInt(formData.get('estimatedCost') as string)
  const estimatedTime = parseInt(formData.get('estimatedTime') as string)
  const pitchDeckUrl = formData.get('pitchDeckUrl') as string

  if (!startupName || !dpiitNumber || !solutionDetails || isNaN(estimatedCost) || isNaN(estimatedTime)) {
    throw new Error('Missing required fields')
  }

  // AI Mocking Feature (as approved in the implementation plan)
  // We'll generate a random AI score to demonstrate the AI Startup Screener feature.
  const aiScore = Math.floor(Math.random() * (95 - 60 + 1) + 60); // Random score between 60 and 95
  const aiSummary = aiScore > 80 
      ? "Strongly aligned with the problem statement. The technical approach is viable."
      : "Moderate alignment. The cost estimation requires further review during Round 1.";

  await prisma.application.create({
    data: {
      challengeId,
      startupName,
      dpiitNumber,
      solutionDetails,
      estimatedCost,
      estimatedTime,
      pitchDeckUrl,
      aiScore,
      aiSummary
    },
  })

  // We could redirect or just revalidate path
  revalidatePath('/dept/dashboard')
}

export async function getApplicationsForChallenge(challengeId: string) {
  return await prisma.application.findMany({
    where: { challengeId },
    orderBy: { aiScore: 'desc' }, // Sort by AI Score descending
  });
}

export async function generatePilotStructure(applicationId: string) {
  // Check if pilot already exists
  const existingPilot = await prisma.pilot.findUnique({
    where: { applicationId }
  });

  if (existingPilot) {
    return existingPilot;
  }

  const application = await prisma.application.findUnique({
    where: { id: applicationId }
  });

  if (!application) throw new Error("Application not found");

  // Create Pilot
  const pilot = await prisma.pilot.create({
    data: {
      applicationId: application.id,
      challengeId: application.challengeId,
      totalBudget: application.estimatedCost,
      status: "Structuring"
    }
  });

  // Mock AI Structurer: Split cost and time into 3 distinct milestones
  const splitBudget = Math.floor(application.estimatedCost / 3);
  const splitDays = Math.floor((application.estimatedTime * 30) / 3); // Convert months to days

  const milestonesData = [
    {
      pilotId: pilot.id,
      title: "Phase 1: Architecture & Design",
      description: "Finalize technical architecture and provision cloud resources.",
      allocatedBudget: splitBudget,
      durationDays: splitDays,
      orderIndex: 1
    },
    {
      pilotId: pilot.id,
      title: "Phase 2: Core Development MVP",
      description: "Develop the core functionality and integrate primary APIs.",
      allocatedBudget: splitBudget,
      durationDays: splitDays,
      orderIndex: 2
    },
    {
      pilotId: pilot.id,
      title: "Phase 3: Testing & Handover",
      description: "Conduct UAT, security audits, and deploy to staging for department review.",
      allocatedBudget: application.estimatedCost - (splitBudget * 2), // Remainder
      durationDays: splitDays,
      orderIndex: 3
    }
  ];

  await prisma.milestone.createMany({
    data: milestonesData
  });

  revalidatePath(`/dept/pilot/design/${applicationId}`);
  return pilot;
}

export async function getPilotDetails(applicationId: string) {
  return await prisma.pilot.findUnique({
    where: { applicationId },
    include: {
      milestones: {
        orderBy: { orderIndex: 'asc' }
      },
      application: true
    }
  });
}
