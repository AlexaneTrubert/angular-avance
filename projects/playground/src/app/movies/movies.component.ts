import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiPopularResponse, Genres, Movies} from "./types";
import {MoviesService} from "./movies.service";
import {
  combineLatest,
  distinctUntilChanged,
  filter,
  forkJoin,
  fromEvent,
  map, merge, Observable,
  Subscription,
  switchMap,
  tap
} from "rxjs";

@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  styles: []
})
export class MoviesComponent implements OnInit {
  movies: Movies = [];
  genres: Genres = [];

  genresAndMovies$?: Observable<{ genres: Genres; movies: Movies }>;

  page = 1;

  constructor(private service: MoviesService) {
  }

  ngOnInit(): void {
    const scroll$ = fromEvent(window, 'scroll')
      .pipe(
        map(scrollEvent => this.isBottomOfThePage()),
        distinctUntilChanged(),
        filter(isBottom => isBottom === true),
        tap(() => this.page++),
        switchMap(() => this.service.getPopularMovies(this.page))
      );

    this.genresAndMovies$ = combineLatest([
      this.service.getGenres(),
      merge(this.service.getPopularMovies(this.page), scroll$)
    ])
      .pipe(
        tap(([genres, movies]) => {
          this.genres = genres;
          this.movies = [...this.movies, ...movies]
        }),
        map(([genres, movies]) => {
          return {
            genres,
            movies: this.movies
          };
        })
      );
  }

  isBottomOfThePage(): boolean {
    const isBottom = document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 300;
    return isBottom;
  }
}
