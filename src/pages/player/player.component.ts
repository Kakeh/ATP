import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Player } from '../../app/modules/player';
import { PlayerService } from '../../app/services/player.service';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent {

  player: Player | undefined;
  playerForm: FormGroup;
  id!: number;

  constructor(private route: ActivatedRoute, private playerService: PlayerService, private router: Router, private fb: FormBuilder) {
    this.playerForm = this.fb.group({
      id: [this.id],
      name: [''],
      country: [''],
      age: [null],
      points: [null],
      tournamentsPlayed: [null]
    });
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!; 
    this.playerService.getPlayerById(this.id).subscribe(player => {
      this.player = player; 
      this.playerForm.patchValue(player!);
      this.playerForm.controls['id'].disable();
    });
  }

  get name() {
    return this.playerForm.get('name') as FormControl;
  }


  editPlayer() {
    this.player = this.playerForm.value;
    this.player!.id = this.id;
    this.playerService.editPlayer(this.player!).subscribe(()=> {
    this.router.navigate(['/players']);
    })
    }
}
