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
	role='gumowner';
	streams: any;
	userrole: any;
	isPhotos:boolean=true;
	isFollowers:boolean=true;
	isStreams:boolean=true;
	isPeople:boolean=true;
	isGymowner:Boolean=true;
	isTrainers: boolean=true;
	isFollowing: boolean=true;
	isWorkshours: boolean=true;
	isGymview: boolean=true;
	isTrainerview: boolean=true;
	isGymprofile: boolean=true;
	isTrainerprofile:boolean=true;

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
						this.isPhotos=true;
						this.isFollowers=false;
						this.isStreams=false;
						this.isPeople=false;
						this.isGymowner=true;
						this.isTrainers=false;
						this.isFollowing=false;
						this.isGymprofile=true;
						this.isGymview=true;
						this.isTrainerview=false;
						this.isTrainerprofile=false;

						break;
					case "trainer":
						this.isPhotos=true;
						this.isFollowers=false;
						this.isStreams=false;
						this.isPeople=false;
						this.isGymowner=false;
						this.isTrainers=true;
						this.isFollowing=false;
						this.isGymprofile=false;
						this.isGymview=false;
						this.isTrainerview=true;
						this.isTrainerprofile=true;
						break;
				
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