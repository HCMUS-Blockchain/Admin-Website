import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import { DateTimePickerField, InputField, UploadImagePuzzle } from '../form'
import { useForm, FormProvider } from 'react-hook-form'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { UploadImageComponent } from '../form/upload-field'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from 'dayjs'
import { usePuzzle } from '@/hooks'
import { useEffect } from 'react'
const imageSchema = yup
  .mixed()
  .test('fileType', 'Invalid image', (value) => {
    if (!value) return false
    else if (typeof value === 'string') return true
    return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type)
  })
  .required('Image is required')

const numberSchema = yup.number().min(1).required().typeError('Number is required')
export function FormDialog({
  open,
  setOpen,
  dataDialog,
}: {
  open: any
  setOpen: any
  dataDialog: any
}) {
  const schema = yup.object().shape({
    title: yup.string().required('Please enter name of voucher'),
    dateBegin: yup
      .date()
      .required('Please enter a begin date')
      .typeError('You need to select and confirm begin date'),
    dateEnd: yup
      .date()
      .required('Please enter a end date')
      .typeError('You need to select and confirm end date')
      .min(yup.ref('dateBegin'), 'End date must be after start date')
      .required('End date is required'),
    image: imageSchema,
    piece1: imageSchema,
    piece2: imageSchema,
    piece3: imageSchema,
    piece4: imageSchema,
    piece5: imageSchema,
    piece6: imageSchema,
    piece7: imageSchema,
    piece8: imageSchema,
    piece9: imageSchema,
    quantity1: numberSchema,
    quantity2: numberSchema,
    quantity3: numberSchema,
    quantity4: numberSchema,
    quantity5: numberSchema,
    quantity6: numberSchema,
    quantity7: numberSchema,
    quantity8: numberSchema,
    quantity9: numberSchema,
  })

  let defaultValues
  useEffect(() => {
    if (!!dataDialog) {
      defaultValues = {
        title: '',
        dateBegin: '',
        dateEnd: '',
        image: '',
        piece1: '',
        piece2: '',
        piece3: '',
        piece4: '',
        piece5: '',
        piece6: '',
        piece7: '',
        piece8: '',
        piece9: '',
        quantity1: 0,
        quantity2: 0,
        quantity3: 0,
        quantity4: 0,
        quantity5: 0,
        quantity6: 0,
        quantity7: 0,
        quantity8: 0,
        quantity9: 0,
      }
    } else {
      if (dataDialog) {
        defaultValues = {
          title: dataDialog.title,
          dateBegin: dataDialog.dateBegin,
          dateEnd: dataDialog.dateEnd,
          image: dataDialog.image,
          piece1: dataDialog.pieces[0].image,
          piece2: dataDialog.pieces[1].image,
          piece3: dataDialog.pieces[2].image,
          piece4: dataDialog.pieces[3].image,
          piece5: dataDialog.pieces[4].image,
          piece6: dataDialog.pieces[5].image,
          piece7: dataDialog.pieces[6].image,
          piece8: dataDialog.pieces[7].image,
          piece9: dataDialog.pieces[8].image,
          quantity1: dataDialog.pieces[0].remaningQuantity,
          quantity2: dataDialog.pieces[1].remaningQuantity,
          quantity3: dataDialog.pieces[2].remaningQuantity,
          quantity4: dataDialog.pieces[3].remaningQuantity,
          quantity5: dataDialog.pieces[4].remaningQuantity,
          quantity6: dataDialog.pieces[5].remaningQuantity,
          quantity7: dataDialog.pieces[6].remaningQuantity,
          quantity8: dataDialog.pieces[7].remaningQuantity,
          quantity9: dataDialog.pieces[8].remaningQuantity,
        }
      }
    }
  }, [!!dataDialog])

  const formOption = {
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  }
  const methods = useForm(formOption)

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = methods

  const { data, createPuzzle, updatePuzzle } = usePuzzle()
  const handleSubmitForm = async (values: any) => {
    const formData = new FormData()
    formData.append('image', values.image || '')
    formData.append('title', values.title)
    formData.append('dateBegin', dayjs(values.dateBegin).toString())
    formData.append('dateEnd', dayjs(values.dateEnd).toString())
    formData.append('piece1', values.piece1 || '')
    formData.append('piece2', values.piece2 || '')
    formData.append('piece3', values.piece3 || '')
    formData.append('piece4', values.piece4 || '')
    formData.append('piece5', values.piece5 || '')
    formData.append('piece6', values.piece6 || '')
    formData.append('piece7', values.piece7 || '')
    formData.append('piece8', values.piece8 || '')
    formData.append('piece9', values.piece9 || '')
    formData.append('quantity1', values.quantity1)
    formData.append('quantity2', values.quantity2)
    formData.append('quantity3', values.quantity3)
    formData.append('quantity4', values.quantity4)
    formData.append('quantity5', values.quantity5)
    formData.append('quantity6', values.quantity6)
    formData.append('quantity7', values.quantity7)
    formData.append('quantity8', values.quantity8)
    formData.append('quantity9', values.quantity9)
    try {
      if (!!dataDialog) {
        formData.append('_id', dataDialog._id || '')
        values._id = dataDialog._id
        await updatePuzzle(formData, values)
      } else {
        await createPuzzle(formData, values)
      }
    } catch (e) {
      console.log(e)
    } finally {
      setOpen(false)
    }
  }
  const closeForm = () => {
    setOpen(false)
  }

  useEffect(() => {
    setValue('title', !!dataDialog ? dataDialog.title : '')
    setValue('dateBegin', !!dataDialog ? dayjs(dataDialog.dateBegin || dayjs(new Date())) : '')
    setValue('dateEnd', !!dataDialog ? dayjs(dataDialog.dateEnd || dayjs(new Date())) : '')
    setValue('image', !!dataDialog ? dataDialog.image : '')
    setValue('piece1', !!dataDialog ? dataDialog.pieces[0].image : '')
    setValue('piece2', !!dataDialog ? dataDialog.pieces[1].image : '')
    setValue('piece3', !!dataDialog ? dataDialog.pieces[2].image : '')
    setValue('piece4', !!dataDialog ? dataDialog.pieces[3].image : '')
    setValue('piece5', !!dataDialog ? dataDialog.pieces[4].image : '')
    setValue('piece6', !!dataDialog ? dataDialog.pieces[5].image : '')
    setValue('piece7', !!dataDialog ? dataDialog.pieces[6].image : '')
    setValue('piece8', !!dataDialog ? dataDialog.pieces[7].image : '')
    setValue('piece9', !!dataDialog ? dataDialog.pieces[8].image : '')
    setValue('quantity1', !!dataDialog ? dataDialog.pieces[0].remaningQuantity : '')
    setValue('quantity2', !!dataDialog ? dataDialog.pieces[1].remaningQuantity : '')
    setValue('quantity3', !!dataDialog ? dataDialog.pieces[2].remaningQuantity : '')
    setValue('quantity4', !!dataDialog ? dataDialog.pieces[3].remaningQuantity : '')
    setValue('quantity5', !!dataDialog ? dataDialog.pieces[4].remaningQuantity : '')
    setValue('quantity6', !!dataDialog ? dataDialog.pieces[5].remaningQuantity : '')
    setValue('quantity7', !!dataDialog ? dataDialog.pieces[6].remaningQuantity : '')
    setValue('quantity8', !!dataDialog ? dataDialog.pieces[7].remaningQuantity : '')
    setValue('quantity9', !!dataDialog ? dataDialog.pieces[8].remaningQuantity : '')
  }, [setValue, dataDialog])
  return (
    <Box textAlign="center">
      <Dialog open={open} maxWidth="md">
        <DialogTitle>CREATE NEW PUZZLE FOR SYSTEM</DialogTitle>
        <DialogContent>
          <FormProvider {...methods}>
            <Box component="form" onSubmit={handleSubmit(handleSubmitForm)}>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={5}>
                  <UploadImageComponent limit={1} multiple={false} name="image" />
                </Grid>
                <Grid item xs={7} alignSelf="center">
                  <Stack spacing={2}>
                    <InputField name="title" label="Title" />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePickerField
                        control={methods.control}
                        name="dateBegin"
                        label="Start Date"
                        minDate={new Date()}
                      />
                      <DateTimePickerField
                        control={methods.control}
                        name="dateEnd"
                        label="End Date"
                        minDate={new Date()}
                      />
                    </LocalizationProvider>
                  </Stack>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((item) => (
                  <Grid item xs={4} key={item}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={2}
                      justifyContent="space-between"
                    >
                      <Typography>Piece {item}:</Typography>
                      <InputField
                        sx={{ width: '120px' }}
                        name={'quantity' + item}
                        label={'quantity' + item}
                      />
                      <Box>
                        <UploadImagePuzzle limit={1} multiple={false} name={'piece' + item} />
                      </Box>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
              <DialogActions>
                <Button onClick={() => closeForm()}>Cancel</Button>
                <Button type="submit" onClick={() => handleSubmit(handleSubmitForm)}>
                  {!!dataDialog ? 'Update' : 'Submit'}
                </Button>
              </DialogActions>
            </Box>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </Box>
  )
}
