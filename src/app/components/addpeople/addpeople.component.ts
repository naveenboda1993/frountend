import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-addpeople',
  templateUrl: './addpeople.component.html',
  styleUrls: ['./addpeople.component.css']
})
export class AddpeopleComponent implements OnInit {
  errorMessage: string;
  showSpinner = false;
  addpeopleForm: FormGroup;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private tokenService: TokenService) { }

  ngOnInit() {
    this.init();
    console.log("gymowner");
  }
  init() {
    this.addpeopleForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      phonenumber: ['', Validators.required],
      age: ['', Validators.required],
      gymname: ['', Validators.required],
      ownername: ['', Validators.required],
      officenumber: ['', Validators.required],
      flatno: ['', Validators.required],
      street: ['', Validators.required],
      area: ['', Validators.required],
      locality: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      state: ['', Validators.required],
      gst: ['', Validators.required],
      discripition: ['', Validators.required],
     
    });
  }
  gymowner() {
    // console.log(this.signupForm.value);
    // this.router.navigate(['gymservices/5e3991d419bc1737949e7b04' ]);
    this.showSpinner = true;
    this.authService.gymowner(this.addpeopleForm.value).subscribe(
      data => {
        // this.tokenService.SetToken(data.token);
        this.addpeopleForm.reset();
        setTimeout(() => {
          this.router.navigate(['gymservices/' + data.gymid]);
          // this.router.navigate(['gymowner']);
        }, 2000);
      },
      err => {
        this.showSpinner = false;
        console.log(err);
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
