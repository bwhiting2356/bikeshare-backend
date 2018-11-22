import { expect } from 'chai';
import { fetchAndMergeBicyclingDistance } from "../../src/findBestTrip/fetchAndMergeBicyclingDistance";
import { StationDataWithWalking } from "../../shared/StationDataWithWalking";
import { DistanceMatrixResultRow } from "../../shared/DistanceMatrixResultRow";
import { StationDataWithDistance } from "../../shared/StationDataWithDistance";
import { StationDataWithBicycling } from "../../shared/StationDataWithBicycling";
import { BestStationResult } from "../../shared/BestStationResult";

describe('Fetch And Merge Bicycling Distance', function() {
    it('should correctly fetch and merge data', async () => {
        // expect(1).to.equal(2);
        const walkingDistanceMatrixResult1: DistanceMatrixResultRow = {
                distance: { text: '1.5 km', value: 1461 },
                duration: { text: '19 mins', value: 1117 },
                status: 'OK'
            };
        const stationDataWithDistance1: StationDataWithDistance = {
            id: 1,
            lat: 40.696021,
            lng: -73.94352,
            capacity: 10,
            currentInv: 0,
            address: '248 Throop Ave',
            distanceFromLoc: 0.31194029043889854
        };

        const walkingDistanceMatrixResult2: DistanceMatrixResultRow = {
            distance: { text: '1.5 km', value: 1461 },
            duration: { text: '19 mins', value: 1117 },
            status: 'OK'
        };

        const stationDataWithDistance2: StationDataWithDistance = {
            id: 2,
            lat: 40.69,
            lng: -73.94352,
            capacity: 10,
            currentInv: 0,
            address: 'A',
            distanceFromLoc: 0.31194029043889854
        };

        const stationDataPromise: Promise<StationDataWithWalking[]> = Promise.resolve(
            [{
                walkingDistanceMatrixResult: walkingDistanceMatrixResult1,
                stationData: stationDataWithDistance1
            }]
        );

        const chosenStation: Promise<BestStationResult> = Promise.resolve({
            station: {
                walkingDistanceMatrixResult: walkingDistanceMatrixResult2,
                stationData: stationDataWithDistance2
            },
            availability: {
                result: true,
                value: 1,
            },
            reservationTime: new Date()
        });

        const expectedResult: StationDataWithBicycling[] = [
            {
                walkingDistanceMatrixResult: {
                    distance: {
                        text:"1.5 km",
                        value: 1461
                    },
                    duration: {
                        text: "19 mins",
                        value: 1117
                    },
                    status: 'OK'
                },
                stationData: {
                    id: 1,
                    lat: 40.696021,
                    lng: -73.94352,
                    capacity: 10,
                    currentInv: 0,
                    address: '248 Throop Ave',
                    distanceFromLoc: 0.31194029043889854
                },
                bicyclingDistanceMatrixResult: {
                    distance: {
                        text: "1.2 km",
                        value: 1210
                    },
                    duration: {
                        text:"4 mins",
                        value: 254
                    },
                    status: 'OK'
                }
            }
            ];

        const mergedData = await fetchAndMergeBicyclingDistance(stationDataPromise, chosenStation);
        expect(mergedData).to.deep.equal(expectedResult);
    })

});