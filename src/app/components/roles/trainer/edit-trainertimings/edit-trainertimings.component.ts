import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/constants';
import io from 'socket.io-client';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-edit-trainertimings',
  templateUrl: './edit-trainertimings.component.html',
  styleUrls: ['./edit-trainertimings.component.css']
})
export class EditTrainertimingsComponent implements OnInit{
  startingtime: any;
  showSpinner = false;
  endingtime: any;
  id: number = 1;
  timings: Array<{ id: number, starting: string, ending: string }>;
  selectTrainerid: any;
  selectDay: any;
  trainers: any;
  selectTrainer: { workinghours: any };
  selectDateValue: { duration: any, numberofbookings: any, slots?: any, multiplebookings?: any, status?: any };
  socket: any;
  constructor(private route: ActivatedRoute, private userService: UsersService, private router: Router) {
    this.socket = io(Constants.HOME_URL);
  }

  ngOnInit() {
    this.selectDateValue = { duration: '', numberofbookings: '' };
    this.route.params.subscribe(params => {
      console.log(params.name);
      console.log(params.value);
      this.selectTrainerid = params.value;
      this.selectDay = params.name;
      this.GetTrainers();
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
  GetTrainers() {
    this.showSpinner = true;
    this.userService.GetAllTrainers().subscribe(data => {
      console.log(data);
      var gymid = this.selectTrainerid;
      var selectDay = this.selectDay;
      this.trainers = data.result;
      this.selectTrainer = this.trainers.filter(function (obj) {
        if (obj._id === gymid) {
          return obj;
        };
      })[0];
      this.selectDateValue = this.selectTrainer.workinghours.filter(function (obj1) {
        if (obj1.day == selectDay) {
          return obj1;
        };
      })[0];
      this.timings = this.selectDateValue.slots;
      this.showSpinner = false;
    });
  }

  saveBookingTimings() {
    //  this.selectGym selectDateValue.duration selectDateValue.multiplebookings selectDateValue.numberofbookings timings selectDateValue.status
    var data = {
      'selecttrainer': this.selectTrainer,
      'selectdatevalue': this.selectDateValue,
      'timings': this.timings
    }
    console.log(data);
    this.userService.GetTrainerWorking(data).subscribe(data1 => {
      console.log(data1);
      this.router.navigate(['train-workinghours']);
      // router.navigate(['workinghours']);
    });
  }

}
