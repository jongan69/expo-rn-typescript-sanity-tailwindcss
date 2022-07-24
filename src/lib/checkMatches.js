import { client } from './client'

const checkMatches = async (req, res) => {
  try {
    const query = `
      *[_type == "users" && _id == "${req.body.likedUser}"]{
         likes
        }
    `
    const sanityResponse = await client.fetch(query)
    let isMatch = false
    sanityResponse[0].likes.forEach(likedUser => {
      if (likedUser._ref === req.body.currentUser) {
        isMatch = true
      }
    })

    console.log('Checking Matches in Sanity')
  } catch (error) {
    console.log('error', error)
  }
}

export default checkMatches;