import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WatchlistService } from 'src/app/services/watchlist.service';
import { faCircleInfo,faPlay } from '@fortawesome/free-solid-svg-icons';

interface YouTubePlayer {
  Player: any;
}
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}
declare const YT: YouTubePlayer;

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit{
  tvData: any; // Replace 'any' with the actual type of tvData
  private player: any;
  id :any;
  added:boolean=false
  faInfo =faCircleInfo;
  faPlay=faPlay;

  constructor(private route: ActivatedRoute, private watch:WatchlistService) { }

  ngOnInit(): void {
    const encodedTvData = this.route.snapshot.paramMap.get('tvData');

    if (encodedTvData !== null) {
      const decodedTvData = JSON.parse(decodeURIComponent(encodedTvData));
      this.tvData = decodedTvData;
    } else {
      // Handle the case when 'tvData' parameter is not present
      console.error('tvData parameter is missing.');
    }
    const apiKey = 'd40d6bd2c126d6d6c337d0a6c9788b26';
    const apiUrl = `https://api.themoviedb.org/3/tv/${this.tvData.id}/videos`;
    const url = `${apiUrl}?api_key=${apiKey}&language=en-US`;
  }
  addShow(id:any){
    const added = this.checkshow(id)
    if(!added){
      this.watch.addTvShow(this.tvData).subscribe( {
        next: (res:any) => {
          this.added=true
          this.ngOnInit()
        },
        error: (err) => {
          alert(err);
        }
      });
    }
  }
  removeShow(id:any){
    this.watch.removeShow(this.tvData).subscribe( {
      next: (res:any) => {
        this.added=false
        this.ngOnInit()
      },
      error: (err) => {
        alert(err);
      }
    });
  }

  checkshow(id:any){
    return this.watch.checkIfTvShowExists(id)
  }
  generatePosterUrl(backdropPath: string): string {
    if (backdropPath) {
      // Replace with your actual base URL
      const baseUrl = 'https://image.tmdb.org/t/p/original';
      return baseUrl + backdropPath;
    } else {
      // Return a default poster URL if no backdrop path is available
      return 'default-poster-url.jpg';
    }
  }
  onYouTubeIframeAPIReady(id:any) {
    // Initialize the player
    this.player = new YT.Player('player', {
      videoId: id, // Replace with your video ID
      playerVars: {
        autoplay: 1,
        loop: 1,
        controls: 0,
        modestbranding: 1,
        showinfo: 0,
        rel: 0,
        enablejsapi: 1
      }
    });
  }

  }


