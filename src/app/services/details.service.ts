import { HttpClient } from '@angular/common/http';
import { ReturnModel } from '../models/returnModel';
import { moviesModel } from '../models/moviesModel';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MovieDetailsModel } from '../models/movieDetailsModel';
import { tvDetailsModel } from '../models/tvDetailsModel';
import { VideoReturnModel } from '../models/VideoReturnModel';
import { VideoModel } from '../models/videoModel';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  constructor(private http: HttpClient) {}

  private moviesDetailModel: MovieDetailsModel;
  private tvDetailsModel: tvDetailsModel;
  private videoModel: VideoModel[] = [];
  private API_key = '?api_key=4dd96a2a2a52819bc14ec41414809194';

  async getMoviesDetails(finalURL, id) {
    await this.http
      .get<MovieDetailsModel>(finalURL + id + this.API_key)
      .toPromise()
      .then((data) => {
        this.moviesDetailModel = data;
      });
    return this.moviesDetailModel;
  }

  async getTvDetails(finalURL, id) {
    await this.http
      .get<tvDetailsModel>(finalURL + id + this.API_key)
      .toPromise()
      .then((data) => {
        this.tvDetailsModel = data;
      });
    return this.tvDetailsModel;
  }

  async getVideoUrl(trailerURL) {
    await this.http
      .get<VideoReturnModel>(trailerURL)
      .toPromise()
      .then((data) => {
        this.videoModel = data.results;
      });
    return this.videoModel;
  }
}
