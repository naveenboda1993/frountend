import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	errorMessage: string;
	showSpinner = false;
	constructor(
		private authService: AuthService,
		private fb: FormBuilder,
		private router: Router,
		private tokenService: TokenService, private usersService: UsersService
	) {}

	ngOnInit() {
		this.init();
	}

	init() {
		this.loginForm = this.fb.group({
			username: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	loginUser() {
		this.showSpinner = true;
		this.authService.loginUser(this.loginForm.value).subscribe(
			data => {
				// console.log(data.user.role);
				this.tokenService.SetToken(data.token);
				this.loginForm.reset();
				setTimeout(() => {
					this.usersService.GetUserRole().subscribe(
						data => {
							switch (data.role) {
								case "gymowner":
									this.router.navigate(['gymprofile']);							
									break;
								case "trainer":
									this.router.navigate(['trainerprofile']);
									break;
								case "admin":
									this.router.navigate(['gymowner']);
									break;
								case "user":
									this.router.navigate(['gymslist']);
									break;
								default:
									this.router.navigate(['streams']);
									break;
							}
						});
				}, 2000);
			},
			err => {
				this.showSpinner = false;
				console.log(err);
				if (err.error.message) {
					this.errorMessage = err.error.message;
				}				
			},						
		);
	}
}
