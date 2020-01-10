import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-gyms-list',
  templateUrl: './gyms-list.component.html',
  styleUrls: ['./gyms-list.component.css']
})
export class GymsListComponent implements OnInit {
  gyms = [];
  showSpinner: boolean;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.GetGyms();
  }
  GetGyms() {
		this.showSpinner = true;
		this.authService.getGyms().subscribe(data => {
      console.log(data);
			this.gyms = data.result;
			this.showSpinner = false;
		});
	}
}
