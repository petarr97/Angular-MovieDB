import { TvModel } from "./tvModel";

export interface ReturnModelTV{
    page:number;
    total_results:number;
    total_pages:number;
    results:TvModel[];
}