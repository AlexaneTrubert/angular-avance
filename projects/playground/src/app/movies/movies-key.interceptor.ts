import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

export class MoviesKeyInterceptor  implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const API_KEY = 'df1c4c6e0e83010fee5ab09e6e4d8faa';

    const params = 'api_key=' + API_KEY + '&language=fr-FR';

    const requestWithParams = req.clone({
      url: req.url + (req.url.includes('?') ? `&${params}` : `?${params}`)
    });

   return next.handle(requestWithParams);
  }
}
