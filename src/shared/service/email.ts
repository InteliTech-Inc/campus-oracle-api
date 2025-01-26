import { Resend } from "resend";

export interface SendEmailParams {
    to: string[];
    subject: string;
    html: string;
}

/**
 * EmailService class for sending emails using the Resend package.
 */
export class EmailService {
    private resend: Resend;

    /**
     * Constructs a new instance of the EmailService class.
     */
    constructor() {
        this.resend = new Resend(process.env.RESEND_KEY);
    }

    /**
     * Sends an email.
     *
     * @returns {Promise<any>} A promise that resolves with the result of the email sending operation.
     * @param params
     */
    sendEmail({ to, subject, html }: SendEmailParams): Promise<any> {
        return this.resend.emails.send(
            {
                from: "Oneway <campusoracle@gmail.com>",
                to,
                subject,
                html,
            },
            {}
        );
    }
}
