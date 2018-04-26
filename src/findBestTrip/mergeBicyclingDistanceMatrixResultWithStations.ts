import { StationDataWithWalking } from '../../shared/StationDataWithWalking';
import { DistanceMatrixResultRow } from "../../shared/DistanceMatrixResultRow";
import { StationDataWithBicycling } from "../../shared/StationDataWithBicycling";

export const mergeBicyclingDistanceMatrixResultWithStations = (
    response: DistanceMatrixResultRow[],
    stationsData: StationDataWithWalking[]): StationDataWithBicycling[] => {

    return response
        .map((row, i) => {
            return {
                ...stationsData[i],
                bicyclingDistanceMatrixResult: row,
            };
        })
        .filter(mergedData => mergedData.bicyclingDistanceMatrixResult.status === 'OK')
};