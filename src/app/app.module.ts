import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AuthService } from './services/auth.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FundFormComponent } from './components/fund-form/fund-form.component';

@NgModule({
  declarations: [
    AppComponent,
    FundFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
