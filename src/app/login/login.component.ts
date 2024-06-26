import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private responseReceived: boolean = false;
  public loginForm!: FormGroup; // Use non-null assertion operator

  constructor(
    private router: Router,
    private service: ServiceService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      contactNo: new FormControl(null, Validators.required),
      pin: new FormControl(null, Validators.required)
    });
  }

  login() {
    this.responseReceived = false;
    if (this.loginForm) {
      const loginDetails = {
        username: this.loginForm.value.contactNo,
        password: this.loginForm.value.pin
      };
      console.log(loginDetails);
      this.service.loginCall(loginDetails).subscribe(
        (response) => {
          this.responseReceived = true;
          console.log('response-body: ', response);
          sessionStorage.setItem('auth-token', response.token);
          sessionStorage.setItem('userName', response.user.name);
          sessionStorage.setItem('contactNo', response.user.contactno);
          this.router.navigate(['/home']);
          this.toastr.success('Login Successful');
        },
        (error: HttpErrorResponse) => {
          this.responseReceived = true;
          this.toastr.error('Login Failed');
        }
      );
    }
  }
}
