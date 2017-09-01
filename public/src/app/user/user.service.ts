import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs';
@Injectable()
export class UserService {

  constructor(private _http: Http) { }


  getUser(id){
    //console.log(id);
    return this._http.get('/user/' + id)
    .map( (user: Response) => user.json())
    .toPromise()
  }

}
