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
export class GymPricesComponent implements OnInit {
  price: any;
  errorMessage: string;
  showSpinner = false;
  updatePriceForm: FormGroup;
  loggedInUser: any;
  selectedGymPrice: any;
  isAdmin: boolean;
  gyms: any;
  GymsPrices: any;
  selectService: any;
  isService: boolean;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private userService: UsersService,
    private router: Router,
    private tokenService: TokenService) {

  }

  ngOnInit() {
    this.isAdmin = false;
    this.isService=false;
    this.selectedGymPrice = { price: '' };
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
    this.GetGymPrices();
  }

  GetGymPrices() {
    this.showSpinner = true;
    this.userService.GetGymPrice().subscribe(data => {
      // if (data.role == 'admin') {
        this.isAdmin = true;
        this.userService.GetOwnerGyms().subscribe(data => {
          this.gyms = data.result;
          // this.selectedValue = this.gyms[0]._id;
          // this.selectGym = this.gyms[0];          
        });
        this.GymsPrices = data.result;
      // }else{
      //   this.selectedGymPrice = data.result;
        
      // }
      this.showSpinner = false;
    });
  }

  onOptionsSelected(e) {
    this.selectedGymPrice = this.GymsPrices.filter(function (obj) {
      if (obj.gym == e.target.value) {
        return obj;
      };
    })[0];
    
    
  }
   serviceOptionsSelected(e){
     this.selectService = this.selectedGymPrice.servicesprices.filter(function (obj) {
       if (obj._id == e.target.value) {
         return obj;
        };
      })[0];
      this.isService=true;
    
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


