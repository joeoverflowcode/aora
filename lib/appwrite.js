import { Account, Client, ID, Avatars, Databases } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.joeoverflow.aora',
    projectId: '6622b0ba9d2ee02dce9a',
    databaseId: '6622b3928083932092d0',
    userCollectionId: '6622b3ccf3677211472a',
    videoCollectionId: '6622b416188d9ff8047f',
    storageId: '6622b6eeb02e0965f7ee'
}

// Init your react-native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
;

    const account = new Account(client);
    const avatars = new Avatars(client)
    const databases = new Databases(client)

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if(!newAccount) throw Error
        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password)

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
            )

            return newUser
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export async function signIn(email, password) {
    try {
        const session = await account.createEmailSession(email, password)
        return session
    } catch (error) {
        throw new Error(error)
        }
}

