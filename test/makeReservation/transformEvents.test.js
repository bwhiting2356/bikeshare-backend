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
var Event_1 = require("../../db/models/event/Event");
var Station_1 = require("../../db/models/station/Station");
var mockStations_1 = require("../../db/mockData/mockStations");
var Reservation_1 = require("../../db/models/reservation/Reservation");
var mockReservations_1 = require("../../db/mockData/mockReservations");
var transformEvents_1 = require("../../src/makeReservation/transformEvents");
describe.only('Transform Events', function () {
    var _this = this;
    beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.sequelize.sync({ force: true })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, Station_1.Station.bulkCreate(mockStations_1.mockStations)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, Reservation_1.Reservation.bulkCreate(mockReservations_1.mockReservations)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, Event_1.Event.bulkCreate([
                            {
                                id: 1,
                                reservationId: 1,
                                time: "2018-11-23T20:00:00.749Z",
                                potentialLowInv: 1,
                                potentialHighInv: 1,
                            },
                            {
                                id: 2,
                                reservationId: 1,
                                time: "2018-11-23T20:04:00.749Z",
                                potentialLowInv: 1,
                                potentialHighInv: 1,
                            },
                            {
                                id: 3,
                                reservationId: 1,
                                time: "2018-11-23T20:08:00.749Z",
                                potentialLowInv: 1,
                                potentialHighInv: 1,
                            },
                            {
                                id: 4,
                                reservationId: 1,
                                time: "2018-11-23T20:12:00.749Z",
                                potentialLowInv: 1,
                                potentialHighInv: 1,
                            }
                        ])];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    // it('should should properly decrement inventory of events after pickup', async () => {
    //
    //     const startTime =  "2018-11-23T20:01:00.749Z";
    //     const endTime = "2018-11-23T20:11:00.749Z";
    //
    //     await transformEvents(startTime, endTime, 'pickup');
    //
    //     const event1: any = await Event.findById(1);
    //     expect(event1.potentialLowInv).to.equal(1);
    //     expect(event1.potentialHighInv).to.equal(1);
    //
    //     const event2: any = await Event.findById(2);
    //     expect(event2.potentialLowInv).to.equal(0);
    //     expect(event2.potentialHighInv).to.equal(1);
    //
    //     const event3: any = await Event.findById(3);
    //     expect(event3.potentialLowInv).to.equal(0);
    //     expect(event3.potentialHighInv).to.equal(1);
    //
    //     const event4: any = await Event.findById(4);
    //     expect(event4.potentialLowInv).to.equal(0);
    //     expect(event4.potentialHighInv).to.equal(0);
    // });
    it('should should properly increment inventory of events after dropoff', function () { return __awaiter(_this, void 0, void 0, function () {
        var startTime, endTime, event1, event2, event3, event4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    startTime = "2018-11-23T20:01:00.749Z";
                    endTime = "2018-11-23T20:11:00.749Z";
                    return [4 /*yield*/, transformEvents_1.transformEvents(startTime, endTime, 'dropoff')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, Event_1.Event.findById(1)];
                case 2:
                    event1 = _a.sent();
                    chai_1.expect(event1.potentialLowInv).to.equal(1);
                    chai_1.expect(event1.potentialHighInv).to.equal(1);
                    return [4 /*yield*/, Event_1.Event.findById(2)];
                case 3:
                    event2 = _a.sent();
                    chai_1.expect(event2.potentialLowInv).to.equal(1);
                    chai_1.expect(event2.potentialHighInv).to.equal(2);
                    return [4 /*yield*/, Event_1.Event.findById(3)];
                case 4:
                    event3 = _a.sent();
                    chai_1.expect(event3.potentialLowInv).to.equal(1);
                    chai_1.expect(event3.potentialHighInv).to.equal(2);
                    return [4 /*yield*/, Event_1.Event.findById(4)];
                case 5:
                    event4 = _a.sent();
                    chai_1.expect(event4.potentialLowInv).to.equal(2);
                    chai_1.expect(event4.potentialHighInv).to.equal(2);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=transformEvents.test.js.map