import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-timings',
  templateUrl: './edit-timings.component.html',
  styleUrls: ['./edit-timings.component.css']
})
export class EditTimingsComponent implements OnInit {
  startingtime: any;
  showSpinner = false;
  endingtime: any;
  id: number = 1;
  timings: Array<{ id: number, starting: string, ending: string }>;
  selectGymid: any;
  selectDay: any;
  gyms: any;  
  selectGym: {workinghours:any}; 
  selectDateValue: {duration:any,numberofbookings:any,slots?:any,multiplebookings?:any,status?:any};
  constructor(private route: ActivatedRoute, private userService: UsersService) {

  }

  ngOnInit() {
    this.selectDateValue={duration:'',numberofbookings:''};
    this.route.params.subscribe(params => {
      console.log(params.name);
      console.log(params.value);
      this.selectGymid = params.value;
      this.selectDay = params.name;
      this.GetGyms();
    });
    // this.timings = [{ id: this.id, starting: '10:00 AM', ending: '09:00 PM' }];
  }

  addTimeing() {
    this.id++;
    this.timings.push({ id: this.id, starting: this.startingtime, ending: this.endingtime });
    this.startingtime = '';
    this.endingtime = '';
  }
  removeTimeing(timing) {
    this.timings = this.timings.filter(function (obj) {
      return obj.id !== timing.id;
    });
  }
  GetGyms() {
    this.showSpinner = true;
    this.userService.GetOwnerGyms().subscribe(data => {
      console.log(data);
      var gymid=this.selectGymid;
      var selectDay=this.selectDay;
      this.gyms = data.result;
      this.selectGym = this.gyms.filter(function (obj) {
        if (obj._id === gymid) {
          return obj;
        };
      })[0];
      this.selectDateValue = this.selectGym.workinghours.filter(function (obj1) {
        if (obj1.day == selectDay) {
          return obj1;
        };
      })[0];
      this.timings = this.selectDateValue.slots;
      this.showSpinner = false;
    });
  }

}
