import { Component, ViewChild, ElementRef ,Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TmdiService } from '../../services/tmdi.service';
import { Show } from 'src/app/model/show';
import { WatchlistService } from 'src/app/services/watchlist.service';

@Component({
  selector: 'app-showlist',
  templateUrl: './showlist.component.html',
  styleUrls: ['./showlist.component.css']
})
export class ShowlistComponent implements OnInit, OnChanges{
  @Input() heading: string ='';
  @Input() genre_id:string = ''
  @Input() code:string = ''
  @Input() type:string = '';
  @Input() shows:Show[]=[]
  @Input() isWatch:boolean=false;

  constructor(private tmdi:TmdiService, private watch:WatchlistService){}
  @ViewChild('tvShowList', { static: false }) tvShowListRef!: ElementRef;

  tvShows: any[] = [];
  private isDown = false;
  private startX: number =0;
  private scrollLeft: number =0;
  hoveredShow: any | null = null;

  onMouseEnter(show:any){
    this.hoveredShow = show;
  }

  onMouseLeave(){
    this.hoveredShow = null;
  }

  onMouseDown(event: MouseEvent) {
    this.isDown = true;
    this.startX = event.pageX - this.tvShowListRef.nativeElement.offsetLeft;
    this.scrollLeft = this.tvShowListRef.nativeElement.scrollLeft;
  }

  onMouseUp() {
    this.isDown = false;
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDown) return;
    event.preventDefault();
    const x = event.pageX - this.tvShowListRef.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 2; // Adjust the scroll speed
    this.tvShowListRef.nativeElement.scrollLeft = this.scrollLeft - walk;
  }

  ngOnInit(): void {
    this.getShows()
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.getShows()
  }

  getShows():void {
    if(this.genre_id!=''){
      this.tmdi.getGenreTvShows(this.genre_id)
      .then(response => {
        this.tvShows = response;
      })
      .catch(error => {
        console.error('Error fetching genre TV shows:', error);
      });
    }else if(this.code!=''){
      this.tmdi.getCountryTvShows(this.code)
      .then(response => {
        this.tvShows = response
      })
      .catch(error => {
        console.error('Error fetching country TV shows:', error);
      });
    }else if(this.type=='tv'){
      this.tmdi.getPopularTvShows()
    .then(response => {
      this.tvShows = response;
    })
    .catch(error => {
      console.error('Error fetching movie data:', error);
    });
    }else if(this.type=='movie'){
      this.tmdi.getMovies().then(response => {
        this.tvShows = response;
      })
      .catch(error => {
        console.error('Error fetching movie data:', error);
      });
    }else if(this.isWatch){
        this.watch.getTvShows().subscribe({
          next: (res) => {
            console.log("results",res)
            this.tvShows=res
          },
          error: (err) => {
            console.log("Unable to get TV shows",err);
          }
        });
    }
  }

  getImageUrl(posterPath: string): string {
    return `https://image.tmdb.org/t/p/original${posterPath}`;
  }
}

1
