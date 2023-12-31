import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesComponent } from './movies.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MoviesService } from './movies.service';
import { of } from 'rxjs';

const MOCK_MOVIES = [
  {
    id: 1,
    title: 'Movie 1',
    description: 'Description 1',
    image: '',
    rating: 5,
    genres: [1, 2, 3],
  },
  {
    id: 2,
    title: 'Movie 2',
    description: 'Description 2',
    image: '',
    rating: 5,
    genres: [1, 2, 3],
  },
];

/**
 * Testons notre MoviesComponent qui est censé afficher les films populaires
 * et les genres de films.
 *
 * Commençons par l'approche TestBed
 */
describe('MoviesComponent avec TestBed', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;

  // Avant chaque test, nous allons créer un nouveau module de test
  // et y ajouter nos briques de base (composants, directives, modules etc).
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesComponent],
      imports: [HttpClientTestingModule],
      providers: [MoviesService],
    }).compileComponents();

    // La fixture est un objet qui nous permet de manipuler notre composant
    // un peu comme si on avait un navigateur virtuel
    fixture = TestBed.createComponent(MoviesComponent);
    // On récupère l'instance de notre composant
    component = fixture.componentInstance;

    // On simule le retour de la méthode getPopularMovies de notre MoviesService
    // TestBed.inject permet de récupérer une instance d'un service
    // ça revient exactement à écrire :
    //
    // const moviesService = TestBed.inject(MoviesService);
    // spyOn(moviesService, 'getPopularMovies').and.returnValue(of(MOCK_MOVIES));
    spyOn(TestBed.inject(MoviesService), 'getPopularMovies').and.returnValue(
      of(MOCK_MOVIES)
    );

    spyOn(TestBed.inject(MoviesService), 'getGenres').and.returnValue(of([]));

    // On lance la détection de changement pour que le ngOnInit soit appelé
    fixture.detectChanges();
  });

  // Le composant devrait afficher des films
  it('should show movies', () => {
    // On s'attend à ce que le DOM contienne 2 éléments avec la classe .movie
    expect(fixture.nativeElement.querySelectorAll('.movie').length).toBe(2);
  });

  it('should load more movies when we scroll to the bottom', () => {
    // On s'attend à ce que le DOM contienne 2 éléments avec la classe .movie
    expect(fixture.nativeElement.querySelectorAll('.movie').length).toBe(2);

    // On contrôle de l'extérieur le fait qu'on soit en bas de la page
    component.isBottomOfThePage = () => true;

    // On simule un scroll
    window.dispatchEvent(new Event('scroll'));

    fixture.detectChanges();

    // On s'attend à ce que le DOM contienne 4 éléments avec la classe .movie
    expect(fixture.nativeElement.querySelectorAll('.movie').length).toBe(4);
  });

  it('should not load more movies when we scroll and are not at the bottom', () => {
    // On s'attend à ce que le DOM contienne 2 éléments avec la classe .movie
    expect(fixture.nativeElement.querySelectorAll('.movie').length).toBe(2);

    // On contrôle de l'extérieur le fait qu'on soit en bas de la page
    component.isBottomOfThePage = () => false;

    // On simule un scroll
    window.dispatchEvent(new Event('scroll'));

    fixture.detectChanges();

    // On s'attend à ce que le DOM contienne 4 éléments avec la classe .movie
    expect(fixture.nativeElement.querySelectorAll('.movie').length).toBe(2);
  });
});
