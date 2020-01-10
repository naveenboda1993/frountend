import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import * as moment from 'moment';
import * as M from 'materialize-css';


@Component({
	selector: 'app-gym-view',
	templateUrl: './gym-view.component.html',
	styleUrls: ['./gym-view.component.css']
})
export class GymViewComponent implements OnInit {
	// tabElement: any;
	// postsTab = false;
	// followingTab = false;
	// followersTab = false;
	// posts = [];
	following = [];
	followers = [];
	user: any;
	name: any;
	gymid: any;
	isView: boolean=false;
	gym: { workinghours: any,gymname?:any }; 
	constructor(private route: ActivatedRoute, private usersService: UsersService) { }

	ngOnInit() {
		// this.postsTab = true;
		this.route.params.subscribe(params => {
			console.log(params.id);
			this.gymid = params.id;
		});
		const tabs = document.querySelectorAll('.tabs');
		M.Tabs.init(tabs, {});
		// this.tabElement = document.querySelector('.nav-content');

		this.usersService.GetGymById(this.gymid).subscribe(
			data => {

				console.log(data.result);
				this.gym = data.result[0];
				this.isView=true;
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

	// ChangeTab(value) {
	// 	if (value === 'posts') {
	// 		this.postsTab = true;
	// 		this.followersTab = false;
	// 		this.followingTab = false;
	// 	}
	// 	if (value === 'following') {
	// 		this.postsTab = false;
	// 		this.followersTab = true;
	// 		this.followingTab = false;
	// 	}
	// 	if (value === 'followers') {
	// 		this.postsTab = false;
	// 		this.followersTab = false;
	// 		this.followingTab = true;
	// 	}
	// }
	TimeFromNow(time) {
		return moment(time).fromNow();
	}
	returnImg(image){
		return "http://res.cloudinary.com/chatapplication/image/upload/v"+ image.imgVersion+"/"+image.imgId;
	}
	returnBImg(image){
		return "http://res.cloudinary.com/chatapplication/image/upload/v"+ image.picVersion+"/"+image.picId;
	}
}
