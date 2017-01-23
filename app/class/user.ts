export class User {

    id: number;

    login: string;

    password: string;

    role: string;

    name: string;

    phones: string[];
    emails: string[];

    superiorId: number;

    addDate: number;

    changeDate: number;

    accountId: number;

    constructor () {
        this.role = 'AGENT';
        this.phones = [];
        this.emails = [];
    }
}
