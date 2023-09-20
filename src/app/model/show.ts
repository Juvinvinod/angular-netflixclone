interface Genre {
  id: number;
  name: string;
}

export class Show implements Genre {
  id: number = 0;
  name: string = '';
  backdrop_path: string = '';
  overview: string = '';
  genres: Genre[] = [];
}
