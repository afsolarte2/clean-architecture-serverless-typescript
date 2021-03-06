import { APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'

import createPersonUseCase from '../domain/use-cases/createPerson'
import StorageFactory from '../factories/storage-factory'

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const { person } = JSON.parse(event.body)

  const personService = StorageFactory.make()

  const useCase = createPersonUseCase(personService)
  const result = await useCase(person)

  return {
    statusCode: 201,
    body: JSON.stringify(result, null, 2),
  }
}
