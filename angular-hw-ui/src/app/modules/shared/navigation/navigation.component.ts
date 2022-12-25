import { Input, Component } from '@angular/core';
import { HomeService } from 'src/app/core/services/home-service/home.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @Input() toDashboardPage: boolean = true;
  @Input() toBoardPage: boolean = true;

  constructor(private homeService: HomeService) { }

  logout() {
    this.homeService.setUserTokenToStorage('');
  }
}
