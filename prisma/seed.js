const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding real DPIIT startups and multiple challenges...");

  // Clear existing data for a fresh seed (Optional but good for idempotency)
  await prisma.milestone.deleteMany();
  await prisma.pilot.deleteMany();
  await prisma.application.deleteMany();
  await prisma.challenge.deleteMany();

  // 1. Challenges
  const c1 = await prisma.challenge.create({
    data: {
      title: 'AI Solution for Urban Traffic Violations',
      description: 'We need an AI-powered system capable of real-time detection of traffic violations using existing CCTV infrastructure across metropolitan cities.',
      budget: 6000000,
      department: 'Ministry of Road Transport and Highways',
      category: 'Artificial Intelligence',
      status: 'Active'
    }
  });

  const c2 = await prisma.challenge.create({
    data: {
      title: 'Blockchain for Land Registry Records',
      description: 'Develop a tamper-proof, decentralized land registry system to eliminate property fraud and ensure transparent record keeping.',
      budget: 8500000,
      department: 'Ministry of Rural Development',
      category: 'Blockchain',
      status: 'Active'
    }
  });

  const c3 = await prisma.challenge.create({
    data: {
      title: 'Drone-based Crop Disease Detection',
      description: 'Deploy specialized agricultural drones equipped with multispectral cameras to identify crop diseases early across 50,000 hectares of farmland.',
      budget: 4500000,
      department: 'Ministry of Agriculture',
      category: 'Hardware / Drones',
      status: 'Active'
    }
  });

  // 2. Startups for Challenge 1 (AI Traffic)
  const startups1 = [
    { name: 'Pixxel Space', dpiit: 'DIPP10293', tech: 'AI / Satellite Imagery', score: 91 },
    { name: 'AgniKul Cosmos', dpiit: 'DIPP39281', tech: 'Aerospace Engineering', score: 84 },
    { name: 'Zeta', dpiit: 'DIPP83921', tech: 'Fintech / AI', score: 72 },
    { name: 'Niramai', dpiit: 'DIPP47281', tech: 'HealthTech / AI', score: 55 },
    { name: 'IdeaForge', dpiit: 'DIPP19284', tech: 'Drones / Robotics', score: 42 }
  ];

  for (const [index, s] of startups1.entries()) {
    await prisma.application.create({
      data: {
        challengeId: c1.id,
        startupName: s.name,
        dpiitNumber: s.dpiit,
        solutionDetails: `Proposed solution using ${s.tech} to solve the traffic challenge requirements efficiently.`,
        estimatedCost: 5000000 + (index * 200000),
        estimatedTime: 6,
        aiScore: s.score,
        aiSummary: `Startup ${s.name} (DPIIT: ${s.dpiit}) shows technical fit in ${s.tech}. Cost is reasonable.`
      }
    });
  }

  // 3. Startups for Challenge 2 (Blockchain)
  const startups2 = [
    { name: 'Polygon Tech', dpiit: 'DIPP99212', tech: 'Web3 / Blockchain', score: 95 },
    { name: 'WazirX Innovations', dpiit: 'DIPP11234', tech: 'Crypto / Security', score: 88 },
    { name: 'Signzy', dpiit: 'DIPP44212', tech: 'RegTech / Blockchain', score: 79 },
    { name: 'CoinDCX Labs', dpiit: 'DIPP55312', tech: 'Blockchain Infrastructure', score: 65 }
  ];

  for (const [index, s] of startups2.entries()) {
    await prisma.application.create({
      data: {
        challengeId: c2.id,
        startupName: s.name,
        dpiitNumber: s.dpiit,
        solutionDetails: `Decentralized land registry solution using ${s.tech} to prevent fraud.`,
        estimatedCost: 7500000 + (index * 150000),
        estimatedTime: 8,
        aiScore: s.score,
        aiSummary: `Startup ${s.name} (DPIIT: ${s.dpiit}) provides strong ${s.tech} architecture for tamper-proof records.`
      }
    });
  }

  // 4. Startups for Challenge 3 (Agri Drones)
  const startups3 = [
    { name: 'Garuda Aerospace', dpiit: 'DIPP88123', tech: 'Agri Drones', score: 94 },
    { name: 'Aarav Unmanned Systems', dpiit: 'DIPP77234', tech: 'Commercial Drones', score: 86 },
    { name: 'Skylark Drones', dpiit: 'DIPP66345', tech: 'Drone Analytics', score: 81 },
    { name: 'CropIn', dpiit: 'DIPP55456', tech: 'AgriTech / SaaS', score: 60 }
  ];

  for (const [index, s] of startups3.entries()) {
    await prisma.application.create({
      data: {
        challengeId: c3.id,
        startupName: s.name,
        dpiitNumber: s.dpiit,
        solutionDetails: `Deploying custom ${s.tech} to scan large hectares for early disease detection.`,
        estimatedCost: 4000000 + (index * 100000),
        estimatedTime: 4,
        aiScore: s.score,
        aiSummary: `Startup ${s.name} (DPIIT: ${s.dpiit}) specializes in ${s.tech}. Perfect fit for agricultural surveillance.`
      }
    });
  }

  console.log("Database successfully seeded with multiple challenges and bids!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
