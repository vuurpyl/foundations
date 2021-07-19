import { PropertyModelPagedResult } from '@reapit/foundations-ts-definitions'

export const mockProperties: PropertyModelPagedResult = {
  _embedded: [
    {
      id: 'RPT200015',
      created: '2020-04-20T10:19:45.0000000Z',
      modified: '2020-04-20T10:19:45.0000000Z',
      marketingMode: 'sellingAndLetting',
      currency: 'GBP',
      address: {
        buildingName: '',
      },
      areaId: null,
      strapline: null,
      description: 'We are so so delighted to offer for sale this EXTENDED THREE BEDROOMED SEMI DETACHED PROPERTY.',
      summary: null,
      departmentId: 'G',
      negotiatorId: 'JAS',
      bedrooms: 0,
      receptions: 0,
      councilTax: null,
      internetAdvertising: true,
      viewingArrangements: null,
      type: [],
      style: [],
      situation: [],
      age: [],
      officeIds: ['OXF'],
      _eTag: '"02876506FBCBEA86F273C6D1B5EA9783"',
    },
    {
      id: 'RPT200014',
      created: '2020-04-20T08:01:37.0000000Z',
      modified: '2020-04-20T10:10:05.0000000Z',
      marketingMode: 'sellingAndLetting',
      currency: 'GBP',
      address: {
        buildingName: '',
      },
      areaId: 'BRM',
      strapline: null,
      description: 'We are so so delighted to offer for sale this EXTENDED THREE BEDROO.',
      summary: null,
      departmentId: 'G',
      negotiatorId: 'JAS',
      bedrooms: 4,
      receptions: 1,
      councilTax: 'A',
      internetAdvertising: true,
      viewingArrangements: 'Accompanied viewings after 3PM only',
      type: ['house'],
      style: ['detached'],
      situation: ['garden', 'land', 'patio'],
      age: ['period'],
      officeIds: ['OXF', 'SOL'],
      _eTag: '"B82C6C5C78B68BD90549FF6ED5816CE3"',
    },
  ],
  pageNumber: 1,
  pageSize: 2,
  pageCount: 2,
  totalCount: 2549,
  _links: {
    self: {
      href: '/properties/?PageNumber=1&PageSize=2',
    },
    first: {
      href: '/properties/?PageNumber=1&PageSize=2',
    },
    next: {
      href: '/properties/?PageNumber=2&PageSize=2',
    },
    last: {
      href: '/properties/?PageNumber=1275&PageSize=2',
    },
  },
}
