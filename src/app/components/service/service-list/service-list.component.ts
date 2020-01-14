import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {
  services = [];
  showSpinner: boolean;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.GetServices();
  }
  GetServices() {
		this.showSpinner = true;
		this.authService.getServices().subscribe(data => {
      console.log(data);
			this.services = data.result;
			this.showSpinner = false;
		});
	}
}
