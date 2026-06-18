import { Routes } from '@angular/router';
import { routes as validacionRoutes } from './features/validacion/validacion-routing.module';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'validacion',
    pathMatch: 'full'
  },
  {
    path: 'validacion',
    children: validacionRoutes
  }
];