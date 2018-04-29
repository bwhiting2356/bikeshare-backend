import { expect } from 'chai';
import { findClosestStationsByWalkingDistance } from "../../src/findBestStation/findClosestStationsByWalkingDistance";
import { LatLng } from "../../shared/LatLng";
import { StationDataWithWalking } from "../../shared/StationDataWithWalking";
import { sequelize } from "../../db/db";
import { StationAttributes } from "../../db/models/station/StationAttributes";
import { Station } from "../../db/models/station/Station";


describe('Find The Closest Stations By Walking Distance', function() {
    before(async () => {
        const stations: StationAttributes[] = [
            {
                id: 1,
                lat: 40.695756,
                lng: -73.946182,
                address: "896 Myrtle Ave",
                capacity: 10,
                currentInv: 1
            },
            {
                id: 2,
                lat: 40.696021,
                lng: -73.94352,
                address: "248 Throop Ave",
                capacity: 10,
                currentInv: 1
            },
            {
                id: 3,
                lat: 40.696418,
                lng:-73.940743,
                address: "1031 Myrtle",
                capacity: 10,
                currentInv: 1
            },
        ];
        await sequelize.sync({ force: true })
        await Station.bulkCreate(stations);
    });
    const expectedResult: StationDataWithWalking[] = [
        {
            walkingDistanceMatrixResult: {
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
                id: 1,
                lat: 40.695756,
                lng: -73.946182,
                address: "896 Myrtle Ave",
                distanceFromLoc: 0.45420071241303916,
                capacity: 10,
                currentInv: 1
            }
        },
        {
            walkingDistanceMatrixResult: {
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
                id: 2,
                lat: 40.696021,
                lng:-73.94352,
                address: "248 Throop Ave",
                distanceFromLoc: 0.5680806863504034,
                capacity: 10,
                currentInv: 1
            }
        },
        {
            walkingDistanceMatrixResult: {
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
                id: 3,
                lat: 40.696418,
                lng:-73.940743,
                address: "1031 Myrtle",
                distanceFromLoc: 0.69487558148457,
                capacity: 10,
                currentInv: 1
            }
        }];

    const location: LatLng = {
        lat: 40.699372,
        lng: -73.953423
    };

    it('should return the correct result', async () => {
        const result = await findClosestStationsByWalkingDistance(location);
        expect(result).to.deep.equal(expectedResult)
    })
});

