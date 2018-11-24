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
var db_1 = require("../../db/db");
var Reservation_1 = require("../../db/models/reservation/Reservation");
var Event_1 = require("../../db/models/event/Event");
var findPreviousEvent_1 = require("../../src/isReservationAvailable/findPreviousEvent");
var addSeconds_1 = require("../../src/helpers/addSeconds");
describe('Make Reservation', function () {
    var _this = this;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.sequelize.sync({ force: true })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should create a reservation and correctly adjust inventory events', function () { return __awaiter(_this, void 0, void 0, function () {
        var reservation, previousEvents, station, reservationStartTime, reservationEndTime, beforeFirstEvent, beforeSecondEvent, reservationType, firstEvent, secondEvent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Reservation_1.Reservation.create()];
                case 1:
                    reservation = _a.sent();
                    previousEvents = [
                        {
                            time: new Date("2018-04-19T04:00:00.316Z"),
                            potentialLowInv: 1,
                            potentialHighInv: 1
                        },
                        {
                            time: new Date("2018-04-19T05:00:00.316Z"),
                            potentialLowInv: 1,
                            potentialHighInv: 1
                        },
                        {
                            time: new Date("2018-04-19T07:00:00.316Z"),
                            potentialLowInv: 1,
                            potentialHighInv: 1
                        },
                        {
                            time: new Date("2018-04-19T07:05:00.316Z"),
                            potentialLowInv: 1,
                            potentialHighInv: 1
                        },
                        {
                            time: new Date("2018-04-19T08:00:00.316Z"),
                            potentialLowInv: 1,
                            potentialHighInv: 1
                        },
                        {
                            time: new Date("2018-04-19T09:00:00.316Z"),
                            potentialLowInv: 1,
                            potentialHighInv: 1
                        }
                    ];
                    station = {
                        id: 1,
                        address: '123',
                        lat: 40.700802,
                        lng: -73.941866,
                        currentInv: 1,
                        capacity: 10
                    };
                    reservationStartTime = new Date("2018-04-19T07:01:00.316Z");
                    reservationEndTime = addSeconds_1.addSeconds(reservationStartTime, 600);
                    beforeFirstEvent = findPreviousEvent_1.findPreviousEvent(reservationStartTime, previousEvents);
                    beforeSecondEvent = findPreviousEvent_1.findPreviousEvent(reservationEndTime, previousEvents);
                    reservationType = 'pickup';
                    if (!(reservationType == 'pickup')) return [3 /*break*/, 4];
                    return [4 /*yield*/, Event_1.Event.create({
                            potentialHighInv: beforeFirstEvent ? beforeFirstEvent.potentialLowInv : station.currentInv,
                            potentialLowInv: beforeFirstEvent ? beforeFirstEvent.potentialLowInv - 1 : station.currentInv - 1,
                            time: reservationStartTime,
                            reservationId: reservation.dataValues.id
                        })];
                case 2:
                    firstEvent = _a.sent();
                    return [4 /*yield*/, Event_1.Event.create({
                            potentialHighInv: beforeFirstEvent ? beforeFirstEvent.potentialLowInv : station.currentInv,
                            potentialLowInv: beforeFirstEvent ? beforeFirstEvent.potentialLowInv - 1 : station.currentInv - 1,
                            time: reservationEndTime,
                            reservationId: reservation.dataValues.id
                        })];
                case 3:
                    secondEvent = _a.sent();
                    _a.label = 4;
                case 4:
                    // console.log(event);
                    // if the reservation is pickup, decrement the lowInv immediately, decrement the highInv ten minutes later
                    // if the reservation is dropoff, increment the highInv immediately, increment the lowInv ten minutes later
                    /*
                    time: Sequelize.DATE,
                potentialHighInv: Sequelize.INTEGER,
                potentialLowInv: Sequelize.INTEGER,
                     */
                    console.log(reservation.dataValues.id);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=makeReservation.test.js.map