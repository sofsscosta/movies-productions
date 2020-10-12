const getUrl = ({ route, key, page = 1 }: any) => {
  return `https://api.themoviedb.org/3/${route}?api_key=${key}&page=${page}`
}
export default getUrl
