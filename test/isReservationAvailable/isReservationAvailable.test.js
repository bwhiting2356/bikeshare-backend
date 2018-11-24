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
var isReservationAvailable_1 = require("../../src/isReservationAvailable/isReservationAvailable");
describe('Is Reservation Available\n', function () {
    var _this = this;
    describe('Invalid request:', function () {
        it("should throw an error: \n        * query time is earlier than the present\n", function () { return __awaiter(_this, void 0, void 0, function () {
            var query, stationValues, currentTime, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = {
                            stationId: 1,
                            time: new Date("2016-05-18T18:08:15.114Z"),
                            type: 'pickup'
                        };
                        stationValues = {
                            currentInv: 0,
                            capacity: 10
                        };
                        currentTime = new Date("2018-04-18T23:41:15.491Z");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, isReservationAvailable_1.isReservationAvailable(currentTime, stationValues, query, [])];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        chai_1.expect(err_1).to.be.ok;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
    describe('No future reservations:', function () {
        it("should return false: \n        * query type is pickup \n        * station is empty\n        * there are no future dropoffs scheduled\n", function () { return __awaiter(_this, void 0, void 0, function () {
            var query, stationValues, currentTime, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = {
                            stationId: 1,
                            time: new Date("2018-05-18T18:08:15.114Z"),
                            type: 'pickup'
                        };
                        stationValues = {
                            currentInv: 0,
                            capacity: 10
                        };
                        currentTime = new Date("2018-04-18T23:41:15.491Z");
                        return [4 /*yield*/, isReservationAvailable_1.isReservationAvailable(currentTime, stationValues, query, [])];
                    case 1:
                        result = _a.sent();
                        chai_1.expect(result).to.deep.equal({ result: false });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return true: \n        * query type is pickup \n        * station has one bike in it\n        * no future dropoffs scheduled\n", function () { return __awaiter(_this, void 0, void 0, function () {
            var query, stationValues, currentTime, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = {
                            stationId: 1,
                            time: new Date("2018-05-18T18:08:15.114Z"),
                            type: 'pickup'
                        };
                        stationValues = {
                            currentInv: 1,
                            capacity: 10
                        };
                        currentTime = new Date("2018-04-18T23:41:15.491Z");
                        return [4 /*yield*/, isReservationAvailable_1.isReservationAvailable(currentTime, stationValues, query, [])];
                    case 1:
                        result = _a.sent();
                        chai_1.expect(result).to.deep.equal({
                            result: true,
                            value: 1
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return false:\n        * query type is dropoff\n        * station is full\n        * no future pickups scheduled\n", function () { return __awaiter(_this, void 0, void 0, function () {
            var query, stationValues, currentTime, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = {
                            stationId: 1,
                            time: new Date("2018-05-18T18:08:15.114Z"),
                            type: 'dropoff'
                        };
                        stationValues = {
                            currentInv: 10,
                            capacity: 10
                        };
                        currentTime = new Date("2018-04-18T23:41:15.491Z");
                        return [4 /*yield*/, isReservationAvailable_1.isReservationAvailable(currentTime, stationValues, query, [])];
                    case 1:
                        result = _a.sent();
                        chai_1.expect(result).to.deep.equal({
                            result: false,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return false:\n        * query type is dropoff\n        * station is full\n        * no future pickups scheduled\n", function () { return __awaiter(_this, void 0, void 0, function () {
            var query, stationValues, currentTime, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = {
                            stationId: 1,
                            time: new Date("2018-05-18T18:08:15.114Z"),
                            type: 'dropoff'
                        };
                        stationValues = {
                            currentInv: 10,
                            capacity: 10
                        };
                        currentTime = new Date("2018-04-18T23:41:15.491Z");
                        return [4 /*yield*/, isReservationAvailable_1.isReservationAvailable(currentTime, stationValues, query, [])];
                    case 1:
                        result = _a.sent();
                        chai_1.expect(result).to.deep.equal({
                            result: false,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return true:\n        * query type is dropoff\n        * station has one spot left \n        * there are no future pickups scheduled\n", function () { return __awaiter(_this, void 0, void 0, function () {
            var query, stationValues, currentTime, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = {
                            stationId: 1,
                            time: new Date("2018-05-18T18:08:15.114Z"),
                            type: 'dropoff'
                        };
                        stationValues = {
                            currentInv: 9,
                            capacity: 10
                        };
                        currentTime = new Date("2018-04-18T23:41:15.491Z");
                        return [4 /*yield*/, isReservationAvailable_1.isReservationAvailable(currentTime, stationValues, query, [])];
                    case 1:
                        result = _a.sent();
                        chai_1.expect(result).to.deep.equal({
                            result: true,
                            value: 9
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Future Reservations:', function () {
        it("should return true:\n        * query type is pickup\n        * query time is 30 minutes from current time\n        * station has zero bikes currently\n        * one dropoff reservation 5 minutes now\n", function () { return __awaiter(_this, void 0, void 0, function () {
            var currentTime, query, stationValues, reservationEvents, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentTime = new Date("2018-04-18T00:00:00.491Z");
                        query = {
                            stationId: 1,
                            time: new Date("2018-04-18T00:30:00.491Z"),
                            type: 'pickup'
                        };
                        stationValues = {
                            currentInv: 0,
                            capacity: 10
                        };
                        reservationEvents = [
                            {
                                time: new Date("2018-04-18T00:05:00.491Z"),
                                potentialHighInv: 1,
                                potentialLowInv: 0
                            },
                            {
                                time: new Date("2018-04-18T00:15:00.491Z"),
                                potentialHighInv: 1,
                                potentialLowInv: 1
                            }
                        ];
                        return [4 /*yield*/, isReservationAvailable_1.isReservationAvailable(currentTime, stationValues, query, reservationEvents)];
                    case 1:
                        result = _a.sent();
                        chai_1.expect(result).to.deep.equal({
                            result: true,
                            value: 1
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return false:\n        * query is pickup\n        * query time is 30 minutes from current time\n        * station has one bike in it\n        * one pickup reservation 45 minutes from now\n", function () { return __awaiter(_this, void 0, void 0, function () {
            var currentTime, stationValues, query, reservationEvents, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentTime = new Date("2018-04-18T00:00:00.491Z");
                        stationValues = {
                            currentInv: 1,
                            capacity: 10
                        };
                        query = {
                            stationId: 1,
                            time: new Date("2018-04-18T00:30:00.491Z"),
                            type: 'pickup'
                        };
                        reservationEvents = [
                            {
                                time: new Date("2018-04-18T00:45:00.491Z"),
                                potentialHighInv: 1,
                                potentialLowInv: 0
                            },
                        ];
                        return [4 /*yield*/, isReservationAvailable_1.isReservationAvailable(currentTime, stationValues, query, reservationEvents)];
                    case 1:
                        result = _a.sent();
                        chai_1.expect(result).to.deep.equal({
                            result: false
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=isReservationAvailable.test.js.map