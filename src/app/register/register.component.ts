import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
[x: string]: any;
  public registerForm !: FormGroup;
  formValid: boolean = true;
emailPattern: any;
contactNoPattern: any;
pinPattern: any;

  constructor(
    private service: ServiceService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      contactNo: new FormControl(null, Validators.required),
      pin: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required)
    });
  }

  submitForm() {
    if (this.registerForm.valid) {
      const userDetails = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        contactNo: this.registerForm.value.contactNo,
        pin: this.registerForm.value.pin,
        dob: `${this.registerForm.value.dob.year}-${this.formatNumber(this.registerForm.value.dob.month)}-${this.formatNumber(this.registerForm.value.dob.day)}`
      };

      this.service.onRegister(userDetails).subscribe(
        (response) => {
          this.router.navigate(['/login']);
          this.toastr.success(response.message);
        },
        (error) => {
          this.toastr.error('Failed to register');
        }
      );
    } else {
      this.formValid = false;
    }
  }

  private formatNumber(num: number): string {
    return num < 10 ? '0' + num : '' + num;
  }

  get u() {
    return this.registerForm.controls;
  }
}
