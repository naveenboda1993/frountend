import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import io from 'socket.io-client';
import { Constants } from 'src/app/constants';

@Component({
	selector: 'app-followers',
	templateUrl: './followers.component.html',
	styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
	followers = [];
	user: any;
	socket: any;

	constructor(private tokenService: TokenService, private usersService: UsersService) {
		this.socket = io(Constants.HOME_URL);
	}

	ngOnInit() {
		this.user = this.tokenService.GetPayload();
		this.GetUser();
		this.socket.on('refreshPage', () => {
			this.GetUser();
		});
	}

	GetUser() {
		this.usersService.GetUserById(this.user._id).subscribe(
			data => {
				this.followers = data.result.followers;
			},
			err => console.log(err)
		);
	}
}
