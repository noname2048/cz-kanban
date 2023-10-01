import { RootStore } from "@/components/mobx/movie-rate/RootStore.ts";
import { action, makeObservable, observable } from "mobx";

class Movie {
  id: number;
  title: string;
  rate: number;

  constructor(id: number, title: string, rate: number) {
    this.id = id;
    this.title = title;
    this.rate = rate;

    makeObservable(this, {
      id: observable,
      title: observable,
      rate: observable,
    });
  }
}

export class MovieStore {
  rootStore: RootStore;

  movies: Movie[] = [];

  constructor(rootStore: RootStore) {
    makeObservable(this, {
      movies: observable,
      createMovie: action,
      deleteMovie: action,
      changeRate: action,
    });

    this.rootStore = rootStore;

    this.movies = [
      new Movie(1, "LOTR", 5),
      new Movie(2, "Harry Potter", 4),
      new Movie(3, "창궐", 0),
    ];
  }

  createMovie(title: string, rate: number) {
    this.movies = [
      ...this.movies,
      new Movie(this.movies[this.movies.length - 1].id + 1, title, rate),
    ];
  }

  deleteMovie(id: number) {
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  changeRate(id: number, rate: number) {
    this.movies = this.movies.map((movie) =>
      movie.id === id ? { ...movie, rate } : movie,
    );
  }
}
