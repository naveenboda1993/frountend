import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent implements OnInit {
  errorMessage: string;
  showSpinner = false;
  bankForm: FormGroup;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private tokenService: TokenService) { }

  ngOnInit() {
    this.init()
  }
  init() {
    this.bankForm = this.fb.group({
      bankname: ['', Validators.required],
      accountnumber: ['', Validators.required],
      holdername: ['', Validators.required],
      ifsccode: ['', Validators.required]
    });
  }
  bankadd() {
    console.log(this.bankForm.value)
    this.showSpinner = true;
    this.authService.bankadd(this.bankForm.value).subscribe(data => {
      this.bankForm.reset();
      setTimeout(() => {
        this.router.navigate(['gymprofile'])
      }, 2000);
    },
      err => {
        this.showSpinner = false;
        console.log(err);
        if (err.error.msg) {
          this.errorMessage = err.error.msg[0].message;
        }
        if (err.error.msg) {
          this.errorMessage = err.error.message;
        }
      })
  }
}
