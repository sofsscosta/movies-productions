const state = () => {
  return {
    page: 1,
    total_results: 0,
    total_pages: 0,
    env: {
      key: process.env.API_KEY,
    },
  }
}

export default state
