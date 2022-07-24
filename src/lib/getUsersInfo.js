import { client } from './client'

const getUsersInfo = async (walletAddress) => {
  try {
    const query = `
      *[_type == "users" && _id == "${walletAddress}"]{
          name,
          walletAddress,
          "imageUrl": profileImage.asset->url
        }
    `

    const sanityResponse = await client.fetch(query)

    console.log('Sanity User Checked')
    return sanityResponse;
    // res.status(200).send({ message: 'success', data: sanityResponse[0] })
  } catch (error) {
    console.log('error', error)
    // res.status(500).send({ message: 'error', data: error.message })
  }
}

export default getUsersInfo