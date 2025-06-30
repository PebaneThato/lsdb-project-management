import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const userRole = this.auth.currentUserValue().user_role;

    if (userRole === 'Admin' || userRole === 'Project Manager') {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
