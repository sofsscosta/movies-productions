/* eslint-disable camelcase */
export default class State {
  page: number
  total_results: number
  total_pages: number
  movies: any | {}
  people: any | {}

  constructor(
    page: number,
    total_results: number,
    total_pages: number,
    movies: any | {},
    people: any | {}
  ) {
    this.page = page
    this.total_results = total_results
    this.total_pages = total_pages
    this.movies = movies
    this.people = people
  }
}
