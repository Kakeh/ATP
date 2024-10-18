import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Player } from '../modules/player';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

 
   createDb(): {} | Observable<{}> | Promise<{}> {
    const PLAYERS: Player[] = [
      { id: 1, name: 'Andy Murray', country: 'United States', age: 29, points: 11540, tournamentsPlayed: 17 },
      { id: 2, name: 'Novak Djokovic', country: 'Serbia', age: 31, points: 9735, tournamentsPlayed: 16 },
      { id: 3, name: 'Stan Wawrinkas', country: 'Suisse', age: 31, points: 5195, tournamentsPlayed: 19 },
      { id: 4, name: 'Milos Raonic', country: 'Canada', age: 26, points: 5080, tournamentsPlayed: 20 },
      { id: 5, name: 'Kei Nishikori', country: 'Japan', age: 27, points: 4730, tournamentsPlayed: 20 }
    ];

    return {PLAYERS};
  }
  constructor() { }
}
