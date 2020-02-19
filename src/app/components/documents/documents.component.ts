import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { UsersService } from 'src/app/services/users.service';
import { TokenService } from 'src/app/services/token.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/constants';
import io from 'socket.io-client';

const BASEURL = Constants.HOME_URL;
const URL = Constants.IMG_URL;


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: true
  });
  user: any;
  selectedFile: any;
  documents = [];
  socket: any;
  selectedValue: any;
  name:any;
  selectName: { documents?: any, _id?: any };
  showSpinner = false;
  isCreation = true;
  constructor(private usersService: UsersService, private tokenService: TokenService, private route: ActivatedRoute,
    private router: Router) {
    this.socket = io(Constants.HOME_URL);
  }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();

    this.GetFileNames();
    this.socket.on('refreshPage', () => {
      this.GetFileNames();
    });
  }
  //workinghours
  GetFileNames() {
    this.showSpinner = true;
    this.usersService.GetAllTrainers().subscribe(data => {
      console.log(data);
      this.name = data.result;
      this.route.params.subscribe(params => {
        console.log(params.id);
        if (params.id == undefined) {
          this.selectedValue = this.name[0]._id;
          this.selectName = this.name[0];
        } else {
          this.selectName = this.name.filter(function (obj) {
            if (obj._id == params.id) {
              return obj;
            };
          })[0];
          this.selectedValue = this.selectName._id;
          this.isCreation = false;
        }
      });
      this.showSpinner = false;
    });
  }
  //onOptionsSelected
  onOptionsSelected(docid) {
    this.selectName = this.name.filter(function (obj) {
      if (obj._id == docid) {
        return obj;
      };
    })[0];
  }

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
      this.usersService.AddDocuments(this.selectedFile, this.selectName._id).subscribe(
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

  nexttrainer() {
    this.router.navigate(['trainer-terms/' + this.selectName._id]);
  }

}