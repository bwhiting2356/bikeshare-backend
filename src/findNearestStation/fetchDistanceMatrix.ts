import { googleMapsClient } from "../googleMaps/googleMapsClient";
import { DistanceMatixQuery } from "../../shared/DistanceMatrixQuery";
import { DistanceMatrixResultRow } from "../../shared/DistanceMatrixResultRow";

export const fetchDistanceMatrix = (query: DistanceMatixQuery) => {
    return new Promise<DistanceMatrixResultRow[]>((resolve, reject) => {
        googleMapsClient.distanceMatrix(query, (err: any, res: any) => {
            if (err) reject(err);
            try {
                const results = res.json.rows[0].elements;
                resolve(results)
            } catch (err) {
                reject(err);
            }
        });
    });
};