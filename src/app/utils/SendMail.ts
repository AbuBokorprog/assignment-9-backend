import config from '../config'
import nodemailer from 'nodemailer'

export const SendMail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'abubokor1066@gmail.com',
      pass: 'mlca mdrw szys zjei',
    },
  })

  await transporter.sendMail({
    from: 'abubokor1066@gmail.com', // sender address
    to: `${to}`, // list of receivers
    subject: 'Reset password instruction', // Subject line
    text: `Hello ${to}`, // plain text body
    html: `${html}`, // html body
  })
}
