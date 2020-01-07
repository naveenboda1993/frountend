import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../constants';

const BASEURL = Constants.BACKEND_URL;
@Injectable({
	providedIn: 'root'
})
export class PostService {
	constructor(private http: HttpClient) {}

	addPost(body): Observable<any> {
		return this.http.post(`${BASEURL}/post/add-post`, body);
	}

	getAllPosts(): Observable<any> {
		return this.http.get(`${BASEURL}/posts`);
	}
	getAllGyms(): Observable<any> {
		return this.http.get(`${BASEURL}/getallgyms`);
	}
	addLike(body): Observable<any> {
		return this.http.post(`${BASEURL}/post/add-like`, body);
	}
	addComment(postId, comment): Observable<any> {
		return this.http.post(`${BASEURL}/post/add-comment`, {
			postId,
			comment
		});
	}
	getPost(id): Observable<any> {
		return this.http.get(`${BASEURL}/post/${id}`);
	}
}
