import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Player } from '../../app/modules/player';
import { PlayerService } from '../../app/services/player.service';

@Component({
  selector: 'app-top',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './top.component.html',
  styleUrl: './top.component.css'
})
export class TopComponent {
  topPlayers: Player[] = [];
  searchTerm: string = '';
  players: Player[] = [];
  constructor(private playerService: PlayerService) {

  }

  ngOnInit() {
    this.playerService.getTopPlayers().subscribe(data=> {
      this.topPlayers = data;
    })
  }

  searchPlayers(): void {
    if (this.searchTerm) {
      this.playerService.searchPlayers(this.searchTerm).subscribe(players => this.players = players);
    } else {
      this.players = [];
    }
  }
}
