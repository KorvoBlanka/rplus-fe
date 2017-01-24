export class Person {

    id: number;

    name: string;

    phones: string[];

    emails: string[];

    description: string;

    addDate: string;

    changeDate: number;

    organisationId: number;

    userId: number;

    accountId: number;


    constructor () {
        this.phones = [];
        this.emails = [];
    }
}
