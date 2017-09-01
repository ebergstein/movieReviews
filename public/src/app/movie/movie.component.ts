import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movie: any;
  errors: Array<any>;
  reviews: Array<any>;
  constructor(private _movieService: MovieService, private _router: Router, private _route: ActivatedRoute) {
    this._route.params.subscribe((param) => {
      this.getMovie(param.movie);
    })
  }

  ngOnInit() {
  }

  getMovie(movie){
    this._movieService.getMovie(movie)
      .then( (result) => {
        if(result.results.length == 0){
          this.errors = ["Movie not found"];
        }
        else{
          this.movie = result.results[0];
          console.log(this.movie);
          this.getReviews(movie);
        }
      })
      .catch( (err) => this.errors = err)
  }
  getReviews(name){
    console.log(name)
    this._movieService.getReviews(name)
      .then( (reviews) => {
        this.reviews = reviews
        console.log(this.reviews);
      })
      .catch( (err) => {
        console.log(err);
        this.errors = err._body.split(",");
        console.log(this.errors);
      })
  }
}
