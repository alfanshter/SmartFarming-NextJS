import { Weather } from "../entities/Weather";

export interface IWeatherRepository {
    getCurrentWeather(location: string): Promise<Weather[]>;
    getWeatherHistory(location: string, days : number): Promise<Weather[]>;
}   