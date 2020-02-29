import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-gymowner-edit',
  templateUrl: './gymowner-edit.component.html',
  styleUrls: ['./gymowner-edit.component.css']
})
export class GymownerEditComponent implements OnInit {
  username: any;
  email: any;
  errorMessage: string;
  showSpinner = false;
  updateGymOwnerForm: FormGroup;
  loggedInUser: any;
  user: any;
  gymowner: any;
  gym: any;
  ownername: any;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private userService: UsersService,
    private router: Router,
    private tokenService: TokenService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.user = { username: '' };
    this.loggedInUser = this.tokenService.GetPayload();
    this.init();
  }
  init() {
    this.username = ''
    this.ownername=''
    this.email = ' your email'
    // this.updateGymOwnerForm = this.fb.group({
    // username: ['', Validators.required],
    // ownername: ['', Validators.required],
    // email: ['', [Validators.email, Validators.required]],
    // password: ['', Validators.required],
    // phonenumber: ['', Validators.required],
    // age: ['', Validators.required],
    // address: ['', Validators.required],
    // language: ['', Validators.required],
    // });
    this.GetUsers();
  }

  GetUsers() {
    this.route.params.subscribe(params => {
      console.log(params.id)
      this.showSpinner = true;
      this.userService.GetGymownerOne(params.id).subscribe(data => {
        this.user = data.user;
        // this.gym= data.gym;
        this.gymowner = data.gymowner;
        this.showSpinner = false;
      });
    });
  }

  updategymowner() {
    this.showSpinner = true;
    this.authService.updategymowner(this.user).subscribe(
      data => {
        // this.tokenService.SetToken(data.token);
        this.updateGymOwnerForm.reset();
        setTimeout(() => {
          this.router.navigate(['gymowner']);
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
