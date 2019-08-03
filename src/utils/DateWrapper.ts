// A wrapper around the javascript date object
export interface IDateWrapper {

    // milliseconds since the unix epoch
    now(): number;
}

export class DateWrapper implements IDateWrapper{
    
    now() : number {
        return Date.now();
    }
}