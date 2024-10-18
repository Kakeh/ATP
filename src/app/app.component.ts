import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PlayersComponent } from '../pages/players/players.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , PlayersComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ATP';
}
