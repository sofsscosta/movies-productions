const getUrl = ({ route, key, query = '', page = 1 }: any): string => {
  const querySearch = query.trim().length ? `&query=${query}` : ''
  const url = `https://api.themoviedb.org/3/${route}?api_key=${key}${querySearch}&page=${page}`
  console.log(url)
  return url
}
export default getUrl
