import { moviesModel } from "./moviesModel";

export interface ReturnModel{
    page: number;
    total_results:number;
    total_pages:number;
    results:moviesModel[];
}