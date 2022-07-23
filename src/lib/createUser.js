import { client } from './client'

const createUserOnSanity = async (walletAddress) => {
  try {
    const userDoc = {
      _type: 'users',
      _id: walletAddress,
      name: walletAddress,
      walletAddress: walletAddress,
    }

    await client.createIfNotExists(userDoc)

    console.log('Successfully Posted User to Sanity!')

    // res.status(200).send({ message: 'success' })
  } catch (error) {
    console.log('error', error)
    // res.status(500).send({ message: 'error', data: error.message })
  }
}

export default createUserOnSanity