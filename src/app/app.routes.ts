import { Routes } from '@angular/router';
import { PlayersComponent } from '../pages/players/players.component';
import { PlayerComponent } from '../pages/player/player.component';
import { TopComponent } from '../pages/top/top.component';

export const routes: Routes = [

    { path: 'players', component: PlayersComponent },
    { path: 'player/:id', component: PlayerComponent },
    { path: 'top', component: TopComponent },

    { path: '', redirectTo: '/players', pathMatch: 'full' }
];
