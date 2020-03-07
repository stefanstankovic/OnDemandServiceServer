import Email, { IEmail } from '../models/email.model';
import {
    EmailData,
    Emails,
    Response,
    Query,
    EmailAddress } from '../grpc/_proto/notifications/notifications_pb';

// TODO : Implement email logic
export class EmailHelper {
    constructor(){}

    async SendEmail(email: EmailData) : Promise<Response> {
        const result = new Response();

        try {
            const newEmail: IEmail = new Email({
                email: email.getEmail(),
                type: email.getType(),
                data: JSON.parse(email.getMessagedata()),
                stringData: email.getMessagedata()
            })

            const savedEmail = await newEmail.save();
            result.setSuccess(true);
            result.setId(savedEmail._id);
        } catch (ex) {
            const err = ex as Error;
            result.setSuccess(false);
            result.setMessage(err.message);
        }

        return result;
    }

    async GetEmailsForEmailAddress(emailData: EmailAddress) : Promise<Emails> {
        const result = new Emails();
        /*
        try {

        } catch (ex) {
            const err = ex as Error;
            result.setSuccess(false);
            result.setMessage(err.message);
        }
        */
        return result;
    }

    async FindEmailsForEmailByContent(queryData : Query) : Promise<Emails> {
        const result = new Emails();

        return result;
    }

    // TODO : Implement function that will send emails. Use utils/templates for rendering
}