import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { AccountResponse } from './account.response.interface';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit{
    accountNo: string | undefined;
    balance: number | undefined;
  
    constructor(
      private service: ServiceService,
  ) {
  }

  ngOnInit(): void {
      this.fetchAccountDetails();
  }

  private fetchAccountDetails() {
    this.service.onGetAccount().subscribe(
      (response: AccountResponse) => {
        this.accountNo = response.accountNo;
        this.balance = response.balance;
      }
    );
  }
}
