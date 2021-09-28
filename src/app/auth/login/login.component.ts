import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;
  error: string;
  isError: boolean = false;

  onLoginSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      alert('Enter all details');
    } else {
      this.isLoading = true;
      this.authService
      .login(
        this.loginForm.value.email_login,
        this.loginForm.value.password_login
      )
      .subscribe(
        (resData) => {
          this.isLoading = false;
          this.authService.retrieveUserData(resData.idToken).subscribe();
          this.authService.handleAuthentication(resData);
          localStorage.setItem('userResData', JSON.stringify(resData));
        },
        (err) => {
          this.isLoading = false;
          this.isError = true;
          this.error = err.error.error.message;
        }
      );
    }
  }

  onLoginReset() {
    this.submitted = false;
    this.isError = false;
    this.loginForm.reset();
  }

  get g() {
    return this.loginForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email_login: ['', [Validators.required, Validators.email]],
      password_login: [, Validators.required],
    });
  }
}
