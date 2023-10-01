import { MovieStore } from "@/components/mobx/movie-rate/MovieStore.ts";

export class RootStore {
  movieStore: MovieStore;

  constructor() {
    this.movieStore = new MovieStore(this);
  }
}
