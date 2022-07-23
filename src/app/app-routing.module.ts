import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FundFormComponent } from './components/fund-form/fund-form.component';
import { WithdrawPageComponent } from './components/withdraw-page/withdraw-page.component';

const routes: Routes = [
  { path: 'fund-form', component: FundFormComponent },
  { path: 'withdraw-form', component: WithdrawPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
