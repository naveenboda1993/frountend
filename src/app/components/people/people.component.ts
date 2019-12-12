import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import _ from 'lodash';
import { TokenService } from 'src/app/services/token.service';
import io from 'socket.io-client';
import { Router } from '@angular/router';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Constants } from 'src/app/constants';

@Component({
	selector: 'app-people',
	templateUrl: './people.component.html',
	styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
	users = [];
	loggedInUser: any;
	userArr = [];
	socket: any;
	onlineusers = [];

	constructor(private userService: UsersService, private tokenService: TokenService, private router: Router) {
		this.socket = io(Constants.HOME_URL);
	}

	ngOnInit() {
		this.loggedInUser = this.tokenService.GetPayload();
		this.GetUsers();
		this.GetUser();
		this.socket.on('refreshPage', () => {
			this.GetUsers();
			this.GetUser();
		});
	}
	GetUsers() {
		this.userService.GetAllUsers().subscribe(data => {
			_.remove(data.result, { username: this.loggedInUser.username });
			this.users = data.result;
		});
	}

	GetUser() {
		this.userService.GetUserById(this.loggedInUser._id).subscribe(data => {
			this.userArr = data.result.following;
		});
	}

	FollowUser(user) {
		this.userService.FollowUser(user._id).subscribe(data => {
			this.socket.emit('refresh', {});
		});
	}
	ViewUser(user) {
		this.router.navigate([user.username]);
		if (this.loggedInUser.username !== user.username) {
			// console.log(user.username);
			this.userService.ProfileNotifications(user._id).subscribe(
				data => {
					this.socket.emit('refresh', {});
				},
				err => console.log(err)
			);
		}
	}

	CheckInArray(arr, id) {
		const result = _.find(arr, ['userFollowed._id', id]);
		if (result) {
			return true;
		} else {
			return false;
		}
	}

	online(event) {
		this.onlineusers = event;
	}

	CheckIfOnline(name) {
		const result = _.indexOf(this.onlineusers, name);
		if (result > -1) {
			return true;
		} else {
			return false;
		}
	}
}
