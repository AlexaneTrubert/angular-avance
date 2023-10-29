import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  styles: []
})
export class MoviesComponent {
  movies: any[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    const request = this.http.get('https://api.themoviedb.org/3/movie/popular?api_key=287dad35f1314e7780e6f05f4bdeb3ef&language=fr-FR&page=1');

    request.subscribe((response: any) => {
      this.movies = response.results;
    });
  }
}
