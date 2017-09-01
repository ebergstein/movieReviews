import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs';
@Injectable()
export class DashboardService {

  constructor(private _http: Http) { }

  getCurrent(){
    return this._http.get('/current')
    .map( (user: Response) => user.json())
    .toPromise()
  }

  getReviews(){
    return this._http.get('/reviews')
    .map( (user: Response) => user.json())
    .toPromise()
  }

  makeReview(review){
    return this._http.post('/reviews', review)
      .map( (newReview: Response) => newReview.json())
      .toPromise()
  }

}
