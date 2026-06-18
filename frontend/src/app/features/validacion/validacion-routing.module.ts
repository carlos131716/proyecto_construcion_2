import { Routes } from '@angular/router';
import { BandejaComponent } from './pages/bandeja/bandeja.component';
import { DetalleRevisionComponent } from './pages/detalle-revision/detalle-revision.component';

export const routes: Routes = [
  {
    path: '',
    component: BandejaComponent,
  },
  {
    path: ':id',
    component: DetalleRevisionComponent,
  },
];
