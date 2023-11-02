import {fakeAsync, TestBed, tick} from "@angular/core/testing";
import {MoviesComponent} from "./movies.component";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {MoviesService} from "./movies.service";
import {of} from "rxjs";

describe('MoviesComponent', () => {
  it('should show movies', async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesComponent],
      imports: [HttpClientTestingModule],
      providers: [MoviesService]
    }).compileComponents();

    const service = TestBed.inject(MoviesService);
    const spy = spyOn(service, "getPopularMovies");
    spy.and.returnValue(of([
      {
        title: 'Movie 1',
        id: 1,
        description: "",
        rating: 10,
        image: ''
      },
      {
        title: 'Movie 2',
        id: 2,
        description: "",
        rating: 10,
        image: ''
      },
    ]));

    const fixture = TestBed.createComponent(MoviesComponent);
    fixture.detectChanges();

    // On s'assure que des films apparaissent. On regarde si on a plusieurs div avec la class movie
    expect(fixture.nativeElement.querySelectorAll('.movie').length).toBe(2);
  });

  it("Should show genres", async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesComponent],
      imports: [HttpClientTestingModule],
      providers: [MoviesService]
    }).compileComponents();

    const service = TestBed.inject(MoviesService);
    const spy = spyOn(service, "getGenres");
    spy.and.returnValue(of([
      {
        id: 1,
        name: 'Action'
      },
      {
        id: 2,
        name: 'Science-Fiction'
      }
    ]));

    const fixture = TestBed.createComponent(MoviesComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.genres').length).toBe(2);
  });
});
