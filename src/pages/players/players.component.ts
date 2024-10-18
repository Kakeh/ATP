import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Player } from '../../app/modules/player';
import { PlayerService } from '../../app/services/player.service';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule ],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent {
  players: Player[] = [];
  isFormVisible = false;
  playerForm: FormGroup;
  searchText: string = '';
  constructor(private playerService: PlayerService, private fb: FormBuilder) {
    
    this.playerForm = this.fb.group({
      name: [''],
      country: [''],
      age: [null],
      points: [null],
      tournamentsPlayed: [null]
    });
  }

  ngOnInit() {
   this.getPlayers();

  }

  toggleAddForm() {
    this.isFormVisible = !this.isFormVisible;
  }
  getPlayers(): void {
    this.playerService.getPlayers().subscribe(players =>
       {
        this.players = players;
      }
      );
  }

  addPlayer(): void {
    if (this.playerForm.invalid) {
      return;
    }

    const newPlayer: Player = {
      id: 0, 
      name: this.playerForm.value.name,
      country: this.playerForm.value.country,
      age: this.playerForm.value.age,
      points: this.playerForm.value.points,
      tournamentsPlayed: this.playerForm.value.tournamentsPlayed
    };

    this.playerService.addPlayer(newPlayer).subscribe(player => {
      this.players.push(player);
      this.playerForm.reset(); 
    });
  }

  deletePlayer(id: number): void {
    this.playerService.deletePlayer(id).subscribe(() => {
       this.players = this.players.filter(p => p.id !== id);
    });
  }



}
