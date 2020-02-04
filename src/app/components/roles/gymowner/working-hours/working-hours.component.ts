import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  isCreation = true;
  constructor(private userService: UsersService, private route: ActivatedRoute,
    private router: Router,) {

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
      this.route.params.subscribe(params => {
        console.log(params.id);
        if (params.id == undefined) {
          this.selectedValue = this.gyms[0]._id;
          this.selectGym = this.gyms[0];
        } else {
          this.selectGym = this.gyms.filter(function (obj) {
            if (obj._id == params.id) {
              return obj;
            };
          })[0];
          this.selectedValue = this.selectGym._id;
          this.isCreation = false;
        }
      });

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

  nextgym(){
    this.router.navigate(['gymprices/' + this.selectGym._id]);
  }
}
