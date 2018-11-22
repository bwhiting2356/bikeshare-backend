"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var subtractSeconds_1 = require("../helpers/subtractSeconds");
var addSeconds_1 = require("../helpers/addSeconds");
var calculateReservationPrice_1 = require("./calculateReservationPrice");
var calculateBicyclingRentalFee_1 = require("./calculateBicyclingRentalFee");
var calculateArrivalTime_1 = require("./calculateArrivalTime");
var calculateDepartureTime_1 = require("./calculateDepartureTime");
exports.buildTripData = function (query, stationStartPromise, stationEndPromise, walking1DirectionsPromise, walking2DirectionsPromise, bicyclingDirectionsPromise) { return __awaiter(_this, void 0, void 0, function () {
    var stationStartResult, stationEndResult, walking1Travel, walking2Travel, departureTime, arrivalTime, stationStart, bicyclingTravel, _a, _b, _c, stationEnd;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, stationStartPromise];
            case 1:
                stationStartResult = _d.sent();
                return [4 /*yield*/, stationEndPromise];
            case 2:
                stationEndResult = _d.sent();
                return [4 /*yield*/, walking1DirectionsPromise];
            case 3:
                walking1Travel = _d.sent();
                return [4 /*yield*/, walking2DirectionsPromise];
            case 4:
                walking2Travel = _d.sent();
                departureTime = calculateDepartureTime_1.calculateDepartureTime(query, stationStartResult);
                arrivalTime = calculateArrivalTime_1.calculateArrivalTime(query, stationEndResult);
                stationStart = {
                    id: stationStartResult.station.stationData.id,
                    coords: {
                        lat: stationStartResult.station.stationData.lat,
                        lng: stationStartResult.station.stationData.lng
                    },
                    address: stationStartResult.station.stationData.address,
                    price: calculateReservationPrice_1.calculateReservationPrice(stationStartResult.availability.value, stationStartResult.station.stationData.capacity, 'pickup'),
                    time: addSeconds_1.addSeconds(departureTime, stationStartResult.station.walkingDistanceMatrixResult.duration.value)
                };
                _a = [{}];
                return [4 /*yield*/, bicyclingDirectionsPromise];
            case 5:
                _a = _a.concat([(_d.sent())]);
                _b = {};
                _c = calculateBicyclingRentalFee_1.calculateBicyclingRentalFee;
                return [4 /*yield*/, bicyclingDirectionsPromise];
            case 6:
                bicyclingTravel = __assign.apply(void 0, _a.concat([(_b.price = _c.apply(void 0, [(_d.sent()).seconds]), _b)]));
                stationEnd = {
                    id: stationEndResult.station.stationData.id,
                    coords: {
                        lat: stationEndResult.station.stationData.lat,
                        lng: stationEndResult.station.stationData.lng
                    },
                    address: stationEndResult.station.stationData.address,
                    price: calculateReservationPrice_1.calculateReservationPrice(stationEndResult.availability.value, stationEndResult.station.stationData.capacity, 'dropoff'),
                    time: subtractSeconds_1.subtractSeconds(arrivalTime, stationEndResult.station.walkingDistanceMatrixResult.duration.value)
                };
                return [2 /*return*/, {
                        origin: query.origin,
                        destination: query.destination,
                        departureTime: departureTime,
                        arrivalTime: arrivalTime,
                        walking1Travel: walking1Travel,
                        walking2Travel: walking2Travel,
                        bicyclingTravel: bicyclingTravel,
                        stationStart: stationStart,
                        stationEnd: stationEnd,
                        status: 'test'
                    }];
        }
    });
}); };
//# sourceMappingURL=buildTripData.js.map