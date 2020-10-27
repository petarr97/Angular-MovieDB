import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/moviesService';
import { ReturnModel } from '../models/returnModel';
import { HttpClient } from '@angular/common/http';
import { moviesModel } from '../models/moviesModel';
import { TvModel } from '../models/tvModel';
import { ReturnModelTV } from '../models/returnModelTV';
import { TvServiceService } from '../services/tv-service.service';
import { SingletonService } from '../services/singleton.service';
import { SearchServiceService } from '../services/search-service.service';
@Component({
  selector: 'app-movies-view',
  templateUrl: './movies-view.component.html',
  styleUrls: ['./movies-view.component.css'],
})
export class MoviesViewComponent implements OnInit {
  propColor: string = 'gray';
  propColor1: string = 'gray';
  pic: string;
  pomocna: boolean = false;
  count: number = 10;

  postsSub: moviesModel[] = [];
  movies: ReturnModel;

  postSub1: TvModel[] = [];
  tvShows: ReturnModelTV;

  type: boolean;
  searchModel: string = '';

  constructor(
    private http: HttpClient,
    private moviesService: MoviesService,
    private tvService: TvServiceService,
    private singleton: SingletonService,
    private searchService: SearchServiceService
  ) {}

  async ngOnInit() {
    this.checkLastState();
  }
  clickedMovies() {
    this.propColor = '#004e7c';
    this.propColor1 = 'gray';
    this.type = true;

    if (this.searchModel.length > 3) this.search(this.searchModel);
    else {
      this.moviesService.getMovies().then((data) => {
        this.postsSub = data;
      });
    }
    this.count = 10;
    this.singleton.type = 'movies';
  }

  clickedTvShows() {
    this.propColor1 = '#004e7c';
    this.propColor = 'gray';
    this.type = false;
    if (this.searchModel.length > 3) this.search(this.searchModel);
    else {
      this.tvService.getTvShowS().then((data) => {
        this.postSub1 = data;
      });
    }
    this.count = 10;
    this.singleton.type = 'tv';
  }

  search(searchValue: string): void {
    this.singleton.searchModel = searchValue;
    if (this.type) this.searchService.getSearchData(searchValue);
    else this.searchService.getSearchDataTV(searchValue);
    if (searchValue.length > 3) {
      setTimeout(() => {
        if (this.type) {
          this.searchService.returnMovies().then((data) => {
            this.postsSub = data;
            this.count = this.postsSub.length;
          });
        } else {
          this.searchService.returnTv().then((data) => {
            this.postSub1 = data;
            this.count = this.postSub1.length;
          });
        }
      }, 1000);
    } else if (this.type) this.clickedMovies();
    else this.clickedTvShows();
    this.searchModel = searchValue;
  }
  checkLastState() {
    if (this.singleton.type == 'movies') {
      this.clickedMovies();
    } else if (this.singleton.type == 'tv') {
      this.clickedTvShows();
    } else this.clickedTvShows();

    if (this.singleton.searchModel.length > 3) {
      this.search(this.singleton.searchModel);
    }
  }
}
