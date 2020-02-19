import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  isCreation = true;
  constructor(private userService: UsersService, private route: ActivatedRoute,
    private router: Router) {

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
      this.route.params.subscribe(params => {
        console.log(params.id);
        if (params.id == undefined) {
          this.selectedValue = this.trainers[0]._id;
          this.selectTrainer = this.trainers[0];
        } else {
          this.selectTrainer = this.trainers.filter(function (obj) {
            if (obj._id == params.id) {
              return obj;
            };
          })[0];
          this.selectedValue = this.selectTrainer._id;
          this.isCreation = false;
        }
      });

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
  nexttrainer(){
    this.router.navigate(['documents/' + this.selectTrainer._id]);
  }

}
