import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { UsersService } from 'src/app/services/users.service';
import { TokenService } from 'src/app/services/token.service';
import io from 'socket.io-client';
import { Constants } from "src/app/constants";

const BASEURL = Constants.HOME_URL;
const URL = Constants.IMG_URL;

@Component({
	selector: 'app-images',
	templateUrl: './images.component.html',
	styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
	uploader: FileUploader = new FileUploader({
		url: URL,
		disableMultipart: true
	});
	user: any;
	selectedFile: any;
	images = [];
	socket: any;

	constructor(private usersService: UsersService, private tokenService: TokenService) {
		this.socket = io(Constants.HOME_URL);
	}

	ngOnInit() {
		this.user = this.tokenService.GetPayload();
		this.GetUser();

		this.socket.on('refreshPage', () => {
			this.GetUser();
		});
	}

	GetUser() {
		this.usersService.GetUserById(this.user._id).subscribe(
			data => {
				this.images = data.result.images;
			},
			err => console.log(err)
		);
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
			this.usersService.AddImage(this.selectedFile).subscribe(
				data => {
					this.socket.emit('refresh', {});
					const filePath = <HTMLInputElement>document.getElementById('filePath');
					filePath.value = '';
				},
				err => console.log(err)
			);
		}
	}

	SetProfileImage(image) {
		this.usersService.SetDefaultImage(image.imgId, image.imgVersion).subscribe(
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
}
