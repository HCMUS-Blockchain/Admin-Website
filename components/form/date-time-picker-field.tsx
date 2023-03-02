import { DateTimePickerProps } from '@mui/lab'
import { TextField } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import { Control, Controller, useController, useFormContext } from 'react-hook-form'

export type DateTimePickerPropsX = DateTimePickerProps<any> & {
  name: string
  label: string
  control: Control<any>
}

export function DateTimePickerField({ name, control, label, ...rest }: DateTimePickerPropsX) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  const methods = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <DateTimePicker
          renderInput={(props) => (
            <TextField
              required
              {...props}
              error={!!error}
              helperText={error?.message}
              label={label}
            />
          )}
          // minDate={new Date()}
          {...rest}
          onChange={(date) => field.onChange(date)}
          value={field.value}
        />
      )}
    />
  )
}
