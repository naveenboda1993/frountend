import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import _ from 'lodash';

@Component({
  selector: 'app-trainer-profile',
  templateUrl: './trainer-profile.component.html',
  styleUrls: ['./trainer-profile.component.css']
})
export class TrainerProfileComponent implements OnInit {
  username: any;
  email: any;
  errorMessage: string;
  showSpinner = false;
  addtrainerForm: FormGroup;
  loggedInUser: any;
  users: any;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private userService: UsersService,
    private router: Router,
    private tokenService: TokenService) { }

  ngOnInit() {
    this.init();

  }
  init() {
    this.username = ''
    this.email = ' your email'
    this.addtrainerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      phonenumber: ['', Validators.required],
      age: ['', Validators.required],
      certification: ['', Validators.required],
      specialization: ['', Validators.required],
      tagline: ['', Validators.required],
      experience: ['', Validators.required],
      id: ['', Validators.required],
      address: ['', Validators.required],
      language: ['', Validators.required],
    });
    this.GetUsers();
  }

  GetUsers() {
    this.showSpinner = true;
    this.userService.GetTrainerOne().subscribe(data => {
      console.log(data);
      this.users = data.result;
      this.showSpinner = false;
    });
  }

  updatetrainer() {
    // console.log(this.signupForm.value);
    this.showSpinner = true;
    this.authService.updatetrainer(this.addtrainerForm.value).subscribe(
      data => {
        // this.tokenService.SetToken(data.token);
        this.addtrainerForm.reset();
        setTimeout(() => {
          this.router.navigate(['updatetrainer']);
        }, 2000);

      },
      err => {
        this.showSpinner = false;
        // console.log(err);
        if (err.error.msg) {
          this.errorMessage = err.error.msg[0].message; //validation error, value at index 0,array
        }
        if (err.error.message) {
          this.errorMessage = err.error.message;
        }
      }
    ); // we are passing an object so we are subscribing, register user takes an object
  }
}

