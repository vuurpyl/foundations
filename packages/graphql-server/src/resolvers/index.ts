import GraphQLJSON from 'graphql-type-json'
import { queryContact, queryContacts, createContact, updateContact } from './contact/resolvers'
import {
  createIdentityCheck,
  queryIdentityChecks,
  queryIdentityCheckById,
  updateIdentityCheck,
} from './identity-check/resolvers'
import { queryArea, queryAreas, mutationCreateArea, mutationUpdateArea } from './area/resolvers'
import { queryNegotiatorById, queryNegotiators, createNegotiator, updateNegotiator } from './negotiators/resolvers'
import { queryOffice, queryOffices, mutationCreateOffice, mutationUpdateOffice } from './office/resolvers'

import {
  mutationCreateAppointment,
  mutationUpdateAppointment,
  queryAppointment,
  queryAppointments,
} from './appointment/resolvers'

export const resolvers = {
  Query: {
    GetContactById: queryContact,
    GetContacts: queryContacts,
    GetIdCheckById: queryIdentityCheckById,
    GetIdChecks: queryIdentityChecks,
    area: queryArea,
    areas: queryAreas,
    GetNegotiatorById: queryNegotiatorById,
    GetNegotiators: queryNegotiators,
    GetAppointments: queryAppointments,
    GetAppointmentById: queryAppointment,
    GetOfficeById: queryOffice,
    GetOffices: queryOffices,
  },
  Mutation: {
    CreateIdentityCheck: createIdentityCheck,
    UpdateIdentityCheck: updateIdentityCheck,
    createArea: mutationCreateArea,
    updateArea: mutationUpdateArea,
    CreateContact: createContact,
    UpdateContact: updateContact,
    CreateNegotiator: createNegotiator,
    UpdateNegotiator: updateNegotiator,
    CreateAppointment: mutationCreateAppointment,
    UpdateAppointment: mutationUpdateAppointment,
    CreateOffice: mutationCreateOffice,
    UpdateOffice: mutationUpdateOffice,
  },
  JSON: GraphQLJSON,
}

export default resolvers
