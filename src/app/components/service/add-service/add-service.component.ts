import { Component, OnInit } from '@angular/core';
// import { UsersService } from 'src/app/services/users.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {
  errorMessage: string;
  showSpinner = false;
  addserviceForm: FormGroup;
  selectDateValue:{status?:any};
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private tokenService: TokenService) { }


  ngOnInit() {
    this.init();
    this.selectDateValue={status:''};
  }
  init(){
    this.addserviceForm=this.fb.group({
      servicename:['', Validators.required],
      servicedec:['', Validators.required],
      servicecode:['', Validators.required],
      status:['', Validators.required],
    });
  }
addservice(){
  // console.log(this.signupForm.value);
  this.showSpinner = true;
  this.authService.addservice(this.addserviceForm.value).subscribe(
    data => {
      // this.tokenService.SetToken(data.token);
      this.addserviceForm.reset();
      setTimeout(() => {
        this.router.navigate(['servicelist']);
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
