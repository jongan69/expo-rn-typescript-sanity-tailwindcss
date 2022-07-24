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
      // owner: walletAddress
    }

    await client.createOrReplace(userDoc)

    console.log('Successfully Posted User to Sanity!')

    // res.status(200).send({ message: 'success' })
  } catch (error) {
    console.log('error', error)
    // res.status(500).send({ message: 'error', data: error.message })
  }
}

export default createUserOnSanity