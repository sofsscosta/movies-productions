type arguments = {
  route: string
  key: string
  query?: string
}

const getUrl = ({ route, key, query = '' }: arguments): string => {
  const parseQuery = query.trim().length ? query.split(' ').join('%20') : ''
  const querySearch = query.trim().length ? `&query=${parseQuery}` : ''
  return `https://api.themoviedb.org/3/${route}?api_key=${key}${querySearch}`
}
export default getUrl
