import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs';
@Injectable()
export class ReviewService {

  constructor(private _http: Http) { }


  getReview(id){
    //console.log(id);
    return this._http.get('/review/' + id)
    .map( (review: Response) => review.json())
    .toPromise()
  }

}
