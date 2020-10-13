const getUrl = ({ route, key, query = '' }: any): string => {
  const parseQuery = query.trim().length ? query.split(' ').join('%20') : ''
  const querySearch = query.trim().length ? `&query=${parseQuery}` : ''
  const url = `https://api.themoviedb.org/3/${route}?api_key=${key}${querySearch}`
  return url
}
export default getUrl
