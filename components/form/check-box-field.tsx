import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Checkbox from '@mui/material/Checkbox'
import { Grid } from '@mui/material'
import { useController, Controller, Control, useWatch } from 'react-hook-form'

export type CheckboxesGroupProps = {
  name: string
  control: Control<any>
  label: string
  data: Array<string>
  required: boolean
}
export default function CheckboxesGroup({
  name,
  control,
  label,
  data,
  required,
}: CheckboxesGroupProps) {
  const {
    field: { ref, value, onChange, ...inputProps },
    formState: { errors },
  } = useController({
    name,
    control,
  })

  const checkboxIds = useWatch({ control, name: name }) || []

  const handleChange = (value: any) => {
    const newArray = [...checkboxIds]
    const item = value

    //Ensure array isnt empty
    if (newArray.length > 0) {
      //Attempt to find an item in array with matching id
      const index = newArray.findIndex((x) => x === item)

      // If theres no match add item to the array
      if (index === -1) {
        newArray.push(item)
      } else {
        //If there is a match and the value is empty, remove the item from the array
        newArray.splice(index, 1)
      }
    } else {
      //If the array is empty, add the item to the array
      newArray.push(item)
    }

    //Overwrite existing array with newArray}
    onChange(newArray)
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl required={required} component="fieldset" error={!!errors?.message}>
        <FormLabel component="legend">{label}</FormLabel>
        <FormGroup row>
          {data.length > 4 ? (
            <Grid container>
              {data.map((option) => (
                <Grid item xs={4} style={{ width: '90px' }} key={option}>
                  <FormControlLabel
                    control={
                      <Controller
                        name={name}
                        control={control}
                        render={({ field: { name, onChange, ref, value } }) => (
                          <Checkbox
                            checked={checkboxIds.some((checked: any) => checked === option)}
                            name={name}
                            ref={ref}
                            onChange={() => handleChange(option)}
                          />
                        )}
                      />
                    }
                    label={<p className="body2">{option}</p>}
                    key={option}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            data.map((option) => (
              <FormControlLabel
                control={
                  <Controller
                    name={name}
                    control={control}
                    render={({ field: { name, onChange, ref, value } }) => (
                      <Checkbox
                        checked={checkboxIds.some((checked: any) => checked === option)}
                        name={name}
                        ref={ref}
                        onChange={() => handleChange(option)}
                      />
                    )}
                  />
                }
                label={<p className="body2">{option}</p>}
                key={option}
              />
            ))
          )}
        </FormGroup>
        {/* <FormHelperText>{errors?.message}</FormHelperText> */}
      </FormControl>
    </Box>
  )
}
