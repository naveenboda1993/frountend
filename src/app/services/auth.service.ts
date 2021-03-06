import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from "src/app/constants";

const BASEURL = Constants.BACKEND_URL;
@Injectable({
	providedIn: 'root'
})
export class AuthService {


	constructor(private http: HttpClient) { }

	registerUser(body): Observable<any> {
		return this.http.post(`${BASEURL}/register`, body);
	}
	gymowner(body): Observable<any> {
		return this.http.post(`${BASEURL}/gymowner`, body);
	}
	addservice(body): Observable<any> {
		return this.http.post(`${BASEURL}/addservice`, body);
	}
	gymadd(body): Observable<any> {
		return this.http.post(`${BASEURL}/creategymprofile`, body);
	}
	bankadd(body): Observable<any> {
		return this.http.post(`${BASEURL}/creategymprofile`, body);
	}
	updategym(body,id): Observable<any> {
		return this.http.post(`${BASEURL}/updategymprofile/${id}`, body);
	}
	trainer(body): Observable<any> {
		return this.http.post(`${BASEURL}/trainer`, body);
	}
	updatetrainer(body,id): Observable<any> {
		return this.http.post(`${BASEURL}/updatetrainer/${id}`, body);
	}
	updateprice(body): Observable<any> {
		return this.http.post(`${BASEURL}/updateprice`, body);
	}
	updategymowner(body): Observable<any> {
		return this.http.post(`${BASEURL}/updateUser`, body);
	}
	loginUser(body): Observable<any> {
		return this.http.post(`${BASEURL}/login`, body);
	}
	deleteUser(body): Observable<any> {
		return this.http.post(`${BASEURL}/deleteuser`, body);
	}

	getAreas(): Observable<any> {
		return this.http.get(`${BASEURL}/getareas`);
	}
	getServices(): Observable<any> {
		return this.http.get(`${BASEURL}/getservice`);
	}
	//without getgyms
	getGyms(): Observable<any> {
		return this.http.get(`${BASEURL}/getgyms`);
	}
}
