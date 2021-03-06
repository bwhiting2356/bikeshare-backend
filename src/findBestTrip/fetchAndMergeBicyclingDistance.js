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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var buildDistanceMatrixQuery_1 = require("../googleMaps/buildDistanceMatrixQuery");
var mergeBicyclingDistanceMatrixResultWithStations_1 = require("./mergeBicyclingDistanceMatrixResultWithStations");
var fetchDistanceMatrix_1 = require("../googleMaps/fetchDistanceMatrix");
exports.fetchAndMergeBicyclingDistance = function (destinationStationsPromise, bestStationData) { return __awaiter(_this, void 0, void 0, function () {
    var destinationStationsData, stationLoc, _a, distanceMatrixQuery, results, _b, _c, e_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 6, , 7]);
                return [4 /*yield*/, destinationStationsPromise];
            case 1:
                destinationStationsData = (_d.sent())
                    .map(function (station) { return station.stationData; });
                _a = {};
                return [4 /*yield*/, bestStationData];
            case 2:
                _a.lat = (_d.sent()).station.stationData.lat;
                return [4 /*yield*/, bestStationData];
            case 3:
                stationLoc = (_a.lng = (_d.sent()).station.stationData.lng,
                    _a);
                distanceMatrixQuery = buildDistanceMatrixQuery_1.buildDistanceMatrixQuery('bicycling', destinationStationsData, stationLoc);
                return [4 /*yield*/, fetchDistanceMatrix_1.fetchDistanceMatrix(distanceMatrixQuery)];
            case 4:
                results = _d.sent();
                _b = mergeBicyclingDistanceMatrixResultWithStations_1.mergeBicyclingDistanceMatrixResultWithStations;
                _c = [results];
                return [4 /*yield*/, destinationStationsPromise];
            case 5: return [2 /*return*/, _b.apply(void 0, _c.concat([_d.sent()]))];
            case 6:
                e_1 = _d.sent();
                throw new Error(e_1);
            case 7: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=fetchAndMergeBicyclingDistance.js.map