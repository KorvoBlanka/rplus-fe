export interface Request {
    _index: string,
    _type: string,
    _id: string,
    _score: any,

    _source: any;

    selected: boolean;
}
