import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TokenService } from 'src/app/services/token.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-gym-edit',
  templateUrl: './gym-edit.component.html',
  styleUrls: ['./gym-edit.component.css']
})
export class GymEditComponent implements OnInit {
  gymname: any;
  email: any;
  errorMessage: string;
  showSpinner = false;
  updateGymForm: FormGroup;
  loggedInGym: any;
  user: any;
  gym: { gymname: any,_id?:any };
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private userService: UsersService,
    private router: Router,
    private tokenService: TokenService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.gym = { gymname: '' };
    this.user = { username: '' };
    // this.trainer={certification:'',experience:'',specialization:'',tagline:'',id:'', age:''};
    this.loggedInGym = this.tokenService.GetPayload();
    this.init();
  }
  init() {
    this.gymname = ''
    this.email = ' your email'
    // this.updategymForm = this.fb.group({
    //   gymname: ['', Validators.required],
    //   email: ['', [Validators.email, Validators.required]],
    //   password: ['', Validators.required],
    //   phonenumber: ['', Validators.required],
    //   Officenumber: ['', Validators.required],
    //   address: ['', Validators.required],
    //   gymtag: ['', Validators.required],
    //   gymdec: ['', Validators.required],
    //   accountnumber: ['', Validators.required],
    //   bankname: ['', Validators.required],
    //   ifsccode: ['', Validators.required],
    //   holdername: ['', Validators.required],
    // });
    this.GetUsers();
  }

  GetUsers() {
    this.route.params.subscribe(params => {
      console.log(params.id);
      this.showSpinner = true;
      this.userService.GetGymOne(params.id).subscribe(data => {
        // this.user = data.user;
        this.gym = data.result;
        this.showSpinner = false;
      });
    });

  }

  updategym() {
    // console.log(this.signupForm.value);
    this.showSpinner = true;
    this.authService.updategym(this.gym,this.gym._id).subscribe(
      data => {
        // this.tokenService.SetToken(data.token);
        // this.updateGymForm.reset();
        setTimeout(() => {
          this.router.navigate(['gymprofile']);
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



