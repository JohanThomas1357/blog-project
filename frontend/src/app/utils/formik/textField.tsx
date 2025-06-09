import { Field, FormikTouched } from 'formik'
import { TextField as TextFieldMui, TextFieldProps } from '@mui/material'
import React from 'react'

type fieldProps = TextFieldProps & {
    id: string
    name: string
}

export const TextField = (props:fieldProps) => {
  return (
    <Field as={TextFieldMui} {...props}/>
  )
}
