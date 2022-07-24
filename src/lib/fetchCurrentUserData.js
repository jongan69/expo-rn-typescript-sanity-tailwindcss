import { client } from './client'

const getCurrentUserInfo = async (walletAddress) => {
  try {
    const query = `
      *[_type == "users" && _id == "${walletAddress}"]{
          name,
          walletAddress,
          "imageUrl": profileImage.asset->url
        }
    `

    const sanityResponse = await client.fetch(query)

    res.status(200).send({ message: 'success', data: sanityResponse[0] })
  } catch (error) {
    res.status(500).send({ message: 'error', data: error.message })
  }
}

export default getCurrentUserInfo