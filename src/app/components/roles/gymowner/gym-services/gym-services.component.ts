import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gym-services',
  templateUrl: './gym-services.component.html',
  styleUrls: ['./gym-services.component.css']
})
export class GymServicesComponent implements OnInit {
  showSpinner = false;
  selectedValue: any;
  gyms: any;
  selectGym: any;
  services: any;
  servicesData: any;
  servicesList: any;
  isService: boolean = false;
  constructor(private userService: UsersService, private authService: AuthService,
    private router: Router, ) { }



  ngOnInit() {
    this.servicesList = [];

    this.GetGyms();
  }

  GetGyms() {
    this.showSpinner = true;
    this.userService.GetOwnerGyms().subscribe(data => {
      this.gyms = data.result;
      this.selectedValue = this.gyms[0]._id;
      this.selectGym = this.gyms[0];
      this.authService.getServices().subscribe(data1 => {
        this.servicesData = data1.result;
        this.services = this.removeElements(data1.result, data.result[0].services);
        this.servicesList = data.result[0].services;
        // this.services = data.result;
        this.isService = true;
      });
    });

  }
  removeElements(myArray, toRemove) {
    return myArray.filter(function (el) {
      return !toRemove.some((f) => {
        return f._id === el._id;
      });
    });
  }
  onOptionsSelected(e) {
    this.selectGym = this.gyms.filter(function (obj) {
      if (obj._id == e.target.value) {
        return obj;
      };
    })[0];
    this.services = this.removeElements(this.servicesData, this.selectGym.services);

    this.servicesList = this.selectGym.services;
    console.log(this.selectGym);
  }
  onServiceSelected(service) {
    var isRemove = true;
    this.servicesList.filter(function (obj) {
      if (obj._id == service._id) {
        isRemove = false;
      }
    });
    if (isRemove) {
      this.servicesList.push(service);
      this.services = this.services.filter(item => item._id !== service._id);
    } else {
      this.servicesList = this.servicesList.filter(item => item._id !== service._id);
    }
  }

  submitServices() {
    this.userService.SaveGymServices({ gymid: this.selectGym._id, services: this.servicesList }).subscribe(data => {
      console.log(data);
      setTimeout(() => {
        this.router.navigate(['gymprofile']);
      }, 2000);
    });
  }

}
