import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-gym-prices',
  templateUrl: './gym-prices.component.html',
  styleUrls: ['./gym-prices.component.css']
})
export class GymPricesComponent implements OnInit  {
  price: any;
  errorMessage: string;
  showSpinner = false;
  updatePriceForm: FormGroup;
  loggedInUser: any;
  user: any;
  
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private userService: UsersService,
    private router: Router,
    private tokenService: TokenService) {
      
     }

  ngOnInit() {
    this.user = { price: ''};
    this.loggedInUser = this.tokenService.GetPayload();
    this.init();
  }
  init() {
    this.price = ''
    this.updatePriceForm = this.fb.group({
      onemonth: ['', Validators.required],
      twomonth: ['', Validators.required],
      threemonth: ['', Validators.required],
      sixmonth: ['', Validators.required],
     
    });
    this.GetUsers();
  }

  GetUsers() {
    this.showSpinner = true;
    this.userService.GetPrice(this.loggedInUser._id).subscribe(data => {
      this.user = data.result;
      this.showSpinner = false;
    });
  }

  updateprice() {
    // console.log(this.signupForm.value);
    this.showSpinner = true;
    // this.authService.updateprice(this.updatePriceForm.value).subscribe(
    //   data => {
    //     this.updatePriceForm.reset();
    //     setTimeout(() => {          
    //       this.router.navigate(['updatetrainer']);
    //     }, 2000);

    //   },
    //   err => {
    //     this.showSpinner = false;
    //     if (err.error.msg) {
    //       this.errorMessage = err.error.msg[0].message; 
    //     }
    //     if (err.error.message) {
    //       this.errorMessage = err.error.message;
    //     }
    //   }
    // ); 
  }
}


