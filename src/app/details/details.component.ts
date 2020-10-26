import {
  Component,
  OnInit,
  ɵCompiler_compileModuleSync__POST_R3__,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';
import { MovieDetailsModel } from '../models/movieDetailsModel';
import { stringify } from '@angular/compiler/src/util';
import { tvDetailsModel } from '../models/tvDetailsModel';
import { VideoModel } from '../models/videoModel';
import { VideoReturnModel } from '../models/VideoReturnModel';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SingletonService } from '../services/singleton.service';
import { single } from 'rxjs/operators';
import { DetailsService } from '../services/details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  private URL = 'https://api.themoviedb.org/3/movie/';
  private TV_URL = 'https://api.themoviedb.org/3/tv/';
  private API_key = '?api_key=4dd96a2a2a52819bc14ec41414809194';
  private movie_trailer_URL = 'https://api.themoviedb.org/3/movie/';
  private tv_trailer_URL = 'https://api.themoviedb.org/3/tv/';
  youtubeURL = 'https://www.youtube.com/embed/';

  private id: string;
  finalURL: string;
  hasVideo: boolean;

  url;
  videoReults: VideoModel[] = [];
  path: string;
  title: string;
  overview: string;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private dom: DomSanitizer,
    private singleton: SingletonService,
    private detailsService: DetailsService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.route.snapshot.paramMap.get('tip') == 'movie') {
      this.finalURL = this.URL;
      this.getMoiveDetails();
    } else {
      this.finalURL = this.TV_URL;
      this.getTvDetails();
    }
  }

  async getMoiveDetails() {
    await this.detailsService
      .getMoviesDetails(this.finalURL, this.id)
      .then((data) => {
        this.title = data.original_title;
        this.path = data.poster_path;
        this.overview = data.overview;
      });
    await this.checkVideo();
  }
  async getTvDetails() {
    this.detailsService.getTvDetails(this.finalURL, this.id).then((data) => {
      this.title = data.name;
      this.path = data.poster_path;
      this.overview = data.overview;
    });
    await this.checkVideo();
  }

  async checkVideo() {
    let pom = 0;
    let trailerURL;
    if (this.route.snapshot.paramMap.get('tip') == 'movie')
      trailerURL = this.movie_trailer_URL + this.id + '/videos' + this.API_key;
    else trailerURL = this.tv_trailer_URL + this.id + '/videos' + this.API_key;

    this.detailsService.getVideoUrl(trailerURL).then((data) => {
      this.videoReults = data;
      this.videoReults.forEach((element) => {
        if (element.key != '' && pom != 1) {
          this.url = this.dom.bypassSecurityTrustResourceUrl(
            this.youtubeURL + element.key
          );

          this.hasVideo = true;
          pom = 1;
        }
      });
      if (pom == 0) this.hasVideo = false;
    });
  }
}
