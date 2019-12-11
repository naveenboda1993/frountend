import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import io from 'socket.io-client';
import { Constants } from "src/app/constants";
@Component({
  selector: 'app-addpepole',
  templateUrl: './addpepole.component.html',
  styleUrls: ['./addpepole.component.css']
})
export class AddpepoleComponent implements OnInit {
	followers = [];
	user: any;
	socket: any;
	addpeopleForm: FormGroup;

	constructor(private tokenService: TokenService,private fb: FormBuilder, private usersService: UsersService) {
		this.socket = io(Constants.HOME_URL);
	}

  ngOnInit() {
	this.addpeopleForm = this.fb.group({
		post: ['', Validators.required]
	});
  }

}
