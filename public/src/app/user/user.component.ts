import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  errors: any;
  user: any;
  constructor(private _userService: UserService, private _router: Router, private _route: ActivatedRoute) {
    this._route.params.subscribe((param) => {
      this.getUser(param.id);
    })
  }

  ngOnInit() {
  }
  getUser(id){
    this._userService.getUser(id)
      .then( (user) => {
        this.user = user;
        console.log(this.user);
      })
      .catch( (err) => this.errors = err.body)
  }

}
