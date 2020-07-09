export const appointment = {
  id: 'NEP1600290',
  created: '2019-05-08T17:07:39',
  modified: '2019-05-09T09:18:06',
  start: '2019-05-11T17:30:00',
  end: '2019-05-11T18:00:00',
  typeId: 'VW',
  appointmentType: {
    id: 'VW',
    value: 'Viewing',
  },
  recurring: false,
  cancelled: true,
  property: {
    address: {
      buildingName: '',
      buildingNumber: '56',
      line1: 'High Street',
      line2: 'The Stables',
      line3: 'Old Haversham',
      line4: 'Milton Keynes',
      postcode: 'MK19 7DZ',
      geolocation: {
        latitude: 52.079532,
        longitude: -0.790871,
      },
    },
  },
  organiserId: 'BED160186',
  negotiatorIds: ['LJW', 'LXJ', 'LSB', 'JCW'],
  negotiators: [
    {
      __typename: 'NegotiatorModel',
      _eTag: '"CB9E584CE62E60C463C142EDCB433608"',
      _embedded: {},
      _links: {
        office: {
          href: '/offices/ALB',
        },
        self: {
          href: '/negotiators/LJW',
        },
      },
      active: true,
      created: '2014-11-10T15:24:39Z',
      email: 'emilie.boyd@reapitestates.net',
      id: 'LJW',
      jobTitle: '',
      metadata: {},
      mobilePhone: '',
      modified: '2020-07-07T08:14:31Z',
      name: 'Liam Jowett',
      officeId: 'ALB',
      workPhone: '',
    },
    {
      __typename: 'NegotiatorModel',
      _eTag: '"85F585A47F82909C139CAE0CDF76BD29"',
      _embedded: {},
      _links: {
        office: {
          href: '/offices/ALB',
        },
        self: {
          href: '/negotiators/LXJ',
        },
      },
      active: true,
      created: '2013-01-15T13:49:55Z',
      email: 'fletcher.barr@reapitestates.net',
      id: 'LXJ',
      jobTitle: '',
      metadata: {},
      mobilePhone: '',
      modified: '2016-10-17T07:47:53Z',
      name: 'Fletcher Barr',
      officeId: 'ALB',
      workPhone: '',
    },
    {
      __typename: 'NegotiatorModel',
      _eTag: '"D03398DFF51B9876BD04C925F52A6A04"',
      _embedded: {},
      _links: {
        office: {
          href: '/offices/ALB',
        },
        self: {
          href: '/negotiators/LSB',
        },
      },
      active: true,
      created: '2015-01-11T15:32:15Z',
      email: 'killian.allen@reapitestates.net',
      id: 'LSB',
      jobTitle: '',
      metadata: {},
      mobilePhone: '',
      modified: '2016-09-16T10:23:16Z',
      name: 'Killian Allen',
      officeId: 'ALB',
      workPhone: '',
    },
    {
      __typename: 'NegotiatorModel',
      _eTag: '"CB56729ECEF1690220F7C041B9A55125"',
      _embedded: {},
      _links: {
        office: {
          href: '/offices/ALB',
        },
        self: {
          href: '/negotiators/JCW',
        },
      },
      active: true,
      created: '2011-12-27T15:08:47Z',
      email: 'mara.grieve@reapitestates.net',
      id: 'JCW',
      jobTitle: '',
      metadata: {},
      mobilePhone: '',
      modified: '2016-09-21T15:54:30Z',
      name: 'Mara Grieve',
      officeId: 'ALB',
      workPhone: '',
    },
  ],
  officeIds: ['ALB'],
  offices: [
    {
      __typename: 'OfficeModel',
      _eTag: '"9B4650E205A1B4DDB0E4A3CB98F4435F"',
      _embedded: {},
      _links: {
        negotiators: {
          href: '/negotiators/?officeId=ALB',
        },
        self: {
          href: '/offices/ALB',
        },
      },
      address: {
        __typename: 'OfficeModelAddress',
        buildingName: '',
        buildingNumber: '',
        countryId: '',
        line1: 'Exchange Street',
        line2: 'Aylesbury',
        line3: '',
        line4: '',
        postcode: 'HP19 9QL',
      },
      created: '2011-12-26T17:55:46Z',
      email: 'salesa@hughmason.co.uk',
      id: 'ALB',
      manager: 'Gabriela Broadfoot',
      metadata: {},
      modified: '2020-02-14T16:03:23Z',
      name: 'Stoke Mandeville',
      workPhone: '123456',
    },
  ],
  _eTag: '"CB9E584CE62E60C463C142EDCB433608"',
}
