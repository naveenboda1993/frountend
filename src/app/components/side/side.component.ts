import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import io from 'socket.io-client';
import { Constants } from 'src/app/constants';
import { NgIf } from '@angular/common';
import { GymownerComponent } from '../gymowner/gymowner.component';

@Component({
	selector: 'app-side',
	templateUrl: './side.component.html',
	styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {
	socket: any;
	user: any;
	userData: any;
	role = 'gumowner';
	streams: any;
	userrole: any;
	isPhotos: boolean = false;
	isFollowers: boolean = false;
	isStreams: boolean = false;
	isPeople: boolean = false;
	isGymowner: Boolean = false;
	isTrainers: boolean = false;
	isFollowing: boolean = false;
	isWorkinghours: boolean = false;
	isGymview: boolean = false;
	isTrainerview: boolean = false;
	isGymprofile: boolean = false;
	isTrainerprofile: boolean = false;
	isClientRole: boolean = false;
	isGymowners: boolean = false;
	isTrainer: boolean = false;
	isAdmin: boolean = false;
	isSuperadmin: boolean = false;

	constructor(private tokenService: TokenService, private usersService: UsersService) {
		this.socket = io(Constants.HOME_URL);
	}

	ngOnInit() {
		this.user = this.tokenService.GetPayload();
		this.GetUser();
		this.GetUserRole();
		this.socket.on('refreshPage', () => {
			this.GetUser();
			this.GetUserRole();
		});
	}

	GetUserRole() {
		this.usersService.GetUserRole().subscribe(
			data => {
				console.log(data);
				this.userrole = data.role;
				switch (data.role) {
					case "gymowner":
						this.isGymowners = true;
						break;
					case "trainer":
						this.isTrainer = true;
						break;
					case "user":
						this.isClientRole = true;
						break;
					case "admin":
						this.isAdmin = true;
						break
					case "superadmin":
						this.isSuperadmin = true;
					default:
						break;
				}
			}
		);
	}

	GetUser() {
		this.usersService.GetUserById(this.user._id).subscribe(data => {
			this.userData = data.result;

		});
		// 	if (this.role=="gymowner") {
		// 		this.streams=false;
		// }


	}
}