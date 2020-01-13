import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-addtrainer',
  templateUrl: './addtrainer.component.html',
  styleUrls: ['./addtrainer.component.css']
})
export class AddtrainerComponent implements OnInit {
  errorMessage: string;
  showSpinner = false;
  addtrainerForm: FormGroup;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private tokenService: TokenService) { }

  ngOnInit() {
    this.init();

  }
  init() {
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
      accountnumber: ['', Validators.required],
      bankname: ['', Validators.required],
      ifsccode: ['', Validators.required],
      holdername: ['', Validators.required],
      officenumber: ['', Validators.required],
      
    });
  }
  trainer() {
    // console.log(this.signupForm.value);
    this.showSpinner = true;
    this.authService.trainer(this.addtrainerForm.value).subscribe(
      data => {
        // this.tokenService.SetToken(data.token);
        this.addtrainerForm.reset();
        setTimeout(() => {
          this.router.navigate(['trainer']);
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
