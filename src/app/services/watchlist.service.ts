import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Show } from '../model/show';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  addTvShow(tvShow: any): Observable<Show> {
    const show ={
      id:tvShow.id,
      name:tvShow.name,
      backdrop_path:tvShow.backdrop_path,
      overview:tvShow.overview,
      genres:tvShow.genres,
    }
    return this.http.post<Show>(`${this.baseUrl}/tvShows`, show);
  }

  getTvShows(): Observable<Show[]> {
    return this.http.get<Show[]>(`${this.baseUrl}/tvShows`);
  }
  removeShow(tvShow:any):Observable<Show> {
    let genres: any[]=[]
    if(tvShow.genres){
      tvShow.genresorEach((show:any) => {
        genres.push(show.id)
      });
    }else{
      genres=tvShow.genre_ids
    }
    const show ={
      id:tvShow.id,
      name:tvShow.id,
      backdrop_path:tvShow.backdrop_path,
      overview:tvShow.overview,
      genres:genres,
    }
    return this.http.delete<Show>(`${this.baseUrl}/tvShows/${tvShow.id}`)
  }
  checkIfTvShowExists(tvShowId: any): boolean{
    let check=false
    this.getTvShows().subscribe({
      next: (res:Show[]) => {
        check=res.some(show => show.id === tvShowId)
      },
      error: (err) => {
        console.log(err);
      }
    }
    );
    return check
  }
}
