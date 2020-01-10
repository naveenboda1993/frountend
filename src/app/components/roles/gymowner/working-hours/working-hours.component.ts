import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-working-hours',
  templateUrl: './working-hours.component.html',
  styleUrls: ['./working-hours.component.css']
})
export class WorkingHoursComponent implements OnInit {

  showSpinner = false;
  selectedValue: any;
  gyms: any;
  selectGym: any;
  constructor(private userService: UsersService) {

  }

  ngOnInit() {
    this.GetGyms();
  }
  //workinghours
  GetGyms() {
    this.showSpinner = true;
    this.userService.GetOwnerGyms().subscribe(data => {
      console.log(data);
      this.gyms = data.result;
      this.selectedValue = this.gyms[0]._id;
      this.selectGym = this.gyms[0];
      this.showSpinner = false;
    });
  }
  //onOptionsSelected
  onOptionsSelected(gymid) {
    this.selectGym = this.gyms.filter(function (obj) {
      if (obj._id == gymid) {
        return obj;
      };
    })[0];
  }
}
