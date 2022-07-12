import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-fund-form',
  templateUrl: './fund-form.component.html',
  styleUrls: ['./fund-form.component.css']
})
export class FundFormComponent implements OnInit {

  loginUser: boolean = false;
  addressUser: string = '';
  addressUserView: boolean = false;

  web3: any;
  goFundMe: any;

  ownerAddress: string = "";
  getOwnerAddress = new BehaviorSubject<string>('');

  fundValue: Number = 0;
  fund = new BehaviorSubject<string>('');

  fundedAmount: Number = 0;
  getAmountFunded = new BehaviorSubject<string>('');

  constructor(private cdr: ChangeDetectorRef, private authService: AuthService) {
    this.authService = authService;
    this.web3 = this.authService.web3Instance;
  }

  ngOnInit(): void {
    this.authService.loginUser.subscribe((res: boolean) => {
      this.loginUser = res;
      (!this.loginUser) ? this.addressUserView = false : this.addressUserView = true;
      this.cdr.detectChanges();
    });

    this.authService.addressUser.subscribe((res: string) => {
      this.addressUser = res;
      if (this.addressUser) {
        this.goFundMe = new this.web3.eth.Contract(environment.contract.abi, environment.contract.address);
        this.callGetOwner();
        this.callGetAmountFunded();
      }
      this.cdr.detectChanges();
    });

    this.getOwnerAddress.subscribe((res: any) => {
      this.ownerAddress = res;
      this.cdr.detectChanges();
    });

    this.fund.subscribe(_=> {
      this.callGetAmountFunded();
      this.cdr.detectChanges();
    });

    this.getAmountFunded.subscribe((res: any) => {
      this.fundedAmount = this.web3.utils.fromWei(res, "ether");
      this.cdr.detectChanges();
    });
  }

  public fundContract() {
    this.callFund();
  }

  async callGetOwner() {
    const ownerAddress = await this.goFundMe.methods.getOwner()
      .call({ from: this.addressUser });
    this.getOwnerAddress.next(ownerAddress);
  }

  async callFund() {
    const fund = await this.goFundMe.methods.fund()
      .send({from: this.addressUser, value: this.web3.utils.toWei(String(this.fundValue), "ether") });
    this.fund.next(fund);
  }

  async callGetAmountFunded() {
    if(this.addressUser) {
      var goFundMe = new this.web3.eth.Contract(environment.contract.abi, environment.contract.address);
      const fund = await goFundMe.methods.getAddressToAmountFunded(this.addressUser)
        .call();
      this.getAmountFunded.next(fund);
    }
  }

}
