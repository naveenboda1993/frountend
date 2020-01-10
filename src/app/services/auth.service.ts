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
	gymadd(body): Observable<any> {
		return this.http.post(`${BASEURL}/creategymprofile`, body);
	}
	trainer(body): Observable<any> {
		return this.http.post(`${BASEURL}/trainer`, body);
	}
	updatetrainer(body): Observable<any> {
		return this.http.post(`${BASEURL}/updatetrainer`, body);
	}
	loginUser(body): Observable<any> {
		return this.http.post(`${BASEURL}/login`, body);
	}
	deleteUser(body): Observable<any> {
		return this.http.post(`${BASEURL}/deleteuser`, body);
	}
}
