import { MongoClient, Collection } from 'mongodb'
import { PlantsError } from '../components/types'

let client: MongoClient

export const getDbCollection = async (
  collectionName: string
): Promise<Collection<any> | PlantsError> => {
  try {
    const DB_CONNECT_STRING = process.env.DB_CONNECT_STRING

    if (!DB_CONNECT_STRING) {
      return { message: 'DB_CONNECT_STRING not defined', number: 500 }
    }

    client = await MongoClient.connect(DB_CONNECT_STRING, {
      useUnifiedTopology: true,
    })

    if (!client) {
      return { message: 'DB connection failed', number: 500 }
    }

    const dbCollection = await client.db().collection(collectionName)

    return dbCollection
  } catch (error) {
    return { message: `MongoDB Error: ${error.message}`, number: 500 }
  }
}

export const closeDbConnection = (): void => {
  if (client) {
    client.close()
  }
}
