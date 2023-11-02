import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiPopularResponse, Genres, Movies} from "./types";
import {MoviesService} from "./movies.service";

@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  styles: []
})
export class MoviesComponent implements OnInit {
  movies: Movies = [];
  genres: Genres = [];

  constructor(private service: MoviesService) {
  }

  ngOnInit(): void {
    this.service
      .getPopularMovies()
      .subscribe((movies) => (this.movies = movies));

    this.service
      .getGenres()
      .subscribe((genres) => (this.genres = genres));
  }
}
