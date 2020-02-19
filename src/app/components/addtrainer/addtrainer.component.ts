import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-addtrainer',
  templateUrl: './addtrainer.component.html',
  styleUrls: ['./addtrainer.component.css']
})
export class AddtrainerComponent implements OnInit {
  errorMessage: string;
  showSpinner = false;
  startingtime: any;
  dob: Date;
  age: number;
  selectedFile: any;
  socket: any;
  endingtime: any;
  id: number = 1;
  timings: Array<{ id: number, starting: string, ending: string }>;
  addtrainerForm: FormGroup;
  // slots: { id: number; starting: string; ending: string; }[];
  slots?: any;
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private fb: FormBuilder,
    private router: Router,
    private tokenService: TokenService) { }

  ngOnInit() {
    this.init();

  }
  init() {
    this.addtrainerForm = this.fb.group({
      username: ['', Validators.required],
      surname: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      phonenumber: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      certification: ['', Validators.required],
      specialization: ['', Validators.required],
      tagline: ['', Validators.required],
      experience: ['', Validators.required],
      // id: ['', Validators.required],
      flatno: ['', Validators.required],
      street: ['', Validators.required],
      area: ['', Validators.required],
      locality: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      state: ['', Validators.required],
      language: ['', Validators.required],
      accountnumber: ['', Validators.required],
      bankname: ['', Validators.required],
      ifsccode: ['', Validators.required],
      holdername: ['', Validators.required],
      officenumber: ['', Validators.required]
    });
    this.timings = [{ id: this.id, starting: '10:00 AM', ending: '09:00 PM' }];
  }
  addTimeing() {
    this.id++;
    this.timings.push({ id: this.id, starting: this.startingtime, ending: this.endingtime });
    this.startingtime = '';
    this.endingtime = '';
  }
  removeTimeing(timing) {
    this.timings = this.timings.filter(function (obj) {
      return obj.id !== timing.id;
    });
  }
  saveTrainer() { 
    // console.log(this.addtrainerForm.value);
    // this.router.navigate(['train-workinghours/5e340fefaf88ca4340f10663' ]);
    console.log({ result: this.addtrainerForm.value, timings: this.timings });
    if (this.addtrainerForm.valid) {
      this.showSpinner = true;
      this.authService.trainer(this.addtrainerForm.value).subscribe(
        data => {
          // this.tokenService.SetToken(data.token);
          this.addtrainerForm.reset();
          setTimeout(() => {
            this.router.navigate(['train-workinghours/' + data.trainerid]);
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
  Upload() {
    const filePath = <HTMLInputElement>document.getElementById('filePath');
    filePath.value = '';
    if (this.selectedFile) {
      this.usersService.AddImage(this.selectedFile).subscribe(
        data => {
          this.socket.emit('refresh', {});
          const filePath = <HTMLInputElement>document.getElementById('filePath');
          filePath.value = '';
        },
        err => console.log(err)
      );
    }
  }
  CalculateAge() 
  {
    if (this.dob) {
      var timeDiff = Math.abs(Date.now() - new Date(this.dob).getTime());
      this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }
  }
}
