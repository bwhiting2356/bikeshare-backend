import * as express from 'express';
import * as bodyParser from 'body-parser';
import {findBestTrip} from "../findBestTrip/findBestTrip";
import {SearchQuery} from "../../shared/SearchQuery";
import {sequelize} from "../../db/db";

const app = express();
app.use(bodyParser.json());

const port = 3000;

import { Station } from "../../db/models/station/Station";
import { Event } from "../../db/models/event/Event";
import { Reservation } from "../../db/models/reservation/Reservation";
import {mockStations} from "../../db/mockData/mockStations";

sequelize.sync({force: true}).then(() => Station.bulkCreate(mockStations));



app.post('/findBestTrip', async (req, res) => {
    const searchQuery: SearchQuery = { ...req.body, datetime: new Date(req.body.datetime) };

    try {
        const result = await findBestTrip(searchQuery);
        res.send(result);
    } catch (e) {
        res.send(e.message)
    }
});






app.listen(port, () => console.log(`Fiits Bike app listening on port ${port}`));