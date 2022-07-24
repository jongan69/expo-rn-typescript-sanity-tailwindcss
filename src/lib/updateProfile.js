import { client } from './client'

const createUserOnSanity = async (walletAddress, name, userBio) => {
  try {

    const userDoc = {
      _type: 'users',
      _id: walletAddress,
      name: name,
      userBio: userBio
    }

    const sanityResponse = await client.createOrReplace(userDoc)
    console.log('Successfully Updated User to Sanity!')
    return sanityResponse;
  } catch (error) {
    console.log('error', error)
  }
}

export default createUserOnSanity