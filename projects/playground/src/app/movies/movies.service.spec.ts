import {MoviesService} from "./movies.service";
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";
import {ApiGenresResponse, ApiMovie} from "./types";

const MOCK_GENRES_RESPONSE: ApiGenresResponse = {
  genres: [
    {id: 1, name: 'Action'},
    {id: 2, name: 'Science-Fiction'},
  ]
};

describe('MoviesService avec TestBed', () => {

  it("Should get transformed popular movies", (done: DoneFn) => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    const http = TestBed.inject(HttpClient);
    const httpControler = TestBed.inject(HttpTestingController);

    const service = new MoviesService(http);

    service.getPopularMovies().subscribe(movies => {
      expect(movies.length).toBe(2);
      expect(movies[0].description).toBe('MOCK_OVERVIEW');
      expect(movies[0].rating).toBe(10);
      done();
    });

    const request = httpControler.expectOne('https://api.themoviedb.org/3/movie/popular?page=1');

    request.flush({
      results: [
        {title: 'Movie 1', overview: 'MOCK_OVERVIEW', vote_average: 10} as ApiMovie,
        {title: 'Movie 2', overview: 'MOCK_OVERVIEW 2', vote_average: 7} as ApiMovie,
      ],
    })
  });

  it("Should get and transform genres", (done: DoneFn) => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    const http = TestBed.inject(HttpClient);
    const httpControler = TestBed.inject(HttpTestingController);

    const service = new MoviesService(http);

    service.getGenres().subscribe(genres => {
      expect(genres.length).toBe(2);
      expect(genres[0].id).toBe(1);
      expect(genres[0].name).toBe('Action');
      done();
    });

    const request = httpControler.expectOne('https://api.themoviedb.org/3/genre/movie/list');

    request.flush(MOCK_GENRES_RESPONSE);
  });
});
