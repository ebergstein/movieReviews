import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs';
@Injectable()
export class MovieService {

  constructor(private _http: Http) { }


  getMovie(name){
    //console.log(id);
    return this._http.get('https://api.themoviedb.org/3/search/movie?api_key=457e3621c105f0f6fb94b760a64e1e55&language=en-US&page=1&include_adult=false&query=' + name)
    .map( (movie: Response) => movie.json())
    .toPromise()
  }
  getReviews(name){
    console.log(name);
    return this._http.get('/movie/' + name)
    .map( (reviews: Response) => reviews.json())
    .toPromise()
  }

}
