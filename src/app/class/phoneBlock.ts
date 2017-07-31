
export class PhoneBlock {

    office: string;

    home: string;

    cellphone: string;

    fax: string;

    main: string;

    other: string;

    public static getAsString(phoneBlock: PhoneBlock) {
        let result = "";

        let t = [];

        if (phoneBlock.office) t.push(phoneBlock.office);
        if (phoneBlock.home) t.push(phoneBlock.home);
        if (phoneBlock.cellphone) t.push(phoneBlock.cellphone);
        if (phoneBlock.fax) t.push(phoneBlock.fax);
        if (phoneBlock.main) t.push(phoneBlock.main);
        if (phoneBlock.other) t.push(phoneBlock.other);

        result = t.join(", ");

        return result;
    }
}