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


    contract_n: string;

    recruitmentDate_n: number;

    dismissalDate_n: number;


    statusCode_n: number;


    positionCode_n: string;


    departmentCode_n: string;


    office_n: string;


    constructor () {
        this.role = 'AGENT';
        this.phones = [];
        this.emails = [];
    }
}
