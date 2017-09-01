import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReviewComponent } from './review/review.component';
import { UserComponent } from './user/user.component';
import { MovieComponent } from './movie/movie.component';


const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent},
    { path: 'review/:id', component: ReviewComponent},
    { path: 'user/:id', component: UserComponent },
    { path: 'movie/:movie', component: MovieComponent },
];
export const routing = RouterModule.forRoot(APP_ROUTES);
