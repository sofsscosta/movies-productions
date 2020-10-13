const state = () => {
  return {
    query: undefined,
    env: {
      key: process.env.API_KEY,
    },
  }
}

export default state
