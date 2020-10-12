import Movie from './Movie'

/* eslint-disable camelcase */
export default class Person {
  popularity: number
  known_for_department: string
  gender: boolean
  id: number
  profile_path: string
  adult: boolean
  known_for: [Movie]
  name: string

  constructor(
    popularity: number,
    known_for_department: string,
    gender: boolean,
    id: number,
    profile_path: string,
    adult: boolean,
    known_for: [Movie],
    name: string
  ) {
    this.popularity = popularity
    this.known_for_department = known_for_department
    this.gender = gender
    this.id = id
    this.profile_path = profile_path
    this.adult = adult
    this.known_for = known_for
    this.name = name
  }
}
