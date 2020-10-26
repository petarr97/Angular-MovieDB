import { HttpClient } from '@angular/common/http';
import { ReturnModelTV } from '../models/returnModelTV';
import { TvModel } from '../models/tvModel';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TvServiceService {
  URL_TVshows: string =
    'https://api.themoviedb.org/3/tv/popular?api_key=4dd96a2a2a52819bc14ec41414809194&language=en-US&page=1';
  postSub: TvModel[] = [];
  tvShows: ReturnModelTV;

  constructor(private http: HttpClient) {}
  async getTvShowS() {
    await this.http
      .get<ReturnModelTV>(this.URL_TVshows)
      .toPromise()
      .then((data) => {
        this.tvShows = data;
        this.postSub = this.tvShows.results;
      });
    return this.postSub;
  }
}
