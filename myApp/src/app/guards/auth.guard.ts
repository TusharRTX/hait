import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';
import { DjangoapiService } from '../conexion/djangoapi.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private apiService: DjangoapiService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const requiredRoles = next.data['requiredRoles'] || [next.data['requiredRole']];
    return this.apiService.isAuthenticated$.pipe(
      take(1),
      switchMap(isAuthenticated =>
        this.apiService.role$.pipe(
          take(1),
          map(role => {
            if (isAuthenticated && (!requiredRoles || requiredRoles.includes(role))) {
              return true;
            } else {
              this.router.navigate(['/iniciosesion']);
              return false;
            }
          })
        )
      )
    );
  }
}






