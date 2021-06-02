import { ApiKeyEntityType, ApiKeyInterface } from '@reapit/foundations-ts-definitions'
import { attribute, table, autoGeneratedHashKey } from '@aws/dynamodb-data-mapper-annotations'
import { v4 as uuid } from 'uuid'

@table('Cloud_Api_Key')
export class ApiKeyModel implements ApiKeyInterface {
  @autoGeneratedHashKey()
  id?: string

  @attribute({ defaultProvider: () => uuid() })
  apiKey?: string

  @attribute()
  developerId?: string

  @attribute()
  name?: string

  @attribute({ defaultProvider: () => new Date().toISOString() })
  keyCreatedAt?: string

  @attribute()
  keyExpiresAt?: string

  @attribute()
  clientCode?: string

  @attribute()
  entityId?: string

  @attribute()
  entityType?: ApiKeyEntityType
}
