import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { UsersService } from 'src/app/services/users.service';
import { TokenService } from 'src/app/services/token.service';
import io from 'socket.io-client';
import { Constants } from "src/app/constants";
import { ActivatedRoute, Router } from '@angular/router';

const BASEURL = Constants.HOME_URL;
const URL = Constants.IMG_URL;

@Component({
  selector: 'app-gym-gallery',
  templateUrl: './gym-gallery.component.html',
  styleUrls: ['./gym-gallery.component.css']
})
export class GymGalleryComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: true
  });
  user: any;
  selectedFile: any;
  images = [];
  socket: any;
  selectedValue: any;
  gyms: any;
  selectGym: { images?: any, _id?: any };
  showSpinner = false;
  isCreation = true;
  constructor(private usersService: UsersService, private tokenService: TokenService, private route: ActivatedRoute,
    private router: Router) {
    this.socket = io(Constants.HOME_URL);
  }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();

    this.GetGyms();
    this.socket.on('refreshPage', () => {
      this.GetGyms();
    });
  }
  //workinghours
  GetGyms() {
    this.showSpinner = true;
    this.usersService.GetOwnerGyms().subscribe(data => {
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

  // GetUser() {
  // 	this.usersService.GetGymById(this.user._id).subscribe(
  // 		data => {
  // 			this.images = data.result.images;
  // 		},
  // 		err => console.log(err)
  // 	);
  // }

  OnFileSelected(event) {
    const file: File = event[0];
    this.ReadAsBase64(file)
      .then(result => {
        this.selectedFile = result;
      })
      .catch(err => console.log(err));
  }

  Upload() {
    const filePath = <HTMLInputElement>document.getElementById('filePath');
    filePath.value = '';
    if (this.selectedFile) {
      this.usersService.AddGymGallery(this.selectedFile, this.selectGym._id).subscribe(
        data => {
          const filePath = <HTMLInputElement>document.getElementById('filePath');
          filePath.value = '';
          this.socket.emit('refresh', {});
        },
        err => console.log(err)
      );
    }
  }

  SetProfileImage(image) {
    var visible = "visible";
    if (image.status == 'visible') {
      visible = "invisible";
    }
    this.usersService.SetVisibleImage(image._id, visible).subscribe(
      data => {
        this.socket.emit('refresh', {});
      },
      err => console.log(err)
    );
  }

  ReadAsBase64(file): Promise<any> {
    const reader = new FileReader();
    const fileValue = new Promise((resolve, reject) => {
      reader.addEventListener('load', () => {
        resolve(reader.result);
      });
      reader.addEventListener('error', event => {
        reject(event);
      });

      reader.readAsDataURL(file);
    });
    return fileValue;
  }

  nextgym() {
    this.router.navigate(['terms/' + this.selectGym._id]);
  }

}
