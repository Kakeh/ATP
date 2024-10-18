import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Player } from '../modules/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playersUrl = 'api/PLAYERS'; 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }


  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl).pipe(
      catchError(this.handleError<Player[]>('getPlayers', []))
    );
  }


  getPlayerById(id: number): Observable<Player | undefined> {
    const url = `${this.playersUrl}/${id}`;
    return this.http.get<Player>(url).pipe(
      catchError(this.handleError<Player>(`getPlayer id=${id}`))
    );
  }


  editPlayer(player: Player): Observable<any> {
    return this.http.put(this.playersUrl, player, this.httpOptions).pipe(
      catchError(this.handleError<any>('editPlayer'))
    );
  }


  addPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(this.playersUrl, player, this.httpOptions).pipe(
      catchError(this.handleError<Player>('addPlayer'))
    );
  }


  deletePlayer(id: number): Observable<Player> {
    const url = `${this.playersUrl}/${id}`;
    return this.http.delete<Player>(url, this.httpOptions).pipe(
      catchError(this.handleError<Player>('deletePlayer'))
    );
  }


 searchPlayers(term: string): Observable<Player[]> {
  if (!term.trim()) {
    return this.getPlayers();
  }

  return this.getPlayers().pipe(
    map(players => players.filter(player => 
      player.name.toLowerCase().includes(term.toLowerCase()) 
     
    )),
    catchError(this.handleError<Player[]>('searchPlayers', []))
  );
}


  getTopPlayers(): Observable<Player[]> {
    return this.getPlayers().pipe(
      map(players => players
        .sort((a, b) => b.points - a.points) 
        .slice(0, 3) 
      ),
      catchError(this.handleError<Player[]>('getTopPlayers', []))
    );
  }


  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); 
      return of(result as T); 
    };
  }
}
