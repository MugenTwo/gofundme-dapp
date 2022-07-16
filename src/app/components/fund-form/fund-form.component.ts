import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GoFundMeService } from 'src/app/services/go-fund-me.service';

@Component({
  selector: 'app-fund-form',
  templateUrl: './fund-form.component.html',
  styleUrls: ['./fund-form.component.css']
})
export class FundFormComponent implements OnInit {

  web3: any;

  ownerAddress: string = "";
  fundValue: Number = 0;
  fundedAmount: Number = 0;

  constructor(private cdr: ChangeDetectorRef,
              private authService: AuthService,
              private goFundMeService: GoFundMeService) {
    this.authService = authService;
    this.web3 = this.authService.web3Instance;
    this.goFundMeService = goFundMeService;
  }

  ngOnInit(): void {
    this.goFundMeService.getOwnerAddress.subscribe((res: any) => {
      this.ownerAddress = res;
      this.cdr.detectChanges();
    });

    this.goFundMeService.fund.subscribe(_ => {
      this.goFundMeService.callGetAmountFunded();
      this.cdr.detectChanges();
    });

    this.goFundMeService.getAmountFunded.subscribe((res: any) => {
      this.fundedAmount = this.web3.utils.fromWei(res, "ether");
      this.cdr.detectChanges();
    });
  }

  public fundContract() {
    this.goFundMeService.callFund(this.fundValue);
  }

}
