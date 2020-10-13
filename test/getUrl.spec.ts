import getUrl from '../utils/getUrl'

describe('getUrl', () => {
  const route = 'path'
  const key = 'someKey'
  let query: any, result

  it('should deliver correct url upon valid arguments', () => {
    query = 'someQuery'

    result = getUrl({ route, key, query })
    expect(result).toBe(
      `https://api.themoviedb.org/3/path?api_key=someKey&query=someQuery`
    )

    query = ''
    result = getUrl({ route, key, query })
    expect(result).toBe(`https://api.themoviedb.org/3/path?api_key=someKey`)
  })

  it('should handle spaces correctly', () => {
    query = '  '
    result = getUrl({ route, key, query })
    expect(result).toBe(`https://api.themoviedb.org/3/path?api_key=someKey`)

    query = 'some search with spaces'
    result = getUrl({ route, key, query })
    expect(result).toBe(
      `https://api.themoviedb.org/3/path?api_key=someKey&query=some%20search%20with%20spaces`
    )
  })
})
