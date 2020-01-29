import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-gym-add',
  templateUrl: './gym-add.component.html',
  styleUrls: ['./gym-add.component.css']
})
export class GymAddComponent implements OnInit {
  errorMessage: string;
  isForm = false;
  showSpinner = false;
  select: Array<any>;
  addgymForm: FormGroup;
  services = new FormControl();
  ServicesList: string[] = ['kick boxing', 'zimba', 'cycling', 'cheast']
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private tokenService: TokenService) { }

  ngOnInit() {
    this.select = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ];
    this.init();
  }
  init() {
    this.authService.getServices().subscribe(data => {
      console.log(data);
      // service.name 
      // this.services = data.result;
      let arr = { red: true, blue: false };
      this.addgymForm = this.fb.group({
        gymname: ['', Validators.required],
        ownername: ['', Validators.required],
        tag: ['', Validators.required],
        email: ['', [Validators.email, Validators.required]],
        phonenumber: ['', Validators.required],
        officenumber: ['', Validators.required],
        flatno: ['', Validators.required],
        street: ['', Validators.required],
        area: ['', Validators.required],
        locality: ['', Validators.required],
        city: ['', Validators.required],
        pincode: ['', Validators.required],
        state: ['', Validators.required],
        discripition: ['', Validators.required],
        accountnumber: ['', Validators.required],
        bankname: ['', Validators.required],
        ifsccode: ['', Validators.required],
        holdername: ['', Validators.required],
        gst: ['', Validators.required],
        // services: ['', Validators.required],
        // timings: ['', Validators.required],
        // services:
        //   this.fb.array(data.result),  
        // password: ['', Validators.required],
        // role: ['', Validators.required]
        // language: ['',Validators.required],
        // age: ['',Validators.required],

      });
      this.isForm = true;
    });

    // this.addgymForm.patchValue({'services':[{'red':false,'blue':true}]});
    console.log("hello")
  }
  gymadd() {
    console.log(this.addgymForm.value);
    this.showSpinner = true;
    this.authService.gymadd(this.addgymForm.value).subscribe(
      data => {
        // this.tokenService.SetToken(data.token);
        this.addgymForm.reset();
        setTimeout(() => {
          this.router.navigate(['gymprofile']);
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

