import { findClosestStationsByRawDistance } from "../../src/findNearestStations/findClosestStationsByRawDistance";

import { expect } from 'chai';
import { Station } from "../../shared/Station";
import { LatLng } from "../../shared/LatLng";
import { StationWithDistance } from "../../shared/StationWithDistance";

describe('Find Closest Stations Raw Distance', function() {
    let station1: Station;
    let station2: Station;
    let station3: Station;
    let station4: Station;
    let station5: Station;
    let stationList: Station[];
    let location: LatLng;
    let expectedResult: StationWithDistance[];

    beforeEach(() => {
        station1 = {
            id: '1',
            address: '896 Myrtle Ave',
            coords: {
                lat: 40.695756,
                lng: -73.946182
            }

        };

        station2 = {
            id: '2',
            address: '248 Throop Ave',
            coords: {
                lat: 40.696021,
                lng: -73.943520
            }

        };

        station3 = {
            id: '3',
            address: '1031 Myrtle',
            coords: {
                lat: 40.696418,
                lng: -73.940743
            }

        };

        station4 = {
            id: '4',
            address: '1111 Myrtle Ave',
            coords: {
                lat: 40.696760,
                lng: -73.937832
            }

        };

        station5 = {
            id: '5',
            address: '1134 Myrtle Ave',
            coords: {
                lat: 40.697057,
                lng: -73.934795
            }
        };

        stationList= [station3, station2, station4, station1, station5];
        location = {
            lat: 40.695884,
            lng: -73.949472
        };

        expectedResult = [
            {
                id: '1',
                coords: {
                    lat: 40.695756,
                    lng: -73.946182
                },
                address: '896 Myrtle Ave',
                distanceFromLoc: 0.17257437339372905
            },
            {
                id: '2',
                coords: {
                    lat: 40.696021,
                    lng: -73.94352
                },
                address: '248 Throop Ave',
                distanceFromLoc: 0.31194029043889854
            },
            {
                id: '3',
                coords: {
                    lat: 40.696418,
                    lng: -73.940743
                },
                address: '1031 Myrtle',
                distanceFromLoc: 0.45875504119752186
            }
        ];

    });

    it('should return the right length of items', () => {
        expect(findClosestStationsByRawDistance(stationList, location, 2).length).to.equal(2);
    });

    it('should return correct results', () => {
        expect(findClosestStationsByRawDistance(stationList, location, 3)).to.deep.equal(expectedResult);
    });

});

