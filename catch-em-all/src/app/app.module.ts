import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { TrainerComponent } from './pages/trainer/trainer.component';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { PokelogComponent } from './components/catalogue/pokelog/pokelog.component';
import { PokemonItemComponent } from './components/catalogue/pokemon-item/pokemon-item.component';
import { PokemonListComponent } from './components/catalogue/pokemon-list/pokemon-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CatchButtonComponent } from './components/catch-button/catch-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TrainerComponent,
    CatalogueComponent,
    LoginFormComponent,
    PokelogComponent,
    PokemonItemComponent,
    PokemonListComponent,
    NavbarComponent,
    CatchButtonComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
