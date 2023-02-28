import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { LoginComponent } from './pages/login/login.component';
import { TrainerComponent } from './pages/trainer/trainer.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'trainer',
    component: TrainerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'catalogue',
    component: CatalogueComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
