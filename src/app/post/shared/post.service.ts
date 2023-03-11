import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "./post.model";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class PostService {
  constructor(private http: HttpClient) {}

  // public getRentalById(rentalId: string): Observable<any> {
  //   return this.http.get("/api/v1/rentals/" + rentalId);
  // }

  // public getRentals(
  //   keywords: any,
  //   pageIndex: number,
  //   pageSize: number
  // ): Observable<any> {
  //   return this.http.post(
  //     `/api/v1/rentals?page=${pageIndex}&limit=${pageSize}`,
  //     keywords
  //   );
  // }

  public createPostAsDraft(postData: Post): Observable<any> {
    return this.http.post("/api/v1/posts/create", postData);
  }
  // public createRental(rentalData: Rental): Observable<any> {
  //   return this.http.post("/api/v1/rentals/create", rentalData);
  // }

  // public deleteRental(rentalId: string): Observable<any> {
  //   return this.http.delete("/api/v1/rentals/" + rentalId);
  // }

  // public updateRental(rentalId: string, rentalData: Rental): Observable<any> {
  //   return this.http.patch("/api/v1/rentals/" + rentalId, rentalData);
  // }

  // public getOwnerRentals(pageIndex: number, pageSize: number): Observable<any> {
  //   return this.http.get(
  //     `/api/v1/rentals/manage?page=${pageIndex}&limit=${pageSize}`
  //   );
  // }

  // public getUserFavouriteRentals(): Observable<any> {
  //   return this.http.get("/api/v1/rentals/favourite");
  // }

  // public toggleFavourite(rentalId: string): Observable<any> {
  //   return this.http.get("/api/v1/rentals/favourite/" + rentalId);
  // }
}
