import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { LoginComponent } from './pages/login/login.component';
import { TrainerComponent } from './pages/trainer/trainer.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "trainer", component: TrainerComponent },
  { path: "catalogue", component: CatalogueComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
