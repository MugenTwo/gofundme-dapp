import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GoFundMeService {

  goFundMe: any;
  web3: any;
  addressUser: string = "";

  getOwnerAddress = new BehaviorSubject<string>('');
  fund = new BehaviorSubject<string>('');
  getAmountFunded = new BehaviorSubject<string>('');

  constructor(private authService: AuthService) {
    this.authService.addressUser.subscribe((res: string) => {
      this.addressUser = res;
      this.web3 = authService.web3;
      if (this.addressUser) {
        this.goFundMe = new this.web3.eth.Contract(environment.contract.abi, environment.contract.address);
        this.callGetOwner();
        this.callGetAmountFunded();
      }
    });
  }

  async callGetOwner() {
    const ownerAddress = await this.goFundMe.methods.getOwner()
      .call({ from: this.addressUser });
    this.getOwnerAddress.next(ownerAddress);
  }

  async callFund(fundValue: Number) {
    const fund = await this.goFundMe.methods.fund()
      .send({ from: this.addressUser, value: this.web3.utils.toWei(String(fundValue), "ether") });
    this.fund.next(fund);
  }

  async callGetAmountFunded() {
    if (this.addressUser) {
      const fund = await this.goFundMe.methods.getAddressToAmountFunded(this.addressUser)
        .call();
      this.getAmountFunded.next(fund);
    }
  }

}
