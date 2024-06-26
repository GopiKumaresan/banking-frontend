import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../services/service.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-transfer-money',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './transfer-money.component.html',
  styleUrl: './transfer-money.component.scss',
})
export class TransferMoneyComponent implements OnInit {
  transferMoneyForm!: FormGroup ;

  constructor(
      private service: ServiceService,
      private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
      this.transferMoneyForm = new FormGroup(
          {
              transferTo: new FormControl(null, Validators.required),
              amount: new FormControl(null, Validators.required)
          }
      );
  }

  transferMoneyFormSubmit() {
    const transferDetails = {
      fromAccount: 'currentAccountId', // Example: Replace with actual from account
      toAccount: this.transferMoneyForm.value.transferTo,
      amount: this.transferMoneyForm.value.amount
    };

    this.service.transferMoney(transferDetails).subscribe(
      (response :any) => {
        this.toastr.success(response.message);
      },
      error => {
        this.toastr.error('Transfer failed');
      }
    );
  }
}

