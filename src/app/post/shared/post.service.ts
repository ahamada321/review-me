import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "./post.model";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class PostService {
  constructor(private http: HttpClient) {}

  // public getPostById(postId: string): Observable<any> {
  //   return this.http.get("/api/v1/posts/" + postId);
  // }

  // public getPosts(
  //   keywords: any,
  //   pageIndex: number,
  //   pageSize: number
  // ): Observable<any> {
  //   return this.http.post(
  //     `/api/v1/posts?page=${pageIndex}&limit=${pageSize}`,
  //     keywords
  //   );
  // }

  public createPost(postData: Post): Observable<any> {
    return this.http.post("/api/v1/posts/create", postData);
  }
  // public createPost(postData: Post): Observable<any> {
  //   return this.http.post("/api/v1/posts/create", postData);
  // }

  // public deletePost(postId: string): Observable<any> {
  //   return this.http.delete("/api/v1/posts/" + postId);
  // }

  // public updatePost(postId: string, postData: Post): Observable<any> {
  //   return this.http.patch("/api/v1/posts/" + postId, postData);
  // }

  // public getOwnerPosts(pageIndex: number, pageSize: number): Observable<any> {
  //   return this.http.get(
  //     `/api/v1/posts/manage?page=${pageIndex}&limit=${pageSize}`
  //   );
  // }

  // public getUserFavouritePosts(): Observable<any> {
  //   return this.http.get("/api/v1/posts/favourite");
  // }

  // public toggleFavourite(postId: string): Observable<any> {
  //   return this.http.get("/api/v1/posts/favourite/" + postId);
  // }
}
