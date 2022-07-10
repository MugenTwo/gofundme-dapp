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

  ownerAddress: string = "";
  getOwnerAddress = new BehaviorSubject<string>('');

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
      if(this.addressUser){
        this.getOwner();
      }
      this.cdr.detectChanges();
    });

    this.getOwnerAddress.subscribe((res: any)=>{
      this.ownerAddress = res;
      this.cdr.detectChanges();
    });
  }

  async getOwner(){
    var goFundMe = new this.web3.eth.Contract(environment.contract.abi, environment.contract.address);
    const ownerAddress = await goFundMe.methods.getOwner()
      .call({ from: this.addressUser });
    this.getOwnerAddress.next(ownerAddress);
  }

}
