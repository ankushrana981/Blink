import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanAuthActivate, CanLoginActivate } from './common/auth.gaurd';

const routes: Routes = [
  {
    path: 'public',
    // canActivate: [CanLoginActivate],
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule),
  },
  {
    path: 'main',
    // canActivate: [CanAuthActivate],
    loadChildren: () => import('./main/main.module').then(m =>m.MainModule)
  },
  {
    path: '',
    redirectTo: 'public',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
