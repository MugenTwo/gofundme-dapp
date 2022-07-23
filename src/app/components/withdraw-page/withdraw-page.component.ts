import { ChangeDetectorRef, Component } from '@angular/core';
import { GoFundMeService } from 'src/app/services/go-fund-me.service';

@Component({
  selector: 'app-withdraw-page',
  templateUrl: './withdraw-page.component.html',
  styleUrls: ['./withdraw-page.component.css']
})
export class WithdrawPageComponent {

  ownerAddress: string = "";
  result: any;

  constructor(private cdr: ChangeDetectorRef, private goFundMeService: GoFundMeService) {
    this.goFundMeService = goFundMeService;
  }

  ngOnInit(): void {
    this.goFundMeService.getOwnerAddress.subscribe((res: any) => {
      this.ownerAddress = res;
      this.cdr.detectChanges();
    });


    this.goFundMeService.withdraw.subscribe((res: any) => {
      console.log("Withdraw has returned");
      this.result = res;
      this.cdr.detectChanges();
    });
  }

  public withdraw() {
    this.goFundMeService.callWithdraw();
  }

}
