import { HttpClient } from '@angular/common/http';
import { ReturnModel } from '../models/returnModel';
import { moviesModel } from '../models/moviesModel';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private returnModel: ReturnModel;
  private posts: any;
  postsSub: moviesModel[] = [];
  movies: ReturnModel;

  URL_movies: string =
    'https://api.themoviedb.org/3/movie/top_rated?api_key=4dd96a2a2a52819bc14ec41414809194&language=en-US&page=1';
  URL_TVshows: string =
    'https://api.themoviedb.org/3/tv/popular?api_key=4dd96a2a2a52819bc14ec41414809194&language=en-US&page=1';
  URL_movies_search: string =
    'https://api.themoviedb.org/3/search/movie?api_key=4dd96a2a2a52819bc14ec41414809194&query=';
  URL_tv_shows_search: string =
    'https://api.themoviedb.org/3/search/tv?api_key=4dd96a2a2a52819bc14ec41414809194&query=';

  constructor(private http: HttpClient) {}

  async getMovies() {
    await this.http
      .get<ReturnModel>(this.URL_movies)
      .toPromise()
      .then((data) => {
        this.movies = data;
        this.postsSub = this.movies.results;
      });
    return this.postsSub;
  }
}
