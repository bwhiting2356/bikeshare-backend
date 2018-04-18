import { expect } from 'chai';
import {findClosestStationsByTravelDistance} from "../src/findNearestStations/findClosestStationsByTravelDistance";
import {LatLng} from "../shared/LatLng";

describe('Find The Closest Stations By Travel Distance', function() {
    const expectedResult = [
        {
            distanceMatrixResult: {
                distance: {
                    text: "1.0 km",
                    value: 1034
                },
                duration:
                    {
                        text: "13 mins",
                        value: 790
                    },
                status: "OK"
            },
            stationData: {
                id: "1",
                coords:
                    {
                        lat: 40.695756,
                        lng: -73.946182
                    },
                address: "896 Myrtle Ave",
                distanceFromLoc: 0.45420071241303916
            }
        },
        {
            distanceMatrixResult: {
                distance: {
                    text: "1.2 km",
                    value: 1237
                },
                duration: {
                    text: "16 mins",
                    value: 940
                },
                status: "OK"
            },
            stationData: {
                id: "2",
                coords: {
                    lat: 40.696021,
                    lng:-73.94352
                },
                address: "248 Throop Ave",
                distanceFromLoc: 0.5680806863504034
            }
        },
        {
            distanceMatrixResult: {
                distance: {
                    text: "1.5 km",
                    value: 1461
                },
                duration: {
                    text: "19 mins",
                    value: 1117
                },
                status: "OK"
            },
            stationData: {
                id:"3",
                coords: {
                    lat: 40.696418,
                    lng:-73.940743
                },
                address: "1031 Myrtle",
                distanceFromLoc: 0.69487558148457
            }
        }];

    const location: LatLng = {
        lat: 40.699372,
        lng: -73.953423
    };

    it('should return the correct result', (done) => {
        findClosestStationsByTravelDistance(location)
            .then(result => {
                expect(result).to.deep.equal(expectedResult)
                done()
            });
    })

})

