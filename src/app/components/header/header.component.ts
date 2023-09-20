import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { TmdiService } from 'src/app/services/tmdi.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  bannerImageUrl: string = '';
  tvShowName: string = '';
  tvDesc: string = '';
  tvData:any
  videoId =''

  ytKey = 'AIzaSyCHpnXCeJIH5zDk9r-dhSjwtgkIFRlfVuw'

  constructor(private tmdi:TmdiService){}
  ngOnInit(): void {
    const apiKey = 'd40d6bd2c126d6d6c337d0a6c9788b26';

    this.tmdi.getShow()
      .then(response => {
        this.tvShowName = response.data.name;
        this.tvDesc = response.data.overview;
        this.tvData = response.data;
        const backdropPath = response.data.backdrop_path;
        this.bannerImageUrl = `https://image.tmdb.org/t/p/original${backdropPath}`;
      })
      .catch(error => {
        console.error('Error fetching movie data:', error);
      });

  }

  searchForTrailer(): void {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${this.ytKey}&q=${this.tvShowName}+trailer&part=snippet&type=video`;

    axios.get(url)
      .then(response => {
        const data = response.data;
        if (data.items && data.items.length > 0) {
          this.videoId = data.items[0].id.videoId;
        }
      })
      .catch(error => {
        console.error('Error fetching video trailer:', error);
      });
  }

  getVideoUrl(): string {
    return `https://www.youtube.com/embed/${this.videoId}`;
  }


}
