import Mailgun from 'mailgun-js';

const mailGunClient = new Mailgun({
    apiKey: process.env.MAILGUN_API_KEY || '',
    domain: "sandbox7232075636964ae58603741bd9397e7f.mailgun.org"
});

const sendEmail = (subject: string, html: string) => {
    const emailData = {
        from: "sehwan@techforkorea.com",
        to: "sehwan@techforkorea.com",
        subject,
        html
    }
    return mailGunClient.messages().send(emailData);
}

export const sendVerificationEmail = (fullname: string, key: string) => {
    const emailSubject = `Hello! ${fullname}, please verify your email`;
    const emailBody = `Verify your email by clicking <a href="http://techforkorea.com/verification/${key}">here</a>`;
    return sendEmail(emailSubject, emailBody);
}

