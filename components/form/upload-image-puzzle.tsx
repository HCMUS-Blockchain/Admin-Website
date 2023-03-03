import uploadImg from '@/images/cloud-upload.png'
import { IFileUploadProps, ImageConfig } from '@/models/imageUpload'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, FormHelperText, IconButton, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Controller, useController, useFormContext } from 'react-hook-form'

export function UploadImagePuzzle({ limit, multiple, name, ...rest }: IFileUploadProps) {
  const {
    control,
    formState: { isSubmitting, errors },
  } = useFormContext()
  const { field } = useController({
    name,
    control,
  })
  const { value } = field
  const wrapperRef = useRef<HTMLDivElement>(null)
  const helperText = errors[name]?.message
  const onDragEnter = () => wrapperRef.current?.classList.add('dragover')
  const onDragLeave = () => wrapperRef.current?.classList.remove('dragover')

  // ? TypeScript Type
  type CustomType = 'jpg' | 'png' | 'svg'

  // ? Calculate Size in KiloByte and MegaByte
  const calcSize = (size: number) => {
    return size < 1000000 ? `${Math.floor(size / 1000)} KB` : `${Math.floor(size / 1000000)} MB`
  }

  const [singleFile, setSingleFile] = useState<File[]>([])
  const [fileList, setFileList] = useState<File[]>([])
  const [fileUpdate, setFileUpdate] = useState<any>()

  useEffect(() => {
    try {
      if (typeof value === 'string') setFileUpdate(value)
      else {
        const reader = new FileReader()
        reader.readAsDataURL(value)
        reader.onload = () => {
          setFileUpdate(reader.result)
          console.log(reader.result)
        }
        reader.onerror = () => {
          console.log(reader.error)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }, [value])

  const fileRemove = (file: File) => {
    const updatedList = [...fileList]
    updatedList.splice(fileList.indexOf(file), 1)
    setFileList(updatedList)
  }

  // ? remove single image
  const fileSingleRemove = () => {
    setSingleFile([])
    setFileUpdate('')
  }

  useEffect(() => {
    if (isSubmitting) {
      setFileList([])
      setSingleFile([])
    }
  }, [isSubmitting])

  const onFileDrop = useCallback(
    (e: React.SyntheticEvent<EventTarget>) => {
      const target = e.target as HTMLInputElement
      if (!target.files) return

      if (limit === 1) {
        const newFile = Object.values(target.files).map((file: File) => file)
        if (singleFile.length >= 1) return alert('Only a single image allowed')
        setSingleFile(newFile)
        field.onChange(newFile[0])
      }

      if (multiple) {
        const newFiles = Object.values(target.files).map((file: File) => file)
        if (newFiles) {
          const updatedList = [...fileList, ...newFiles]
          if (updatedList.length > limit || newFiles.length > 3) {
            return alert(`Image must not be more than ${limit}`)
          }
          setFileList(updatedList)
          field.onChange(updatedList)
        }
      }
    },
    [field, fileList, limit, multiple, singleFile]
  )
  // ? remove multiple images

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: '2rem',
          ...rest,
        }}
      >
        {fileUpdate ? (
          <Image
            src={fileUpdate}
            alt=""
            title=""
            width={50}
            height={50}
            style={{
              objectFit: 'contain',
            }}
            priority={true}
          />
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              position: 'relative',
              width: '50px',
              height: '50px',
              border: '2px dashed #4267b2',
            }}
            ref={wrapperRef}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDragLeave}
          >
            <Stack justifyContent="center" sx={{ p: 2, textAlign: 'center' }}>
              <Typography sx={{ color: '#ccc' }}>Upload</Typography>
            </Stack>
            <Controller
              name={name}
              defaultValue=""
              control={control}
              render={({ field: { name, onBlur, ref } }) => (
                <input
                  type="file"
                  name={name}
                  onBlur={onBlur}
                  ref={ref}
                  onChange={onFileDrop}
                  multiple={multiple}
                  accept="image/jpg, image/png, image/jpeg"
                  style={{
                    opacity: 0,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    textAlign: 'center',
                    width: '100%',
                    height: '100%',
                    cursor: 'pointer',
                  }}
                />
              )}
            />
          </Box>
        )}
      </Box>

      {helperText && (
        <FormHelperText sx={{ textAlign: 'center', my: 1 }} error={!!errors[name]}>
          {helperText.toString()}
        </FormHelperText>
      )}

      {/* ?Image Preview ? */}
      {fileUpdate && singleFile.length === 0 ? (
        <Box
          sx={{
            position: 'relative',
            borderRadius: 1.5,
            p: 0.5,
            width: '100%',
            mt: 5,
          }}
        >
          <IconButton
            onClick={() => {
              setFileUpdate('')
            }}
            sx={{
              color: '#df2c0e',
              position: 'absolute',
              top: '50%',
              mt: 2,
              transform: 'translateY(-150%)',
              backgroundColor: '#FFF',
              '&:hover': {
                backgroundColor: 'rgb(192,192,192)',
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ) : null}

      {fileList.length > 0 || singleFile.length > 0 ? (
        <Stack spacing={2}>
          {(multiple ? fileList : singleFile).map((item, index) => {
            const imageType = item.type.split('/')[1] as CustomType
            return (
              <Box
                key={index}
                sx={{
                  position: 'relative',
                  backgroundColor: '#f5f8ff',
                  borderRadius: 1.5,
                  width: '100%',
                  mb: 2.5,
                }}
              >
                <IconButton
                  onClick={() => {
                    if (multiple) {
                      fileRemove(item)
                    } else {
                      fileSingleRemove()
                    }
                  }}
                  sx={{
                    color: '#df2c0e',
                    position: 'absolute',
                    top: '50%',
                    mt: 2,
                    transform: 'translateY(-50%)',
                    backgroundColor: '#FFF',
                    '&:hover': {
                      backgroundColor: 'rgb(192,192,192)',
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            )
          })}
        </Stack>
      ) : null}
    </>
  )
}
