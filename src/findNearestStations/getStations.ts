import { Station } from "../../shared/Station";

export const getStations = async (): Promise<Station[]> => {
    return [
        {
            id: '1',
            address: '896 Myrtle Ave',
            coords: {
                lat: 40.695756,
                lng: -73.946182
            }
        },
        {
            id: '2',
            address: '248 Throop Ave',
            coords: {
                lat: 40.696021,
                lng: -73.943520
            }
        },
        {
            id: '3',
            address: '1031 Myrtle',
            coords: {
                lat: 40.696418,
                lng: -73.940743
            }
        }
    ];

};