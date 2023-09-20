import { Component,Input,ViewEncapsulation, OnInit ,OnChanges} from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faCircleInfo,faPlay } from '@fortawesome/free-solid-svg-icons';
import { TmdiService } from '../../services/tmdi.service';
import { Router } from '@angular/router';
import axios from 'axios';

import { WatchlistService } from '../../services/watchlist.service';
import { AppRoutingModule } from 'src/app/app-routing.module';

interface YouTubePlayer {
  Player: any;
}
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}

interface Genre {
  id: number;
  name: string;
}

declare const YT: YouTubePlayer;

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.css',],
  encapsulation: ViewEncapsulation.None,
  styles: [
		`
			.dark-modal .modal-content {
				background-color: #181818;
				color: white;
			}
			.dark-modal .close {
        color: white;
			}

		`,
	],
  providers: [NgbModalConfig, NgbModal],
})
export class InfoModalComponent implements OnInit,OnChanges{
  @Input() tvData:any;
  @Input() genres:any[]=[];
  private player: any;
  id :any;
  added:boolean=false
  faInfo =faCircleInfo;
  faPlay=faPlay;
  genre:any[]=[]


  constructor(config: NgbModalConfig, private modalService: NgbModal,private tmdi:TmdiService, private watch:WatchlistService, private router:Router) {
		// customize default values of modals used by this component tree
		// config.backdrop = 'static';
		// config.keyboard = false;
	}
  ngOnInit() {
  }
  async ngOnChanges() {
    const genreNames: Record<number, string> = {};
    axios.get('https://api.themoviedb.org/3/genre/tv/list', {
      params: {
        api_key: 'd40d6bd2c126d6d6c337d0a6c9788b26'
      }
    })
      .then(response => {

        const genres: Genre[] = response.data.genres;
        genres.forEach(genre => {
          genreNames[genre.id] = genre.name;
        });
        if(this.tvData){

          if(this.tvData.genre_ids){

            this.genre=[]
            this.tvData.genre_ids.forEach((genreId:any) => {
              let id:number=parseInt(genreId)

              this.genre.push(genreNames[id]);
          });
          }else if(this.tvData.genres){
            this.genre=[]
            this.tvData.genres.forEach((genreId:any) => {
              this.genre.push(genreNames[genreId.id]);
          });
          }
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

  }
	open(content:any) {

		this.modalService.open(content,{ modalDialogClass: 'dark-modal' ,size:'lg'});
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
  // onYouTubeIframeAPIReady(id:any) {
  //   // Initialize the player
  //   this.player = new YT.Player('player', {
  //     videoId: id, // Replace with your video ID
  //     playerVars: {
  //       autoplay: 1,
  //       loop: 1,
  //       controls: 0,
  //       modestbranding: 1,
  //       showinfo: 0,
  //       rel: 0,
  //       enablejsapi: 1
  //     }
  //   });
  // }


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



  }


