import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { MyOriginAuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  private url!: string;

  constructor(private auth: MyOriginAuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.url = state.url;

    if (!this.auth.isAuthenticated()) {
      if (this.isLoginOrRegisterdPage()) {
        return true;
      }
      this.router.navigate(["/"]);
      return false;
    }

    if (this.isLoginOrRegisterdPage()) {
      if (this.auth.getUserRole() === "Worker") {
        this.router.navigate(["/teacher"]);
      } else {
        this.router.navigate(["/student"]);
      }
      return false;
    }
    return true;
  }

  private isLoginOrRegisterdPage(): boolean {
    if (this.url.includes("login") || this.url.includes("register")) {
      return true;
    }
    return false;
  }
}
