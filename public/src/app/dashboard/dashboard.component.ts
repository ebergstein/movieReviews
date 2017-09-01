import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  reviews: Array<any>;
  errors: Array<any>;
  user: any;
  constructor(private _dashboardService: DashboardService, private _router: Router) { }

  ngOnInit() {
    this.getCurrentUser();
    this.getReviews();
  }

  getCurrentUser(){
    this._dashboardService.getCurrent()
      .then( (user) => this.user = user)
      .catch( (err) => this._router.navigate(['/login']))
  }

  getReviews(){
    console.log("*******")
    this._dashboardService.getReviews()
      .then( (reviews) => {
        this.reviews = reviews
        console.log(this.reviews);
      })
      .catch( (err) => {
        console.log(err)
        this.errors = err._body.split(",")
        console.log(this.errors);
      })
  }

  makeReview(formData){
    console.log("*******7")
    this._dashboardService.makeReview(formData.value)
      .then( (review) => {
        console.log("*******8")
        formData.reset()
        this.getReviews();
        console.log(review)
      })
      .catch( (err) => {
        console.log("*******9")
        console.log(err)
        this.errors = err._body.split(",")
        console.log(this.errors);
      })
  }
}
