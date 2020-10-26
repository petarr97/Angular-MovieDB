import { Injectable } from '@angular/core';
import { ReturnModel } from '../models/returnModel';
import { moviesModel } from '../models/moviesModel';
import { HttpClient } from '@angular/common/http';
import { ReturnModelTV } from '../models/returnModelTV';
import { TvModel } from '../models/tvModel';

@Injectable({
  providedIn: 'root',
})
export class SearchServiceService {
  constructor(private http: HttpClient) {}

  URL_movies_search: string =
    'https://api.themoviedb.org/3/search/movie?api_key=4dd96a2a2a52819bc14ec41414809194&query=';
  URL_tv_shows_search: string =
    'https://api.themoviedb.org/3/search/tv?api_key=4dd96a2a2a52819bc14ec41414809194&query=';

  movies: ReturnModel;
  postsSub: moviesModel[] = [];

  tvShows: ReturnModelTV;
  postSub1: TvModel[] = [];

  async getSearchData(searchValue) {
    await this.http
      .get<ReturnModel>(this.URL_movies_search + searchValue)
      .toPromise()
      .then((data) => {
        this.movies = data;
        this.postsSub = this.movies.results;
      });
  }
  async returnMovies() {
    return this.postsSub;
  }

  async getSearchDataTV(searchValue) {
    await this.http
      .get<ReturnModelTV>(this.URL_tv_shows_search + searchValue)
      .toPromise()
      .then((data) => {
        this.tvShows = data;
        this.postSub1 = this.tvShows.results;
      });
  }
  async returnTv() {
    return this.postSub1;
  }
}
