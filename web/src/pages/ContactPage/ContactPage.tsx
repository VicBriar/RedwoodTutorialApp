import { MetaTags, useMutation } from '@redwoodjs/web'
import {toast, Toaster} from '@redwoodjs/web/toast'
import { 
  FieldError,
  FormError,
  useForm,
  Form,
  Label,
  TextField,
  TextAreaField,
  Submit,
  SubmitHandler, 
} from '@redwoodjs/forms'

import {
  CreateContactMutation,
  CreateContactMutationVariables,
} from 'types/graphql';

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

interface FormValues {
  name: string;
  email: string;
  message: string;
}
const ContactPage = () => {
  const formMethods = useForm({mode: 'onBlur'});


  const [create, { loading, error }] = useMutation<
    CreateContactMutation,
    CreateContactMutationVariables
  >(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('thank you for your submission!');
      formMethods.reset()
    },
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    create({ variables: {input: data} })
  }
  
  return (
    <>
      <MetaTags title="Contact" description="Contact page" />

      <Toaster />
      
      {/* this setting on the form is invalidated once we manually call useForm from react; config={{mode: 'onBlur'}} */}
      {/* error={error} ensures the box is hilighted with server-side errors that are validated in services */}
      <Form
        onSubmit={onSubmit}
        error={error}
        formMethods={formMethods} 
      >   
      {/* this creates the red list of errors, from server and user */}
      <FormError error={error} wrapperClassName="form-error" />
        <Label name="name" errorClassName="error">Name</Label>
        <TextField
          name="name"
          validation={{required: true}}
          errorClassName="error"
        />
        <FieldError name="name" className='error' />

        <Label name="email" errorClassName="error">Email</Label>
        <TextField
          name="email"
          validation={{
            required: true,
            pattern: {
              value:  /^[^@]+@[^.]+\..+$/,
              message: 'please enter a valid email address',
            },
          }}
          errorClassName="error"
        />
        <FieldError name="email" className='error' />

        <Label name="message" errorClassName="error">Message</Label>
        <TextAreaField
          name="message"
          validation={{required: true}}
          errorClassName="error"
        />
        <FieldError name="message" className='error' />

        <Submit disabled={loading}>Save</Submit>
      </Form>
    </>
  )
}

export default ContactPage
