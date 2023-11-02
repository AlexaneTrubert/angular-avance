import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

export class MoviesKeyInterceptor  implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const params = 'api_key=287dad35f1314e7780e6f05f4bdeb3ef&language=fr-FR';

    const requestWithParams = req.clone({
      url: req.url + (req.url.includes('?') ? `&${params}` : `?${params}`)
    });

   return next.handle(requestWithParams);
  }
}
