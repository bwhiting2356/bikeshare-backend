"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var chai_1 = require("chai");
var db_1 = require("../../db/db");
var Station_1 = require("../../db/models/station/Station");
var mockStations_1 = require("../../db/mockData/mockStations");
var Reservation_1 = require("../../db/models/reservation/Reservation");
var Event_1 = require("../../db/models/event/Event");
var subtractSeconds_1 = require("../../src/helpers/subtractSeconds");
var calculateDepartureTime_1 = require("../../src/findBestTrip/calculateDepartureTime");
describe('Calculate Departure Time', function () {
    var _this = this;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.sequelize.sync({ force: true })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, Station_1.Station.bulkCreate(mockStations_1.mockStations)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, Reservation_1.Reservation.bulkCreate([])];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, Event_1.Event.bulkCreate([])];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return the query datetime', function () { return __awaiter(_this, void 0, void 0, function () {
        var query, distanceMatrixResultRow, stationEndResult, actualTime, expectedTime;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = {
                        origin: {
                            coords: {
                                lat: 0,
                                lng: 0
                            },
                            address: ''
                        },
                        destination: {
                            coords: {
                                lat: 0,
                                lng: 0
                            },
                            address: ''
                        },
                        datetime: new Date("2018-04-29T01:00:00.000Z"),
                        timeTarget: 'Depart at'
                    };
                    distanceMatrixResultRow = {
                        distance: {
                            text: '',
                            value: 60
                        },
                        duration: {
                            text: '',
                            value: 1
                        },
                        status: 'OK'
                    };
                    stationEndResult = {
                        station: {
                            walkingDistanceMatrixResult: distanceMatrixResultRow,
                            stationData: {
                                id: 2,
                                lat: 40.696021,
                                lng: -73.94352,
                                capacity: 10,
                                currentInv: 0,
                                address: '248 Throop Ave',
                                distanceFromLoc: 0.31194029043889854
                            }
                        },
                        availability: {
                            result: true,
                            value: 1
                        },
                        reservationTime: new Date("2018-04-29T01:30:00.000Z"),
                    };
                    return [4 /*yield*/, calculateDepartureTime_1.calculateDepartureTime(query, stationEndResult)];
                case 1:
                    actualTime = _a.sent();
                    expectedTime = new Date("2018-04-29T01:00:00.000Z");
                    chai_1.expect(actualTime).to.deep.equal(expectedTime);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return the calculated departure time', function () { return __awaiter(_this, void 0, void 0, function () {
        var query, distanceMatrixResultRow, stationStartResult, actualTime, expectedTime;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = {
                        origin: {
                            coords: {
                                lat: 0,
                                lng: 0
                            },
                            address: ''
                        },
                        destination: {
                            coords: {
                                lat: 0,
                                lng: 0
                            },
                            address: ''
                        },
                        datetime: new Date("2018-04-29T01:00:00.000Z"),
                        timeTarget: 'Arrive by'
                    };
                    distanceMatrixResultRow = {
                        distance: {
                            text: '',
                            value: 300
                        },
                        duration: {
                            text: '',
                            value: 60
                        },
                        status: 'OK'
                    };
                    stationStartResult = {
                        station: {
                            walkingDistanceMatrixResult: distanceMatrixResultRow,
                            stationData: {
                                id: 2,
                                lat: 40.696021,
                                lng: -73.94352,
                                capacity: 10,
                                currentInv: 0,
                                address: '248 Throop Ave',
                                distanceFromLoc: 0.31194029043889854
                            }
                        },
                        availability: {
                            result: true,
                            value: 1
                        },
                        reservationTime: new Date("2018-04-29T01:30:00.000Z"),
                    };
                    return [4 /*yield*/, calculateDepartureTime_1.calculateDepartureTime(query, stationStartResult)];
                case 1:
                    actualTime = _a.sent();
                    expectedTime = subtractSeconds_1.subtractSeconds(new Date("2018-04-29T01:30:00.000Z"), 60);
                    chai_1.expect(actualTime).to.deep.equal(expectedTime);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=calculateDepartureTime.test.js.map