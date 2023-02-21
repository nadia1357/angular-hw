import { Input, Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() logOut = true;
  constructor(private authService: AuthService) {}
  
  logout() {
    this.authService.setUserTokenToStorage('');
  }
}
