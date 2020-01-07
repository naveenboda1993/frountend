import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-timings',
  templateUrl: './edit-timings.component.html',
  styleUrls: ['./edit-timings.component.css']
})
export class EditTimingsComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
   
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
			console.log(params.name);
		});
  }

}
