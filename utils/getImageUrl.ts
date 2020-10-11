export const getImageUrl = (image: string) => {
  console.log('got here')
  return `${process.env.IMG_URL}${image}`
}
