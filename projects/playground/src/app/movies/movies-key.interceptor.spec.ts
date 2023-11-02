import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HTTP_INTERCEPTORS, HttpClient} from "@angular/common/http";
import {MoviesKeyInterceptor} from "./movies-key.interceptor";

describe("MoviesKeyInterceptor", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MoviesKeyInterceptor,
          multi: true
        }
      ]
    })
  })

  it("should add key and language to a request url", (done: DoneFn) => {
    const http = TestBed.inject(HttpClient);
    const httpController = TestBed.inject(HttpTestingController);

    http.get('https://api.themoviedb.org/3/movie/popular').subscribe(
      () => {
        expect(true).toBe(true);
        done();
      }
    );

    httpController.expectOne('https://api.themoviedb.org/3/movie/popular?api_key=287dad35f1314e7780e6f05f4bdeb3ef&language=fr-FR').flush({});
  });

  it("should use & as separator if needed", (done: DoneFn) => {
    const http = TestBed.inject(HttpClient);
    const httpController = TestBed.inject(HttpTestingController);

    http.get('https://api.themoviedb.org/3/movie/popular?page=1').subscribe(
      () => {
        expect(true).toBe(true);
        done();
      }
    );

    httpController.expectOne('https://api.themoviedb.org/3/movie/popular?page=1&api_key=287dad35f1314e7780e6f05f4bdeb3ef&language=fr-FR').flush({});
  });
});
