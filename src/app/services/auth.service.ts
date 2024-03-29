import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import Web3 from 'web3';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment.development';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  web3: any = null;
  get web3Instance() { return this.web3; }

  chainIds: string[] = ['0x0'];
  addressUser: any = new BehaviorSubject<string>('');

  constructor() {
    if (typeof window.ethereum !== 'undefined') {
      this.web3 = new Web3(new Web3.providers.HttpProvider(environment.serverUrl));
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please install MetaMask!'
      });
    }
  }

  connect() {
    this.handleAccountsChanged();
  }

  async handleAccountsChanged() {
    const accounts: string[] = await window.ethereum.request({ method: 'eth_requestAccounts' });

    this.addressUser.next(accounts[0]);
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      this.addressUser.next(accounts[0]);
    });
  }

}
