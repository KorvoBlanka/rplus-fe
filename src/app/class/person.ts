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

    public copyFields(pers: Person){
        this.id = pers.id;
        this.name = pers.name;
        this.phones = pers.phones;
        this.emails = pers.emails;
        this.description = pers.description;
        this.addDate = pers.addDate;
        this.changeDate = pers.changeDate;
        this.organisationId = pers.organisationId;
        this.userId = pers.userId;
        this.accountId = pers.accountId;
        this.typeCode_n = pers.typeCode_n;
        this.fullName_n = pers.fullName_n;
        this.region_n = pers.region_n;
        this.city_n = pers.city_n;
        this.area_n = pers.area_n;
        this.admArea_n = pers.admArea_n;
        this.street_n = pers.street_n;
        this.house_n = pers.house_n;
        this.housing_n = pers.housing_n;
        this.apartment_n = pers.apartment_n;
        this.officePhone_n = pers.officePhone_n;
        this.homePhone_n = pers.homePhone_n;
        this.cellPhone_n = pers.cellPhone_n;
        this.fax_n = pers.fax_n;
        this.mainPhone_n = pers.mainPhone_n;
        this.otherPhone_n = pers.otherPhone_n;
        this.workEmail_n = pers.workEmail_n;
        this.mainEmail_n = pers.mainEmail_n;
        this.webSite_n = pers.webSite_n;
        this.organisation_n = pers.organisation_n;
        this.positionCode_n = pers.positionCode_n;
        this.agent_n = pers.agent_n;
        this.contract_n = pers.contract_n;
        this.stateCode_n = pers.stateCode_n;
        this.sourceCode_n = pers.sourceCode_n;
    }
}
