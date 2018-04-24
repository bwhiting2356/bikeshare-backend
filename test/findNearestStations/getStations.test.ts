import { expect } from 'chai';

import { sequelize, Station } from "../../db/db";
import { mockStations } from "../../db/mockData/mockStations";
import { getStations } from "../../src/findNearestStations/getStations";

describe('Get Stations', function() {
    before(async () => {
        await sequelize.sync({force: true })
        return await Station.bulkCreate(mockStations);
    });

    it('should return all stations in the database', async () => {
        const stationsResult = await getStations();
        expect(stationsResult).to.deep.equal(mockStations);
    })

});