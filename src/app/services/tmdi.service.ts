import { Injectable } from '@angular/core';
import axios from 'axios';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
interface Genre {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class TmdiService {
  apiKey = 'd40d6bd2c126d6d6c337d0a6c9788b26';
  constructor(private http: HttpClient) { }

  async getShow() {
    const apiBaseUrl = 'https://api.themoviedb.org/3';
    const mediaType = 'tv'; // Change to 'movie' if needed

    try {
      // Fetch popular TV shows or movies
      const response = await axios.get(`${apiBaseUrl}/discover/${mediaType}`, {
        params: {
          api_key: this.apiKey,
          sort_by: 'popularity.desc',
          include_video: true,
          with_original_language: 'en', // Optional, you can adjust this
        },
      });
      const validResults = response.data.results.filter((item: any) => item.backdrop_path);

      // Get a random show or movie from the results
      const randomIndex = Math.floor(Math.random() * validResults.length);
      const randomMedia = validResults[randomIndex];

      // Fetch detailed information about the selected media
      const detailedResponse = await axios.get(`${apiBaseUrl}/${mediaType}/${randomMedia.id}`, {
        params: {
          api_key: this.apiKey,
        },
      });

      return detailedResponse;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getPopularTvShows() {
    const apiUrl = 'https://api.themoviedb.org/3/trending/tv/week';
    const url = `${apiUrl}?api_key=${this.apiKey}&language=en-US`;
    const response = await axios.get(url);
    const validResults = response.data.results.filter((item: any) => item.backdrop_path);
    return validResults
  }

  async getGenreTvShows(genreId: string): Promise<any> {
    const apiUrl = 'https://api.themoviedb.org/3/discover/tv';
    const url = `${apiUrl}?api_key=${this.apiKey}&with_genres=${genreId}`;
    const response = await axios.get(url);
    const validResults = response.data.results.filter((item: any) => item.backdrop_path);
    return validResults
  }

  async getCountryTvShows(countryCode: string): Promise<any> {
    const apiUrl = 'https://api.themoviedb.org/3/discover/tv';
    const url = `${apiUrl}?api_key=${this.apiKey}&with_original_language=${countryCode}`;
    const response = await axios.get(url);
    const validResults = response.data.results.filter((item: any) => item.backdrop_path);
    return validResults
  }

  async getMovies() {
    const apiUrl = 'https://api.themoviedb.org/3/trending/movie/week';
    const url = `${apiUrl}?api_key=${this.apiKey}&language=en-US`;
    const response = await axios.get(url);
    const validResults = response.data.results.filter((item: any) => item.backdrop_path);
    return validResults
  }

  getShowTrailer(id: any) {
    const apiUrl = `https://api.themoviedb.org/3/tv/${id}/videos`;
    const url = `${apiUrl}?api_key=${this.apiKey}&language=en-US`;
    return axios.get(url);
  }

  async getGenres(): Promise<Record<number, string>> {
    const genreIdToName: Record<number, string> = {};
    axios.get('https://api.themoviedb.org/3/genre/tv/list', {
      params: {
        api_key: this.apiKey
      }
    })
      .then(response => {

        const genres: Genre[] = response.data.genres;
        genres.forEach(genre => {
          genreIdToName[genre.id] = genre.name;
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      return genreIdToName
  }

  searchAll(query: string): Observable<any> {
    const apiBaseUrl = 'https://api.themoviedb.org/3';
    const endpoint = `${apiBaseUrl}/search/multi`;

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('query', query);

    return this.http.get(endpoint, { params });
  }
}
