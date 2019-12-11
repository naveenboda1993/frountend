import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as M from 'materialize-css';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import * as moment from 'moment';

@Component({
	selector: 'app-view-user',
	templateUrl: './view-user.component.html',
	styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit, AfterViewInit {
	tabElement: any;
	postsTab = false;
	followingTab = false;
	followersTab = false;
	posts = [];
	following = [];
	followers = [];
	user: any;
	name: any;

	constructor(private route: ActivatedRoute, private usersService: UsersService) {}

	ngOnInit() {
		this.postsTab = true;

		const tabs = document.querySelectorAll('.tabs');
		M.Tabs.init(tabs, {});
		this.tabElement = document.querySelector('.nav-content');

		this.route.params.subscribe(params => {
			this.name = params.name;
			this.GetUserData(this.name);
		});
	}

	ngAfterViewInit() {
		this.tabElement.style.display = 'none';
	}

	GetUserData(name) {
		this.usersService.GetUserByName(name).subscribe(
			data => {
				console.log(data.result);
				this.user = data.result;
				this.posts = data.result.posts.reverse();
				this.followers = data.result.followers;
				this.following = data.result.following;
			},
			err => console.log(err)
		);
	}

	ChangeTab(value) {
		if (value === 'posts') {
			this.postsTab = true;
			this.followersTab = false;
			this.followingTab = false;
		}
		if (value === 'following') {
			this.postsTab = false;
			this.followersTab = true;
			this.followingTab = false;
		}
		if (value === 'followers') {
			this.postsTab = false;
			this.followersTab = false;
			this.followingTab = true;
		}
	}
	TimeFromNow(time) {
		return moment(time).fromNow();
	}
}
