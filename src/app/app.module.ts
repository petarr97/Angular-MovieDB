import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesViewComponent } from './movies-view/movies-view.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [AppComponent, MoviesViewComponent, DetailsComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
