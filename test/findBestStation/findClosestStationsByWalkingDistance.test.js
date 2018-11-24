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
var findClosestStationsByWalkingDistance_1 = require("../../src/findBestStation/findClosestStationsByWalkingDistance");
var db_1 = require("../../db/db");
var Station_1 = require("../../db/models/station/Station");
describe('Find The Closest Stations By Walking Distance', function () {
    var _this = this;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        var stations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    stations = [
                        {
                            id: 1,
                            lat: 40.695756,
                            lng: -73.946182,
                            address: "896 Myrtle Ave",
                            capacity: 10,
                            currentInv: 1
                        },
                        {
                            id: 2,
                            lat: 40.696021,
                            lng: -73.94352,
                            address: "248 Throop Ave",
                            capacity: 10,
                            currentInv: 1
                        },
                        {
                            id: 3,
                            lat: 40.696418,
                            lng: -73.940743,
                            address: "1031 Myrtle",
                            capacity: 10,
                            currentInv: 1
                        },
                    ];
                    return [4 /*yield*/, db_1.sequelize.sync({ force: true })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, Station_1.Station.bulkCreate(stations)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    var expectedResult = [
        {
            walkingDistanceMatrixResult: {
                distance: {
                    text: "1.0 km",
                    value: 1034
                },
                duration: {
                    text: "13 mins",
                    value: 790
                },
                status: "OK"
            },
            stationData: {
                id: 1,
                lat: 40.695756,
                lng: -73.946182,
                address: "896 Myrtle Ave",
                distanceFromLoc: 0.45420071241303916,
                capacity: 10,
                currentInv: 1
            }
        },
        {
            walkingDistanceMatrixResult: {
                distance: {
                    text: "1.2 km",
                    value: 1237
                },
                duration: {
                    text: "16 mins",
                    value: 940
                },
                status: "OK"
            },
            stationData: {
                id: 2,
                lat: 40.696021,
                lng: -73.94352,
                address: "248 Throop Ave",
                distanceFromLoc: 0.5680806863504034,
                capacity: 10,
                currentInv: 1
            }
        },
        {
            walkingDistanceMatrixResult: {
                distance: {
                    text: "1.5 km",
                    value: 1461
                },
                duration: {
                    text: "19 mins",
                    value: 1117
                },
                status: "OK"
            },
            stationData: {
                id: 3,
                lat: 40.696418,
                lng: -73.940743,
                address: "1031 Myrtle",
                distanceFromLoc: 0.69487558148457,
                capacity: 10,
                currentInv: 1
            }
        }
    ];
    var location = {
        lat: 40.699372,
        lng: -73.953423
    };
    it('should return the correct result', function () { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findClosestStationsByWalkingDistance_1.findClosestStationsByWalkingDistance(location)];
                case 1:
                    result = _a.sent();
                    chai_1.expect(result).to.deep.equal(expectedResult);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=findClosestStationsByWalkingDistance.test.js.map