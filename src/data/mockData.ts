export const projectsData = [
  { 
    id: 'MH-042', 
    name: 'Pimpalgaon Community Centre', 
    location: [19.0760, 72.8777],
    state: 'Maharashtra', district: 'Nashik', block: 'Niphad',
    risk: 'high', riskScore: 78,
    type: 'Rehab',
    ngo: 'Sahyog Sanstha',
    cctv: { id: 'CAM-REHAB-01', status: 'offline', outageHours: 19, image: '/cctv/rehab.jpg' },
    signals: [
      'CCTV unavailable during operating hours',
      'Inspection overdue by 12 days',
      '3 unresolved beneficiary complaints',
      'Beneficiary confirmation below expected level'
    ],
    recommendation: 'Surprise inspection',
    inspection: { compliance: '76%', lastDate: '21 days ago' },
    funds: { utilised: '45%', flagged: '₹2.4L mismatch' }
  },
  { 
    id: 'MH-089', 
    name: 'District Hospital, Ward 3', 
    location: [18.5204, 73.8567],
    state: 'Maharashtra', district: 'Pune', block: 'Haveli',
    risk: 'medium', riskScore: 45,
    type: 'Hospital',
    ngo: 'Arogya Trust',
    cctv: { id: 'CAM-HOSP-01', status: 'live', outageHours: 0, image: '/cctv/hospital.jpg' },
    signals: [
      '2 beneficiary complaints pending review'
    ],
    recommendation: 'Desk review',
    inspection: { compliance: '92%', lastDate: '5 days ago' },
    funds: { utilised: '88%', flagged: 'None' }
  },
  { 
    id: 'MH-112', 
    name: 'Govt School, Main Block', 
    location: [19.9975, 73.7898],
    state: 'Maharashtra', district: 'Thane', block: 'Bhiwandi',
    risk: 'low', riskScore: 12,
    type: 'School',
    ngo: 'Vidya Foundation',
    cctv: { id: 'CAM-SCHOOL-01', status: 'live', outageHours: 0, image: '/cctv/school.jpg' },
    signals: [],
    recommendation: 'Routine monitoring',
    inspection: { compliance: '98%', lastDate: '2 days ago' },
    funds: { utilised: '95%', flagged: 'None' }
  },
  { 
    id: 'GJ-021', 
    name: 'Central Records Office', 
    location: [23.0225, 72.5714],
    state: 'Gujarat', district: 'Ahmedabad', block: 'City',
    risk: 'low', riskScore: 8,
    type: 'Govt Office',
    ngo: 'State Dept',
    cctv: { id: 'CAM-OFFICE-01', status: 'live', outageHours: 0, image: '/cctv/office.jpg' },
    signals: [],
    recommendation: 'Routine monitoring',
    inspection: { compliance: '100%', lastDate: '1 day ago' },
    funds: { utilised: '90%', flagged: 'None' }
  },
  { 
    id: 'RJ-044', 
    name: 'State Facility Entrance', 
    location: [26.9124, 75.7873],
    state: 'Rajasthan', district: 'Jaipur', block: 'Central',
    risk: 'medium', riskScore: 55,
    type: 'Entrance',
    ngo: 'State Dept',
    cctv: { id: 'CAM-ENTRANCE-01', status: 'live', outageHours: 0, image: '/cctv/entrance.jpg' },
    signals: [
      'Corrective action due tomorrow',
      'Security log mismatch'
    ],
    recommendation: 'Verify logs',
    inspection: { compliance: '85%', lastDate: '14 days ago' },
    funds: { utilised: '92%', flagged: 'None' }
  },
  { 
    id: 'MH-155', 
    name: 'Regional Asset Storage', 
    location: [21.1458, 79.0882],
    state: 'Maharashtra', district: 'Nagpur', block: 'South',
    risk: 'low', riskScore: 18,
    type: 'Storage',
    ngo: 'State Dept',
    cctv: { id: 'CAM-STORAGE-01', status: 'live', outageHours: 0, image: '/cctv/storage.jpg' },
    signals: [],
    recommendation: 'Routine monitoring',
    inspection: { compliance: '95%', lastDate: '7 days ago' },
    funds: { utilised: '100%', flagged: 'None' }
  }
];

export const regionalData = [
  { region: 'Maharashtra', projects: 214, riskHigh: 12, inspection: '91%', offline: 4 },
  { region: 'Gujarat', projects: 178, riskHigh: 7, inspection: '94%', offline: 2 },
  { region: 'Rajasthan', projects: 162, riskHigh: 9, inspection: '89%', offline: 3 },
  { region: 'Karnataka', projects: 145, riskHigh: 4, inspection: '96%', offline: 1 },
];
