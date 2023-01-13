import { TextField, TextFieldProps, InputAdornment } from '@mui/material'
import * as React from 'react'
import { useController, Control, useFormContext } from 'react-hook-form'

export type InputFieldProps = TextFieldProps & {
  name: string
}

export function InputField({ name, ...rest }: InputFieldProps) {
  const methods = useFormContext()
  const { getFieldState } = methods
  const { invalid, error } = getFieldState(name)

  return (
    <TextField
      fullWidth
      margin="normal"
      id="outlined-start-adornment"
      InputProps={{
        startAdornment: <InputAdornment position="start"></InputAdornment>,
      }}
      {...methods.register(name)}
      error={invalid}
      helperText={error?.message}
      {...rest}
    />
  )
}
