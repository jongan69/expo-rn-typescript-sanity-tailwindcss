import { client } from './client'

const createUserOnSanity = async (walletAddress) => {
  try {

    // Default to Morgan Freeman
    const defaultProfileImage = `https://imgs.search.brave.com/aYg-RzyawkbqVwWMvZEtIc_RWGaVgwhroURVh9YIkaE/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9iaW9h/Z2V3aG8uY28vd3At/Y29udGVudC91cGxv/YWRzLzIwMTkvMDYv/TW9yZ2FuLUZyZWVt/YW4tV2lraS1OZXQt/V29ydGgtV2lmZS1D/aGlsZC1DaGlsZHJl/bi1LaWRzLUZhY3Rz/LUJyb3RoZXIuanBl/Zw`

    const userDoc = {
      _type: 'users',
      _id: walletAddress,
      name: walletAddress,
      walletAddress: walletAddress,
      profileImage: defaultProfileImage,
    }

    const sanityResponse = await client.createIfNotExists(userDoc)

    console.log('Successfully Posted User to Sanity!')
    return sanityResponse;
  } catch (error) {
    console.log('error', error)
  }
}

export default createUserOnSanity