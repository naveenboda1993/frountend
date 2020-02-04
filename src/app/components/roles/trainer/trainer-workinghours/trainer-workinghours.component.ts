import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-trainer-workinghours',
  templateUrl: './trainer-workinghours.component.html',
  styleUrls: ['./trainer-workinghours.component.css']
})
export class TrainerWorkinghoursComponent implements OnInit {

  showSpinner = false;
  selectedValue: any;
  trainers: any;
  selectTrainer: any;
  constructor(private userService: UsersService) {

  }

  ngOnInit() {
    this.GetTrainers();
  }
  //workinghours
  GetTrainers() {
    this.showSpinner = true;
    this.userService.GetAllTrainers().subscribe(data => {
      console.log(data);
      this.trainers = data.result;
      this.selectedValue = this.trainers[0]._id;
      this.selectTrainer = this.trainers[0];
      this.showSpinner = false;
    });
  }
  //onOptionsSelected
  onOptionsSelected(e) {
    this.selectTrainer = this.trainers.filter(function (obj) {
      if (obj._id == e.target.value) {
        return obj;
      };
    })[0];
  }

}
