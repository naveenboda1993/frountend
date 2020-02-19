import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { TokenService } from 'src/app/services/token.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trainer-terms',
  templateUrl: './trainer-terms.component.html',
  styleUrls: ['./trainer-terms.component.css']
})
export class TrainerTermsComponent implements OnInit {
  isFinish = false;
  constructor(private usersService: UsersService, private tokenService: TokenService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }
  onAgreeTerms() {
    this.isFinish = true;
  }
  finishtrainer() {
    this.route.params.subscribe(params => {
      console.log(params.id);
      if (params.id == undefined) {

      } else {
        this.usersService.FinishTrainer(params.id).subscribe(data => {
          console.log(data);
          this.router.navigate(['gymprofile/']);
        });
      }
    });
  }
}