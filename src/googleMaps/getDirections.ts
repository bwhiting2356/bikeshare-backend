import { googleMapsClient } from "./googleMapsClient";
import { DirectionsQuery } from "../../shared/DirectionsQuery";
import { DirectionsResponse } from "../../shared/DirectionsResponse";

export const getDirections = (query: DirectionsQuery): Promise<DirectionsResponse> => {
    return new Promise<DirectionsResponse>((resolve, reject) => {
        googleMapsClient.directions(query, (err: any, res: any) => {
            if (err) reject(err);
            if (res.json.status === 'ZERO_RESULTS') reject('no directions results');
            try {
                const leg = res.json.routes[0].legs[0];
                const feet = leg.distance.value;
                const seconds = leg.duration.value;
                const points = leg.steps.map((step: any) => step.start_location);
                points.push(leg.end_location);
                resolve({points, feet, seconds})
            } catch (err) {
                reject(err);
            }
        });
    });
};