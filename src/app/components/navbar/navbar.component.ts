import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TmdiService } from 'src/app/services/tmdi.service';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  searchQuery: string = '';

  constructor(private tmdi: TmdiService, private router: Router) {}
  performSearch() {
    if (this.searchQuery) {
      // this.tmdi.searchAll(this.searchQuery).subscribe((results: any) => {
      //   // Assuming results contains search data
      //   this.router.navigate(['/search'], { queryParams: { q: this.searchQuery, results: JSON.stringify(results) } });
      // });

    }
  }
}
