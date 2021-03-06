"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var googleMapsClient_1 = require("./googleMapsClient");
exports.getDirections = function (query) {
    return new Promise(function (resolve, reject) {
        googleMapsClient_1.googleMapsClient.directions(query, function (err, res) {
            if (err)
                reject(err);
            if (res.json.status === 'ZERO_RESULTS')
                reject('no directions results');
            try {
                var leg = res.json.routes[0].legs[0];
                var feet = leg.distance.value;
                var seconds = leg.duration.value;
                var points = leg.steps.map(function (step) { return step.start_location; });
                points.push(leg.end_location);
                resolve({ points: points, feet: feet, seconds: seconds });
            }
            catch (err) {
                reject(err);
            }
            // TODO: is this catch(err) unnecessary?
        });
    });
};
//# sourceMappingURL=getDirections.js.map