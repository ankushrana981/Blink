import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanAuthActivate, CanLoginActivate } from './common/auth.gaurd';



const routes: Routes = [
  {
    path: 'public',
    canActivate: [CanLoginActivate],
    loadChildren: './public/public.module#PublicModule'
  },
  {
    path: 'main',
    canActivate: [CanAuthActivate],
    loadChildren: './main/main.module#MainModule'
  },
  {
    path: '',
    redirectTo: 'public',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })
],
 
  exports: [RouterModule]
})
export class AppRoutingModule { }
