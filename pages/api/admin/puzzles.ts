import cloudinary from 'cloudinary'
import Cookies from 'cookies'
import formidable from 'formidable'
import httpProxy from 'http-proxy'
import { NextApiHandler, NextApiRequest } from 'next'

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

const readFile = (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const form = formidable()
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err)
      resolve({ fields, files })
    })
  })
}

const proxy = httpProxy.createProxyServer()

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    const x = await readFile(req)
    const { title, dateEnd, dateBegin, _id } = x.fields
    let arr = []
    if (Object.keys(x.fields).length !== 0) {
      for (let i = 1; i <= 9; i++) {
        let str = 'piece' + i
        if (x.files[str]) {
          const y = JSON.parse(JSON.stringify(x.files[str]))
          const result = await cloudinary.v2.uploader.upload(y.filepath)
          arr[i - 1] = result.secure_url
        } else {
          arr[i - 1] = x.fields[str]
        }
      }
      if (x.files.image) {
        const y = JSON.parse(JSON.stringify(x.files.image))
        const result = await cloudinary.v2.uploader.upload(y.filepath)
        arr[9] = result.secure_url
      } else {
        arr[9] = x.fields.image
      }
    } else {
      for (let i = 1; i <= 9; i++) {
        let str = 'piece' + i
        arr[i - 1] = x.fields[str]
      }
      arr[9] = x.fields.image
    }

    let brr = []
    for (let i = 1; i <= 9; i++) {
      let str = 'quantity' + i
      brr[i - 1] = x.fields[str]
    }

    let foo = {} as any
    foo.title = title.toString()
    foo.dateBegin = dateBegin.toString()
    foo.dateEnd = dateEnd.toString()
    foo.image = arr.toString()
    foo.quantity = brr.toString()
    if (_id) {
      foo._id = _id.toString()
    }
    proxy.once('proxyReq', function (proxyReq, req, res, options) {
      let bodyData = JSON.stringify(foo)
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
      proxyReq.setHeader('Content-Type', 'application/json')
      proxyReq.write(bodyData)
    })
  }

  return new Promise((resolve) => {
    const cookies = new Cookies(req, res)
    const accessToken = cookies.get('access_token_admin')
    if (accessToken) {
      req.headers.Authorization = `JWT ${accessToken}`
    }

    req.headers.cookie = ''

    proxy.web(req, res, {
      target: 'http://localhost:3001',
      changeOrigin: true,
      selfHandleResponse: false,
    })

    proxy.once('proxyRes', () => {
      resolve(true)
    })
  })
}

export default handler
