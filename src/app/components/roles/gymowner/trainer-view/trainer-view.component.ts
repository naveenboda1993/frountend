import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import * as M from 'materialize-css';
import { UsersService } from 'src/app/services/users.service';
import _ from 'lodash';
import { TokenService } from 'src/app/services/token.service';


@Component({
	selector: 'app-trainer-view',
	templateUrl: './trainer-view.component.html',
	styleUrls: ['./trainer-view.component.css']
})
export class TrainerViewComponent implements OnInit {
	// tabElement: any;
	// postsTab = false;
	// followingTab = false;
	// followersTab = false;
	// posts = [];
	following = [];
	followers = [];
	user: { username?: any, email: any, phonenumber: any, address: any };
	name: any;
	username: any;
	userid: any;
	// gym: { workinghours: any };
	trainer: { tagline?: any, specialization?: any, experience?: any, certification?: any, id?: any, age: any };
	onlineusers: [];
	constructor(
		private route: ActivatedRoute,
		private usersService: UsersService,
		private tokenService: TokenService) { }

	ngOnInit() {
		this.user = { username: '', email: '', phonenumber: '', address: '' };
		this.trainer = { certification: '', experience: '', specialization: '', tagline: '', id: '', age: '' };
		// // this.postsTab = true;
		this.route.params.subscribe(params => {
			console.log(params.id);
			this.userid = params.id;
		});
		const tabs = document.querySelectorAll('.tabs');
		M.Tabs.init(tabs, {});
		if (this.userid == 'myprofile') {
			this.userid = this.tokenService.GetPayload();
			this.userid=this.userid._id;

		}
		this.usersService.GetTrainerOne(this.userid).subscribe(
			data => {
				this.trainer = data.tranier;
				this.user = data.user;
			},
			err => console.log(err)
		);
	}

	ngAfterViewInit() {
		// this.tabElement.style.display = 'none';
	}

	GetUserData(name) {
		this.usersService.GetUserByName(name).subscribe(
			data => {

				console.log(data.result);
				this.user = data.result;
				// this.posts = data.result.posts.reverse();
				// this.followers = data.result.followers;
				// this.following = data.result.following;
			},
			err => console.log(err)
		);
	}
	TimeFromNow(time) {
		return moment(time).fromNow();
	}
	CheckIfOnline(name) {
		const result = _.indexOf(this.onlineusers, name);
		if (result > -1) {
			return true;
		} else {
			return false;
		}
	}
	online(event) {
		this.onlineusers = event;
	}

}
