import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'gofundme-dapp';

  loginUser: boolean = false;
  addressUser: string = '';
  addressUserView: boolean = false;

  web3: any; 

  constructor(private cdr: ChangeDetectorRef, private authService: AuthService) {
    this.web3 = this.authService.web3Instance;
    console.log(this.web3)
  }

  ngOnInit(): void {
    this.authService.connect();

    this.authService.loginUser.subscribe((res: boolean) => { 
      this.loginUser = res;
      (!this.loginUser) ? this.addressUserView = false : this.addressUserView = true;
      this.cdr.detectChanges();
    });
    
    this.authService.addressUser.subscribe((res: string) => { 
      this.addressUser = res;
      this.cdr.detectChanges();
    });
  }
  
}
