import {fakeAsync, TestBed, tick} from "@angular/core/testing";
import {MoviesComponent} from "./movies.component";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('MoviesComponent', () => {
  it('should show movies', async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    const httpController = TestBed.inject(HttpTestingController);

    const fixture = TestBed.createComponent(MoviesComponent);
    fixture.detectChanges();

    const request = httpController.expectOne('https://api.themoviedb.org/3/movie/popular?api_key=287dad35f1314e7780e6f05f4bdeb3ef&language=fr-FR&page=1');
    request.flush({
      results: [
        { title: 'movie 1'}, { title: 'movie 2'}
      ]
    });

    fixture.detectChanges();

    // On s'assure que des films apparaissent. On regarde si on a plusieurs div avec la class movie
    expect(fixture.nativeElement.querySelectorAll('.movie').length).toBeGreaterThan(0);
  });
});
