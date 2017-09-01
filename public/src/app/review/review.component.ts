import { Component, OnInit } from '@angular/core';
import { ReviewService } from './review.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  errors: any;
  review: any;
  constructor(private _reviewService: ReviewService, private _router: Router, private _route: ActivatedRoute) {
    this._route.params.subscribe((param) => {
      this.getReview(param.id);
    })
  }

  ngOnInit() {
  }
  getReview(id){
    this._reviewService.getReview(id)
      .then( (review) => {
        this.review = review;
        console.log(this.review);
      })
      .catch( (err) => this.errors = err.body)
  }

}
