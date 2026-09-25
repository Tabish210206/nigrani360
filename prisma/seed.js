"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var adminUser, inspector, ngo1, ngo2, ngo3, ngo4, p1, p2, p3, p4, p5, p6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Clearing database...');
                    return [4 /*yield*/, prisma.activityEvent.deleteMany()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma.notification.deleteMany()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, prisma.auditEvent.deleteMany()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, prisma.correctiveAction.deleteMany()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, prisma.asset.deleteMany()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, prisma.grant.deleteMany()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, prisma.complaint.deleteMany()];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, prisma.assignment.deleteMany()];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, prisma.inspection.deleteMany()];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, prisma.riskSignal.deleteMany()];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, prisma.cCTVDevice.deleteMany()];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, prisma.project.deleteMany()];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, prisma.nGO.deleteMany()];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, prisma.user.deleteMany()];
                case 14:
                    _a.sent();
                    console.log('Seeding Users...');
                    return [4 /*yield*/, prisma.user.create({
                            data: { name: 'Arjun Mehta', email: 'arjun@pmindia.gov.in', role: 'PMU_MANAGER', geography: 'National' }
                        })];
                case 15:
                    adminUser = _a.sent();
                    return [4 /*yield*/, prisma.user.create({
                            data: { name: 'Rahul Singh', email: 'rahul@mah.gov.in', role: 'INSPECTOR', geography: 'Maharashtra' }
                        })];
                case 16:
                    inspector = _a.sent();
                    console.log('Seeding NGOs...');
                    return [4 /*yield*/, prisma.nGO.create({ data: { name: 'Sahyog Sanstha' } })];
                case 17:
                    ngo1 = _a.sent();
                    return [4 /*yield*/, prisma.nGO.create({ data: { name: 'Arogya Trust' } })];
                case 18:
                    ngo2 = _a.sent();
                    return [4 /*yield*/, prisma.nGO.create({ data: { name: 'Vidya Foundation' } })];
                case 19:
                    ngo3 = _a.sent();
                    return [4 /*yield*/, prisma.nGO.create({ data: { name: 'State Dept' } })];
                case 20:
                    ngo4 = _a.sent();
                    console.log('Seeding Projects & Related Data...');
                    return [4 /*yield*/, prisma.project.create({
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
                        })];
                case 21:
                    p1 = _a.sent();
                    return [4 /*yield*/, prisma.project.create({
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
                        })];
                case 22:
                    p2 = _a.sent();
                    return [4 /*yield*/, prisma.project.create({
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
                        })];
                case 23:
                    p3 = _a.sent();
                    return [4 /*yield*/, prisma.project.create({
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
                        })];
                case 24:
                    p4 = _a.sent();
                    return [4 /*yield*/, prisma.project.create({
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
                        })];
                case 25:
                    p5 = _a.sent();
                    return [4 /*yield*/, prisma.project.create({
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
                        })];
                case 26:
                    p6 = _a.sent();
                    console.log('Seeding Activity Events...');
                    return [4 /*yield*/, prisma.activityEvent.createMany({
                            data: [
                                { text: 'Inspection submitted • MH-042', type: 'success' },
                                { text: 'CCTV restored • District Hospital', type: 'system' },
                                { text: 'Risk signal generated • Maharashtra', type: 'critical' },
                                { text: 'Corrective action response received', type: 'info' },
                                { text: 'Bill flagged for ₹2.4L mismatch', type: 'warning' },
                            ]
                        })];
                case 27:
                    _a.sent();
                    console.log('Database seeded successfully.');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) { console.error(e); process.exit(1); })
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, prisma.$disconnect()];
        case 1:
            _a.sent();
            return [2 /*return*/];
    }
}); }); });
