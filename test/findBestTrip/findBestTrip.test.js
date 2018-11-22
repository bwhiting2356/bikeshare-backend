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
var findBestTrip_1 = require("../../src/findBestTrip/findBestTrip");
var Station_1 = require("../../db/models/station/Station");
var db_1 = require("../../db/db");
var addSeconds_1 = require("../../src/helpers/addSeconds");
describe("Find Best Trip", function () {
    var _this = this;
    // before(async () => {
    //
    // });
    it('should return the correct trip', function () { return __awaiter(_this, void 0, void 0, function () {
        var myrtle_nostrand, gates_malcolmx, willoughby_nostrand, lewis_gates, searchQuery, actualResult, expectedDepartureTime, expectedStationStartTime, expectedStationEndTime, expectedArrivalTime, expectedResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    myrtle_nostrand = {
                        lat: 40.695077,
                        lng: -73.952543
                    };
                    gates_malcolmx = {
                        lat: 40.688567,
                        lng: -73.930227
                    };
                    willoughby_nostrand = {
                        lat: 40.693571,
                        lng: -73.952234
                    };
                    lewis_gates = {
                        lat: 40.687939,
                        lng: -73.936053
                    };
                    return [4 /*yield*/, db_1.sequelize.sync({ force: true })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, Station_1.Station.bulkCreate([
                            {
                                id: 1,
                                capacity: 10,
                                currentInv: 1,
                                address: "Willoughby & Nostrand",
                                lat: willoughby_nostrand.lat,
                                lng: willoughby_nostrand.lng
                            },
                            {
                                id: 2,
                                capacity: 10,
                                currentInv: 9,
                                address: "Lewis & Gates",
                                lat: lewis_gates.lat,
                                lng: lewis_gates.lng
                            }
                        ])];
                case 2:
                    _a.sent();
                    searchQuery = {
                        origin: {
                            coords: myrtle_nostrand,
                            address: 'Corner of Myrtle and Nostrand'
                        },
                        destination: {
                            coords: gates_malcolmx,
                            address: 'Corner of Gates & Malcolm X'
                        },
                        timeTarget: 'Depart at',
                        datetime: new Date("2018-04-01T00:00:00.000Z")
                    };
                    return [4 /*yield*/, findBestTrip_1.findBestTrip(searchQuery)];
                case 3:
                    actualResult = _a.sent();
                    expectedDepartureTime = new Date("2018-04-01T00:00:00.000Z");
                    expectedStationStartTime = addSeconds_1.addSeconds(expectedDepartureTime, 137);
                    expectedStationEndTime = addSeconds_1.addSeconds(expectedStationStartTime, 530);
                    expectedArrivalTime = addSeconds_1.addSeconds(expectedStationEndTime, 367);
                    expectedResult = {
                        origin: {
                            coords: myrtle_nostrand,
                            address: 'Corner of Myrtle and Nostrand'
                        },
                        destination: {
                            coords: gates_malcolmx,
                            address: 'Corner of Gates & Malcolm X'
                        },
                        departureTime: expectedDepartureTime,
                        arrivalTime: expectedArrivalTime,
                        walking1Travel: {
                            points: [
                                { lat: 40.6950758, lng: -73.95255949999999 },
                                { lat: 40.69357, lng: -73.952242 }
                            ],
                            feet: 169,
                            seconds: 137
                        },
                        walking2Travel: {
                            points: [
                                { lat: 40.6885937, lng: -73.9302323 },
                                { lat: 40.6879379, lng: -73.9359874 }
                            ],
                            feet: 495,
                            seconds: 367
                        },
                        bicyclingTravel: {
                            points: [{ lat: 40.6935757, lng: -73.9521951 },
                                { lat: 40.6935316, lng: -73.9521859 },
                                { lat: 40.694229, lng: -73.94608989999999 },
                                { lat: 40.686904, lng: -73.944622 },
                                { lat: 40.6878971, lng: -73.936027 },
                                { lat: 40.687941, lng: -73.9360361 }],
                            feet: 2087,
                            seconds: 531,
                            price: 1.35
                        },
                        stationStart: {
                            id: 1,
                            coords: willoughby_nostrand,
                            address: "Willoughby & Nostrand",
                            price: -1,
                            time: expectedStationStartTime
                        },
                        stationEnd: {
                            id: 2,
                            coords: lewis_gates,
                            address: "Lewis & Gates",
                            price: -1,
                            time: expectedStationEndTime
                        },
                        status: "test"
                    };
                    chai_1.expect(actualResult).to.deep.equal(expectedResult);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=findBestTrip.test.js.map