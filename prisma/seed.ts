import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing database...');
  await prisma.activityEvent.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.auditEvent.deleteMany();
  await prisma.correctiveAction.deleteMany();
  await prisma.asset.deleteMany();
  await prisma.grant.deleteMany();
  await prisma.complaint.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.inspection.deleteMany();
  await prisma.riskSignal.deleteMany();
  await prisma.cCTVDevice.deleteMany();
  await prisma.project.deleteMany();
  await prisma.nGO.deleteMany();
  await prisma.user.deleteMany();

  console.log('Seeding Users...');
  const adminUser = await prisma.user.create({
    data: { name: 'Arjun Mehta', email: 'arjun@pmindia.gov.in', role: 'PMU_MANAGER', geography: 'National' }
  });

  const inspector = await prisma.user.create({
    data: { name: 'Rahul Singh', email: 'rahul@mah.gov.in', role: 'INSPECTOR', geography: 'Maharashtra' }
  });

  console.log('Seeding NGOs...');
  const ngo1 = await prisma.nGO.create({ data: { name: 'Sahyog Sanstha' } });
  const ngo2 = await prisma.nGO.create({ data: { name: 'Arogya Trust' } });
  const ngo3 = await prisma.nGO.create({ data: { name: 'Vidya Foundation' } });
  const ngo4 = await prisma.nGO.create({ data: { name: 'State Dept' } });

  console.log('Seeding Projects & Related Data...');
  
  // MH-042
  const p1 = await prisma.project.create({
    data: {
      projectId: 'MH-042', name: 'Pimpalgaon Community Centre', type: 'Rehab',
      state: 'Maharashtra', district: 'Nashik', block: 'Niphad',
      latitude: 19.0760, longitude: 72.8777,
      riskScore: 78, riskLevel: 'high', cctvStatus: 'offline',
      ngoId: ngo1.id,
      cctvs: {
        create: [{ cameraId: 'CAM-REHAB-01', name: 'Rehab Area', status: 'offline', image: '/cctv/rehab.jpg', outageHours: 19 }]
      },
      signals: {
        create: [
          { signal: 'CCTV unavailable during operating hours', score: 20 },
          { signal: 'Inspection overdue by 12 days', score: 15 },
          { signal: '3 unresolved beneficiary complaints', score: 18 },
          { signal: 'Beneficiary confirmation below expected level', score: 25 }
        ]
      },
      inspections: {
        create: [{ inspectorId: inspector.id, status: 'overdue', compliance: '76%' }]
      },
      funds: {
        create: [{ amount: 500000, utilised: '45%', flagged: '₹2.4L mismatch' }]
      }
    }
  });

  // MH-089
  const p2 = await prisma.project.create({
    data: {
      projectId: 'MH-089', name: 'District Hospital, Ward 3', type: 'Hospital',
      state: 'Maharashtra', district: 'Pune', block: 'Haveli',
      latitude: 18.5204, longitude: 73.8567,
      riskScore: 45, riskLevel: 'medium', cctvStatus: 'live',
      ngoId: ngo2.id,
      cctvs: {
        create: [{ cameraId: 'CAM-HOSP-01', name: 'Hospital Ward', status: 'live', image: '/cctv/hospital.jpg', outageHours: 0 }]
      },
      signals: {
        create: [{ signal: '2 beneficiary complaints pending review', score: 45 }]
      },
      inspections: {
        create: [{ inspectorId: inspector.id, status: 'completed', compliance: '92%' }]
      },
      funds: {
        create: [{ amount: 800000, utilised: '88%', flagged: 'None' }]
      }
    }
  });

  // Additional static seed...
  const p3 = await prisma.project.create({
    data: {
      projectId: 'MH-112', name: 'Govt School, Main Block', type: 'School',
      state: 'Maharashtra', district: 'Thane', block: 'Bhiwandi',
      latitude: 19.9975, longitude: 73.7898,
      riskScore: 12, riskLevel: 'low', cctvStatus: 'live',
      ngoId: ngo3.id,
      cctvs: {
        create: [{ cameraId: 'CAM-SCHOOL-01', name: 'Classroom', status: 'live', image: '/cctv/school.jpg', outageHours: 0 }]
      },
      inspections: {
        create: [{ inspectorId: inspector.id, status: 'completed', compliance: '98%' }]
      },
      funds: {
        create: [{ amount: 300000, utilised: '95%', flagged: 'None' }]
      }
    }
  });

  const p4 = await prisma.project.create({
    data: {
      projectId: 'GJ-021', name: 'Central Records Office', type: 'Govt Office',
      state: 'Gujarat', district: 'Ahmedabad', block: 'City',
      latitude: 23.0225, longitude: 72.5714,
      riskScore: 8, riskLevel: 'low', cctvStatus: 'live',
      ngoId: ngo4.id,
      cctvs: {
        create: [{ cameraId: 'CAM-OFFICE-01', name: 'Main Office', status: 'live', image: '/cctv/office.jpg', outageHours: 0 }]
      },
      inspections: {
        create: [{ inspectorId: inspector.id, status: 'completed', compliance: '100%' }]
      },
      funds: {
        create: [{ amount: 1500000, utilised: '90%', flagged: 'None' }]
      }
    }
  });

  const p5 = await prisma.project.create({
    data: {
      projectId: 'RJ-044', name: 'State Facility Entrance', type: 'Entrance',
      state: 'Rajasthan', district: 'Jaipur', block: 'Central',
      latitude: 26.9124, longitude: 75.7873,
      riskScore: 55, riskLevel: 'medium', cctvStatus: 'live',
      ngoId: ngo4.id,
      cctvs: {
        create: [{ cameraId: 'CAM-ENTRANCE-01', name: 'Security Gate', status: 'live', image: '/cctv/entrance.jpg', outageHours: 0 }]
      },
      signals: {
        create: [{ signal: 'Security log mismatch', score: 30 }, { signal: 'Corrective action due tomorrow', score: 25 }]
      },
      inspections: {
        create: [{ inspectorId: inspector.id, status: 'completed', compliance: '85%' }]
      },
      funds: {
        create: [{ amount: 200000, utilised: '92%', flagged: 'None' }]
      }
    }
  });

  const p6 = await prisma.project.create({
    data: {
      projectId: 'MH-155', name: 'Regional Asset Storage', type: 'Storage',
      state: 'Maharashtra', district: 'Nagpur', block: 'South',
      latitude: 21.1458, longitude: 79.0882,
      riskScore: 18, riskLevel: 'low', cctvStatus: 'live',
      ngoId: ngo4.id,
      cctvs: {
        create: [{ cameraId: 'CAM-STORAGE-01', name: 'Warehouse 1', status: 'live', image: '/cctv/storage.jpg', outageHours: 0 }]
      },
      inspections: {
        create: [{ inspectorId: inspector.id, status: 'completed', compliance: '95%' }]
      },
      funds: {
        create: [{ amount: 1200000, utilised: '100%', flagged: 'None' }]
      }
    }
  });

  console.log('Seeding Activity Events...');
  const events = [
    { text: 'Inspection submitted • MH-042', type: 'success' },
    { text: 'CCTV restored • District Hospital', type: 'system' },
    { text: 'Risk signal generated • Maharashtra', type: 'critical' },
    { text: 'Corrective action response received', type: 'info' },
    { text: 'Bill flagged for ₹2.4L mismatch', type: 'warning' },
  ];
  for (const ev of events) {
    await prisma.activityEvent.create({ data: ev });
  }

  console.log('Database seeded successfully.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
