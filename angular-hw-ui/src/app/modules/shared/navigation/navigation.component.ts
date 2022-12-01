import { Input, Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @Input() toDashboardPage: boolean = true;
  @Input() toBoardPage: boolean = true;
  
}
