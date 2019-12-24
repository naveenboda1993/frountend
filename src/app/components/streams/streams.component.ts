import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import * as M from 'materialize-css';
import { NgIf } from '@angular/common';

@Component({
	selector: 'app-streams',
	templateUrl: './streams.component.html',
	styleUrls: ['./streams.component.css']
})
export class StreamsComponent implements OnInit {
	token: any;
	userrole:any;
	streamsTab = false;
	topStreamsTab = false;
	tabs: boolean;
	streams: boolean;
	constructor(private userService: UsersService,private tokenService: TokenService, private router: Router) {}

	ngOnInit() {
		this.streamsTab = true;
		this.token = this.tokenService.GetPayload();
		const tabs = document.querySelector('.tabs');
		M.Tabs.init(tabs, {});	
		this.GetUserRole();
	
	}

	CheckUser(role){
		// console.log(role);
	}
	GetUserRole() {
		// this.userService.GetUserRole().subscribe(
		// 	data => {
		// 		console.log(data);


				
		// 		this.userrole = data.role;
		// 	},
		// 	err => {
		// 		if (err.error.token == null) {
		// 			this.router.navigate(['']);
		// 		}
		// 	}
		// );
	}
	ChangeTabs(value) {
		if (value == 'streams') {
			this.streamsTab = true;
			this.topStreamsTab = false;
		}
		if (value == 'top') {
			this.streamsTab = false;
			this.topStreamsTab = true;
		}
		// NgIf == 'addpeople' {
		// 	this.streams == false;			
		// }
		
		// if (value == 'addpeolpe') {
		// 	this.streamsTab = false;
		// 	this.topStreamsTab = false;
		// }

	}
}
