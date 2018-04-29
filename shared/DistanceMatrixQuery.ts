import { LatLng } from './LatLng';

export interface DistanceMatixQuery {
    origins: LatLng[];
    destinations: LatLng[];
    mode: 'walking' | 'bicycling';
}
