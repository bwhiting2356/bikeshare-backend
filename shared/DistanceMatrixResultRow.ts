export interface DistanceMatrixResultRow {
    distance: {
        text: string;
        value: number;
    };
    duration: {
        text: string;
        value: number;
    };
    status: string;
};

// { distance: { text: '1.0 km', value: 1034 },
//     duration: { text: '13 mins', value: 790 },
//     status: 'OK' },