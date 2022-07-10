import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FundFormComponent } from './components/fund-form/fund-form.component';

const routes: Routes = [
  { path: 'fund-form', component: FundFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
