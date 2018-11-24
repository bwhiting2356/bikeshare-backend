"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var googleMapsClient_1 = require("./googleMapsClient");
exports.fetchDistanceMatrix = function (query) {
    return new Promise(function (resolve, reject) {
        googleMapsClient_1.googleMapsClient.distanceMatrix(query, function (err, res) {
            if (err)
                reject(err);
            try {
                var results = res.json.rows[0].elements;
                resolve(results);
            }
            catch (err) {
                reject(err);
            }
        });
    });
};
//# sourceMappingURL=fetchDistanceMatrix.js.map