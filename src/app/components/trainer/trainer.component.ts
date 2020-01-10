import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants';
import { UsersService } from 'src/app/services/users.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import io from 'socket.io-client';
import _ from 'lodash';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit {

  loggedInUser: any;
	socket: any;
	onlineusers = [];
  users: any;
  showSpinner = false;
  
  constructor( private userService: UsersService, private tokenService: TokenService, private router: Router ) {
    this.socket = io(Constants.HOME_URL);
  }

  ngOnInit(){
    this.loggedInUser = this.tokenService.GetPayload();
    this.GetUsers();
    this.socket.on('refreshPage', () => {
      });
  }
    GetUsers() {
      this.showSpinner = true;
      this.userService.GetTrainer().subscribe(data => {
      _.remove(data.result, { username: this.loggedInUser.username });
      this.users = data.result;
      this.showSpinner = false;
    });
    }
    GetUserRole() {
      this.userService.GetUserRole().subscribe(data => {
        this.users = data.result.user;
      });
    }
    FollowUser(user) {
      this.userService.FollowUser(user._id).subscribe(data => {
        this.socket.emit('refresh', {});
      });
    }
    
    DeleteUser(user) {
      this.userService.DeleteUser(user.email).subscribe(data => {
        this.socket.emit('refresh', {});
      });
    }
  
    ViewUser(user) {
      this.router.navigate(['trainerview']);
      // if (this.loggedInUser.username !== user.username) {
      //   // console.log(user.username);
      //   this.userService.ProfileNotifications(user._id).subscribe(
      //     data => {
      //       this.socket.emit('refresh', {});
      //     },
      //     err => console.log(err)
      //   );
      // }
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
