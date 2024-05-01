export declare class SendgridService {
    constructor();
    adminEmail({ to, subject, html }: {
        to: any;
        subject: any;
        html: any;
    }): Promise<void>;
    forgetPassword({ to, name, uuidToken }: {
        to: any;
        name: any;
        uuidToken: any;
    }): Promise<void>;
    signUpPassword({ to, name, password }: {
        to: any;
        name: any;
        password: any;
    }): Promise<void>;
    contactUs({ to, name, subject, message, email }: {
        to: any;
        name: any;
        subject: any;
        message: any;
        email: any;
    }): Promise<void>;
    private query;
    private sendEmail;
    private send;
}
