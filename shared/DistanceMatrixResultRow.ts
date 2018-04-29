export interface SuccessRow {
    distance: {
        text: string;
        value: number;
    };
    duration: {
        text: string;
        value: number;
    };
    status: 'OK';
}

export interface ErrorRow {
    status: 'ZERO_RESULTS';
}


export type DistanceMatrixResultRow = SuccessRow | ErrorRow;