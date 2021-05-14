import { NextApiRequest, NextApiResponse } from 'next'
import { closeDbConnection, getDbCollection } from '../../../helper/api'
import { Collection } from 'mongodb'
import { Plant, PlantsError } from '../../../components/types'

const COLLECTION_NAME = 'plants'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  let dbCollection: Collection<any> | PlantsError

  try {
    dbCollection = await getDbCollection(COLLECTION_NAME)
  } catch (error) {
    dbCollection = { message: `MongoDB Error: ${error.message}`, number: 500 }
  }

  if ('message' in dbCollection) {
    res.status(dbCollection.number).send(dbCollection.message)
    return
  }

  try {
    switch (req.method) {
      case 'DELETE': {
        const count = await dbCollection.countDocuments()
        if (count > 0) {
          await dbCollection.drop()
          res.status(200).json({ message: 'Deleted' })
        } else {
          res.status(200).json({ message: 'No documents found' })
        }
        break
      }
      case 'GET': {
        const data = await dbCollection.find().toArray()
        res.status(200).json({ data })
        break
      }
      case 'POST': {
        const plant: Plant = req.body
        const data = await dbCollection.insertOne(plant)
        res.status(201).json({ data: data })
        break
      }
    }
  } catch (error) {
    res.status(500).json({ error })
  }

  closeDbConnection()
}

export default handler
