import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.scss'
})
export class TransactionHistoryComponent implements OnInit {
  transactions: any;
  constructor(private service: ServiceService) {
  }

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions(){
    this.service.getTransactions().subscribe(
        response => {

          this.transactions = response;
          console.log(this.transactions);
        }
    );

  }

formatDate(date : any) {
  return formatDate(date, 'mediumDate', 'en-us', '+530');
}
}
