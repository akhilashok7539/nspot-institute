/**
 * Service - API services
 * This service deals with the api calls and returns the API response
 * @author : deepu TG | deeputg1992@gmail.com
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private httpOptions: any;
  public accessToken: string;
  public userLogedIn;

  SERVER_URL = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) {
    this.setHttpOptions();
  }


  /**
   * sets the http header
   * Authorization header setup in the case of loged in user
   * @param : nil
   * @returns : void
   */
  setHttpOptions(): void {
    this.userLogedIn = JSON.parse(sessionStorage.getItem('userLogin'));
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    if (this.userLogedIn != null) {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.userLogedIn.token
      });
    }

    this.httpOptions = { headers };
  }

  // general get service
  public doGetRequest(url: any) {
    return this.http.get<any>(this.SERVER_URL + url, this.httpOptions).pipe(
      map((response) => {
        return response;
      }),
    );
  }

  // general post service
  public doPostRequest(url: any, data: any) {
    console.log(data);
    
    return this.http.post<any>(this.SERVER_URL + url, data, this.httpOptions).pipe(
      map((response) => {
        return response;
      }),
    );
  }

  public doPostRequest_upload(url: any, data: any) {
    // this.getAccessToken()
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        // Authorization: 'Bearer ' + this.accessToken,
      }),
    }
    return this.http.post<any>(this.SERVER_URL + url, data, httpOptions).pipe(
      map((response) => {
        return response
      }),
    )
  }
  public doPutRequest(url: any, data: any) {
    // this.getAccessToken()
   
    return this.http.put<any>(this.SERVER_URL + url, data).pipe(
      map((response) => {
        return response
      }),
    )
  }
}
