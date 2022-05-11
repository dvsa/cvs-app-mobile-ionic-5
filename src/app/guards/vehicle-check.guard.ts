import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '@providers/auth';
import { TESTER_ROLES, VEHICLE_TYPE } from '@app/app.enums';

@Injectable({
  providedIn: 'root'
})
export class VehicleCheckGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService,
              private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    const { testerRoles: roles } = this.authenticationService.tokenInfo;

    switch (this.router.getCurrentNavigation().extras.state.test.vehicles[0].techRecord.vehicleType) {
      case VEHICLE_TYPE.PSV: {
        return roles.some(
          (role) => role === TESTER_ROLES.PSV || role === TESTER_ROLES.FULL_ACCESS
        );
      }
      case VEHICLE_TYPE.HGV:
      case VEHICLE_TYPE.TRL: {
        return roles.some(
          (role) => role === TESTER_ROLES.HGV || role === TESTER_ROLES.FULL_ACCESS
        );
      }
    }

  }
}
