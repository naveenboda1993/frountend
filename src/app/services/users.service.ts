import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../constants';

const BASEURL = Constants.BACKEND_URL;

@Injectable({
	providedIn: 'root'
})
export class UsersService {
 
	constructor(private http: HttpClient) {}

	GetUserRole(): Observable<any> {
		return this.http.get(`${BASEURL}/userrole`);
	}

	GetAllUsers(): Observable<any> {
		return this.http.get(`${BASEURL}/users`);
	}
	// Getting all gyms
	GetAllGyms(): Observable<any> {
		return this.http.get(`${BASEURL}/gymadd`);
	}
	// Getting one gym
	GetGymById(id): Observable<any> {
		return this.http.get(`${BASEURL}/getgymprofile/${id}`);
	}
	GetGymOwner(): Observable<any> {
		return this.http.get(`${BASEURL}/getgymowner`);
	}
	GetOwnerGyms(): Observable<any> {
		return this.http.get(`${BASEURL}/getownergyms`);
	}
	GetTrainer(): Observable<any> {
		return this.http.get(`${BASEURL}/gettrainer`);
	}
	GetOneTrainer(): Observable<any> {
		return this.http.get(`${BASEURL}/trainer`);
	}
	GetTrainerOne(id): Observable<any> {
		return this.http.get(`${BASEURL}/gettrainerone/${id}`);
	}
	
	GetPrice(id): Observable<any> {
		return this.http.get(`${BASEURL}/creategymprofile/${id}`);
	}
	GetGymownerOne(id): Observable<any> {
		return this.http.get(`${BASEURL}/getgymownerone/${id}`);
	}
	GetUpateTrainer(): Observable<any> {
		return this.http.get(`${BASEURL}/updatetrainer`);
	}
	GetUserById(id): Observable<any> {
		return this.http.get(`${BASEURL}/user/${id}`);
	}
	GetUserByName(username): Observable<any> {
		return this.http.get(`${BASEURL}/username/${username}`);
	}

	GetGymWorking(gym): Observable<any> {
		return this.http.post(`${BASEURL}/updategymworkinghours`, {
			gym
		});
	}
	// getting one gym 
	GetGymOne(id): Observable<any> {
		return this.http.get(`${BASEURL}/getgymone/${id}`);
	}
	FollowUser(userFollowed): Observable<any> {
		return this.http.post(`${BASEURL}/follow-user`, {
			userFollowed
		});
	}
	DeleteUser(email): Observable<any> {
		return this.http.post(`${BASEURL}/deleteuser`, {
			email
		});		
	}
	DeleteGym(email): Observable<any> {
		return this.http.post(`${BASEURL}/deletegym`, {
			email
		});		
	}
	addUser(username): Observable<any> {
		return this.http.post(`${BASEURL}/saveuser`, {
			username
		});
		
	}

	UnFollowUser(userFollowed): Observable<any> {
		return this.http.post(`${BASEURL}/unfollow-user`, {
			userFollowed
		});
	}
	MarkNotification(id, deleteValue?): Observable<any> {
		return this.http.post(`${BASEURL}/mark/${id}`, {
			id,
			deleteValue
		});
	}
	MarkAllAsRead(): Observable<any> {
		return this.http.post(`${BASEURL}/mark-all`, {
			all: true
		});
	}
	AddImage(image): Observable<any> {
		return this.http.post(`${BASEURL}/upload-image`, {
			image
		});
	}

	SetDefaultImage(imageId, imageVersion): Observable<any> {
		return this.http.get(`${BASEURL}/set-default-image/${imageId}/${imageVersion}`);
	}

	ProfileNotifications(id): Observable<any> {
		return this.http.post(`${BASEURL}/user/view-profile`, { id });
	}

	ChangePassword(body): Observable<any> {
		return this.http.post(`${BASEURL}/change-password`, body);
	}
	AddGymGallery(image,id): Observable<any> {
		return this.http.post(`${BASEURL}/upload-gym-gallery`, {
			image,id
		});
	}
	SetVisibleImage(imageId, imageStatus): Observable<any> {
		return this.http.get(`${BASEURL}/set-gym-visible-image/${imageId}/${imageStatus}`);
	}
	SaveGymServices(data) {
		return this.http.post(`${BASEURL}/updatinggymservices`, {
			data
		});
	  }
}
