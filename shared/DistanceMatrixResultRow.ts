export interface DistanceMatrixResultRow {
    distance?: {
        text: string;
        value: number;
    };
    duration?: {
        text: string;
        value: number;
    };
    status: 'OK' | 'ZERO_RESULTS';
}