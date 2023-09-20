import { Component, OnInit } from '@angular/core';
import { WatchlistService } from './services/watchlist.service';
import axios from 'axios';
import { Show } from './model/show';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  shows:Show[]=[]
  title = 'netflix-clone';

}
