
import { sendMail } from '../../controllers/nodemailer';
import { API } from '../config';

exports.sendInterestedMail=(sender,receiver)=>{

 return sendMail(sender,receiver)
}