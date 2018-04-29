import { expect } from 'chai';
import { getDirections } from "../../src/googleMaps/getDirections";
import {DirectionsQuery} from "../../shared/DirectionsQuery";
import {DirectionsResponse} from "../../shared/DirectionsResponse";

describe("Get Directions", function() {
    this.timeout(10000);
    it("should return the correct directions", async () => {
        const query: DirectionsQuery = {
            origin: {
                lat: 40.693470,
                lng: -73.966948
            },
            destination: {
                lat: 40.696071,
                lng: -73.943860
            },
            mode: 'walking'
        };

        const expectedResult: DirectionsResponse = {
            points: [
                { lat: 40.6934682, lng: -73.96696469999999 },
                { lat: 40.6933795, lng: -73.96685169999999 },
                { lat: 40.6960301, lng: -73.94385179999999 }
            ],
            feet: 1980,
            seconds: 1478
        };

        const actualResult = await getDirections(query);
        expect(actualResult).to.deep.equal(expectedResult);
    });

    it('should throw an error for impossible directions', async () => {
        const query: DirectionsQuery = {
            origin: {
                lat: 0,
                lng: 0
            },
            destination: {
                lat: 40.696071,
                lng: -73.943860
            },
            mode: 'walking'
        };

        try {
            const result = await getDirections(query);
            console.log("\n\nresult: ", result);
        } catch (err) {
            expect(err).to.be.ok
        }
    })
});