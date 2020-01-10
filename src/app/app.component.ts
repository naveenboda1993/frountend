import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './services/token.service';
import { UsersService } from './services/users.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	constructor(private router: Router, private tokenService: TokenService, private usersService: UsersService) {}
	ngOnInit() {
		const token = this.tokenService.GetToken();
		// console.log(token);
	
		if (token) {
			this.usersService.GetUserRole().subscribe(
				data => {
					switch (data.role) {
						case "gymowner":
							this.router.navigate(['gymprofile']);							
							break;
						case "trainer":
							this.router.navigate(['streams']);
							break;
						default:
							this.router.navigate(['streams']);
							break;
					}
				});
		} else {
			// this.router.navigate(['/gymslist']);
		}
	}
}
