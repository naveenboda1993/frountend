import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants';
import { UsersService } from 'src/app/services/users.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import io from 'socket.io-client';
import _ from 'lodash';



@Component({
  selector: 'app-gymprofile',
  templateUrl: './gymprofile.component.html',
  styleUrls: ['./gymprofile.component.css']
})
export class GymprofileComponent implements OnInit {
	gyms = [];
	loggedInGyms: any;
	socket: any;
	onlinegyms = [];
	showSpinner = false;
  gymArr: any;
	constructor(private userService: UsersService, private tokenService: TokenService, private router: Router) {
		this.socket = io(Constants.HOME_URL);
	}

	ngOnInit() {
		this.loggedInGyms = this.tokenService.GetPayload();
		this.GetGyms();
		this.socket.on('refreshPage', () => {
			this.GetGyms();
		});
	}
	GetGyms() {
		this.showSpinner = true;
		this.userService.GetOwnerGyms().subscribe(data => {
			this.gyms = data.result;
			this.showSpinner = false;
		});
	}

	GetGym() {
		this.userService.GetGymById(this.loggedInGyms._id).subscribe(data => {
			this.gymArr = data.result.following;
		});
	}
	
	DeleteGym(gym) {
		this.userService.DeleteGym(gym.email).subscribe(data => {
			this.socket.emit('refresh', {});
		});
	}

	ViewGym(gym) {
		this.router.navigate([gym.gymname]);
		if (this.loggedInGyms.gymname !== gym.gymname) {
			// console.log(user.username);
			this.userService.ProfileNotifications(gym._id).subscribe(
				data => {
					this.socket.emit('refresh', {});
				},
				err => console.log(err)
			);
		}
	}

	online(event) {
		this.onlinegyms = event;
	}
}
