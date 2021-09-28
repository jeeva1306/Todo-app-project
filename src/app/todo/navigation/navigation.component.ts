import { Component, } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  onLogout() {
    this.authService.logout();
  }

  constructor(private authService: AuthService) { }

}
