const state = () => {
  return {
    page: 1,
    query: undefined,
    env: {
      key: process.env.API_KEY,
    },
  }
}

export default state
