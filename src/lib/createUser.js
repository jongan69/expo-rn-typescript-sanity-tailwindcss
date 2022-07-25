import { client } from './client'

const createUserOnSanity = async (walletAddress) => {
  try {
    const defaultProfileImage = `https://avatars.dicebear.com/api/identicon/${walletAddress}.svg`



    const userDoc = {
      _type: 'users',
      _id: walletAddress,
      name: walletAddress,
      walletAddress: walletAddress,
      defaultProfileImage: defaultProfileImage,
    }

    const sanityResponse = await client.createIfNotExists(userDoc)

    console.log('Successfully Posted User to Sanity!')
    return sanityResponse;
  } catch (error) {
    console.log('error', error)
  }
}

export default createUserOnSanity