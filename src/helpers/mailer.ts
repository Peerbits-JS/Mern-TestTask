import * as nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import {Config} from '../configuration/config';
import {getLogger} from '../services/logger';

const log = getLogger('mailer-helper');
const {mailer} = Config;

const options = {auth: {api_key: mailer.key}};

export const transporter = nodemailer.createTransport(sgTransport(options));

export const mailSend = async sendMessage => {
    let mailBody = {
        from: mailer.sender,
        to: sendMessage.to,
        subject: sendMessage.subject,
        html: sendMessage.html,
    };
    try {
        await transporter.sendMail(mailBody);
        log.info('Mail Send For ', sendMessage.subject);
    } catch (err) {
        log.error('Mailer Error');
        throw err;
    }
};
