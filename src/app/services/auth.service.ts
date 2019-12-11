import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'http://localhost:3000/api/chat';
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
}
