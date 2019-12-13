import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from "src/app/constants";

const BASEURL = Constants.BACKEND_URL;
@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private http: HttpClient) {}

	registerUser(body): Observable<any> {
		return this.http.post(`${BASEURL}/register`, body);
	}
	addUser(body): Observable<any> {
		return this.http.post(`${BASEURL}/saveusers`, body);
	}
	loginUser(body): Observable<any> {
		return this.http.post(`${BASEURL}/login`, body);
	}
	deleteUser(body): Observable<any> {
		return this.http.post(`${BASEURL}/deleteuser`, body);
	}
}
