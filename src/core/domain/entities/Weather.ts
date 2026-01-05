export interface Weather {
    id : string;
    temperature : number; // in Celsius
    humidity : number; // percentage
    rainfall : number; // in mm
    windSpeed : number; // in km/h
    condition : 'sunny' | 'cloudy' | 'rainy' | 'stormy';
    timestamp : Date;
    location : string;

}