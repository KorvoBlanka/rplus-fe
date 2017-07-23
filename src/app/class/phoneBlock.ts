
export class PhoneBlock {

    office: string;

    home: string;

    cellphone: string;

    fax: string;

    main: string;

    other: string;

    public getAsString() {
        let result = "";

        let t = [];

        if (this.office) t.push(this.office);
        if (this.home) t.push(this.home);
        if (this.cellphone) t.push(this.cellphone);
        if (this.fax) t.push(this.fax);
        if (this.main) t.push(this.main);
        if (this.other) t.push(this.other);

        result = t.join(", ");

        return result;
    }
}