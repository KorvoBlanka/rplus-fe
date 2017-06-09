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


    typeCode_n: string;

    fullName_n: string;


    region_n: string;

    city_n: string;

    area_n: string;

    admArea_n: string;

    street_n: string;

    house_n: string;

    housing_n: string;

    apartment_n: string;


    officePhone_n: string;

    homePhone_n: string;

    cellPhone_n: string;

    fax_n: string;

    mainPhone_n: string;

    otherPhone_n: string;

    workEmail_n: string;

    mainEmail_n: string;

    webSite_n: string;

    organisation_n: any;

    positionCode_n: string;


    agent_n: any;


    contract_n: string;

    stateCode_n: string;

    sourceCode_n: string;



    constructor () {
        this.phones = [];
        this.emails = [];
    }
}
