/**
 * Service - Auth services
 * This service deals with the authentication and session handling
 * @author : deepu TG | deeputg1992@gmail.com
 */
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userProfile;
  token;

  constructor(
    private apiService: ApiService,
  ) {
    this.setUserProperties()
  }

  /**
   * setting up the properties of this service
   */
  setUserProperties(): void {
    if (sessionStorage.getItem('userLogin')) {
      this.apiService.setHttpOptions();
      const sessionData = JSON.parse(sessionStorage.getItem('userLogin'));
      const userProfile = sessionData.userProfile;
      const token = sessionData.token;

      this.userProfile = userProfile;
      this.token = token;
    }
    else {
      this.userProfile = null;
      this.token = null;
    }
  }

  /**
   * setting up session data, keeping user loged in.
   * @param userdata
   */
  setUser(userdata): void {
    sessionStorage.removeItem('userLogin');
    sessionStorage.setItem('userLogin', JSON.stringify(userdata));
    this.setUserProperties();
  }

  /**
   * setting up session data, keeping user loged in.
   * @param userdata
   */
  logoutUser(): void {
    sessionStorage.removeItem('userLogin');
    this.setUserProperties();
  }

  /**
   * returning the portal url according to uerType
   * @param userTypeId
   */
  find_UserTypePortal(userTypeId): string {
    let url = '';
    switch (userTypeId) {
      case 1:
        url = environment.adminPortalUrl;
        break;
      case 2:
        url = environment.institutePortalUrl;
        break;
      case 3:
        url = environment.studentPortalUrl;
        break;

      default:
        url = environment.studentPortalUrl;
        break;
    }
    return url;
  }

}
