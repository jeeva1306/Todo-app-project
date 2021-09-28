import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/shared/custom.validator';
import { UserModel } from 'src/app/shared/user-model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;
  error: string;
  isError: boolean = false;
  user: UserModel;

  onSignupSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      alert('The form is invalid.');
    } else {
      this.isLoading = true;
      this.authService
      .signup(this.signupForm.value.email, this.signupForm.value.password)
      .subscribe(
        (resData) => {
          this.isLoading = false;
          this.authService
            .sendUserData(resData.idToken, this.signupForm.value.firstName)
            .subscribe();
            this.authService.handleAuthentication(resData);
          // console.log(resData);
        },
        (err) => {
          this.isLoading = false;
          this.isError = true;
          this.error = err.error.error.message;
        }
      );
    }
  }

  onSignupReset() {
    this.submitted = false;
    this.isError = false;
    this.signupForm.reset();
  }

  get f() {
    return this.signupForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        dob: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }
}
