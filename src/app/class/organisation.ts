export class Organisation {

    id: number;

    name: string;

    address: string;

    description: string;

    addDate: number;

    changeDate: number;


    typeCode_n: string;

    orgName_n: string;

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

    inn_n: string;

    kpp_n: string;

    cor_n: string;

    bic_n: string;

    other_n: string;

    head_n: any;

    contact_n: any;


    contract_n: string;

    stateCode_n: string;

    sourceCode_n: string;

    agent_n: any;

    public copyFields(org: Organisation){
        this.id = org.id;
        this.name = org.name;
        this.address = org.address;
        this.description = org.description;
        this.addDate = org.addDate;
        this.changeDate = org.changeDate;
        this.typeCode_n = org.typeCode_n;
        this.region_n = org.region_n;
        this.city_n = org.city_n;
        this.area_n = org.area_n;
        this.admArea_n = org.admArea_n;
        this.street_n = org.street_n;
        this.house_n = org.house_n;
        this.housing_n = org.housing_n;
        this.apartment_n = org.apartment_n;
        this.officePhone_n = org.officePhone_n;
        this.homePhone_n = org.homePhone_n;
        this.cellPhone_n = org.cellPhone_n;
        this.fax_n = org.fax_n;
        this.mainPhone_n = org.mainPhone_n;
        this.otherPhone_n = org.otherPhone_n;
        this.workEmail_n = org.workEmail_n;
        this.mainEmail_n = org.mainEmail_n;
        this.webSite_n = org.webSite_n;
        this.agent_n = org.agent_n;
        this.contract_n = org.contract_n;
        this.stateCode_n = org.stateCode_n;
        this.sourceCode_n = org.sourceCode_n;
        this.orgName_n = org.orgName_n;
        this.inn_n = org.inn_n;
        this.kpp_n = org.kpp_n;
        this.cor_n = org.cor_n;
        this.bic_n = org.bic_n;
        this.other_n = org.other_n;
        this.head_n = org.head_n;
        this.contact_n = org.contact_n;
    }

}
