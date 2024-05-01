import { Injectable } from "@nestjs/common";
import * as SendGrid from '@sendgrid/mail';
import { ENV } from "core/constant";


@Injectable()
export class SendgridService {
    constructor() {
        SendGrid.setApiKey(ENV.MAIL_API_KEY);
    }
    async adminEmail({to, subject, html}){
        await this.sendEmail({
            to,
            subject,
            html,
        })
    }
    async forgetPassword({to, name, uuidToken}){

        await this.sendEmail({
            to,
            subject: 'Forget Password',
            html: `
            <h2>Dear ${name}</h2>
            <h3>Forget Password</h3>
            <p>Your Forget password Code is: ${uuidToken}
            `
        })
    }

    async signUpPassword({to, name, password}){

        await this.sendEmail({
            to,
            subject: 'Sign Up Password',
            html: `
            <h2>Dear ${name}</h2>
            <h3>Sign Up Password</h3>
            <p>Your Sign Up Password Code is: ${password}
            `
        })
    }
    async updateBalanceMinus({to,name,amount}){
        await this.sendEmail({
            to,
            subject: 'Payment received.',
            html: `
            <h2>Dear ${name}</h2>
            <h3>Your $${amount} has been received.</h3>
            `
        })
    }

    async contactUs({to, name, subject,message,email}){

      await this.sendEmail({
          to,
          subject: `${subject}`,
          html: `
          <h2>Name: ${name}</h2>
          <h3>${subject}</h3>
          <p>${message}</a></p>
          <h2>From ${email}</h2>
          `
      })
  }
    private query = '<p><i>please feel free to contact us in case of any query.</i></p>'
    private sendEmail({to, subject, html}) {
        html = html + this.query
        return this.send({ from: ENV.MAIL_FROM, to, subject, html });
    }
    private send(mail: SendGrid.MailDataRequired) {
        return SendGrid.send(mail)
    }
   
}

// SendGrid.setApiKey(ENV.MAIL_API_KEY);
// const msg = {
//   to: 'ahsansoftengineer@gmail.com', // Change to your recipient
//   from: 'ahsansoftengineer@gmail.com', // Change to your verified sender
//   subject: 'Dear Syed Ahmed Where does it goes',
//   html: `
//   <h2>Welcome to Indus Valley</h2>
//   You have selected as a Junior Developer
//   `
// }
// sgMail.send(msg).then(() => {
//   console.log('Email sent')
// }).catch((error) => {
//   console.error(error)
// })