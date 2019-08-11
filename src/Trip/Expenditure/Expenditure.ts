export interface IExpenditure {
    id: number;
    dates: Date[];
    amount: number;
    description: string;
    category: string;
    location: string;
}

export class Expenditure implements IExpenditure {
    id: number;

    constructor(
        public dates: Date[],
        public amount: number,
        public description: string = "",
        public category: string = "uncategorized",
        public location: string = "") {
        // TODO: make ID generation use GUIDs
        this.id = Math.floor(Math.random() * 10000);
    }
}
