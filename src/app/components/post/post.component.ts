import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { Constants } from 'src/app/constants';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
	socket: any;
	posts = [];
	user: any;

	constructor(private postService: PostService, private tokenService: TokenService, private router: Router) {
		this.socket = io(Constants.HOME_URL);
	}

	ngOnInit() {
		this.user = this.tokenService.GetPayload();
		this.AllPosts();

		this.socket.on('refreshPage', data => {
			this.AllPosts();
		});
	}
	AllPosts() {
		this.postService.getAllPosts().subscribe(
			data => {
				this.posts = data.posts;
			},
			err => {
				if (err.error.token == null) {
					this.tokenService.DeleteToken();
					this.router.navigate(['']);
				}
			}
		);
	}
	LikePost(post) {
		this.postService.addLike(post).subscribe(
			data => {
				console.log(data);
				this.socket.emit('refresh', {});
			},
			err => console.log(err)
		);
	}
	CheckInLikesArray(arr, username) {
		return _.some(arr, { username: username });
	}
	TimeFromNow(time) {
		return moment(time).fromNow();
	}
	OpenCommentBox(post) {
		this.router.navigate(['post', post._id]);
	}
}
