import type { QueryResolvers, MutationResolvers } from 'types/graphql'
import { validate } from '@redwoodjs/api'
import { db } from 'src/lib/db'

export const contacts: QueryResolvers['contacts'] = () => {
  return db.contact.findMany()
}

export const contact: QueryResolvers['contact'] = ({ id }) => {
  return db.contact.findUnique({
    where: { id },
  })
}

export const createContact: MutationResolvers['createContact'] = ({
  input,
}) => {
  //input.email is the value to be checked. 
  //'email' is the string assigned to <input name="email" <-- .../> in our form
  //The third argument is an object containing the validation directives we want to invoke. In this case it's just one, and email: true means we want to use the built-in email validator
  validate(input.email, 'email', {email:true})
  return db.contact.create({
    data: input,
  })
}

// export const updateContact: MutationResolvers['updateContact'] = ({
//   id,
//   input,
// }) => {
//   return db.contact.update({
//     data: input,
//     where: { id },
//   })
// }

// export const deleteContact: MutationResolvers['deleteContact'] = ({ id }) => {
//   return db.contact.delete({
//     where: { id },
//   })
// }
