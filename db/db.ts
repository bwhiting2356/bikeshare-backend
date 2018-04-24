import * as Sequelize from 'sequelize';

export const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    // SQLite only
    storage: 'db.sqlite',

    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false
});
//
// interface Station {
//     capacity: number;
//     currentInv: number;
//     address: string;
//     coords: LatLng;
// }

export const Station = sequelize.define('station', {
    capacity: Sequelize.INTEGER,
    currentInv: Sequelize.INTEGER,
    address: Sequelize.STRING,
    coords: Sequelize.JSON
}, {
    timestamps: false
});

// sequelize.sync({force: true })
//     .then(() => {
//         return Station.create({
//             capacity: 1,
//             currentInv: 1,
//             address: 'a',
//             coords: {
//                 lat: 1,
//                 lng: 0
//             }
//         })
//     })
// .then(() => {
//     return Station.findAll()
// })
// .then(stations => {
//     console.log(stations)
// });