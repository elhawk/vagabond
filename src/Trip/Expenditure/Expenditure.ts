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

export function parseExpenditure(jsonExpenditure: any) : {succeeded: boolean, expenditure?: IExpenditure} {
    // ensure the trip has all its required fields populated
    if (jsonExpenditure === undefined || jsonExpenditure === null) {
        console.log(`expenditure to deserialize is null or undefined`);
        return {succeeded: false};
    }

    let id = jsonExpenditure["id"];
    if (id === undefined || id.toString() == "" ) {
        console.log(`Expenditure does not have id: ${id}`);
        return {succeeded: false};
    }
    
    let dates = jsonExpenditure["dates"];
    if (!(dates instanceof Array) || dates.length == 0) {
        console.log(`Expenditure does not have valid dates array: ${jsonExpenditure["dates"]}`);
        return {succeeded: false};
    }

    let parsedDates = [];
    for (let date of dates) {
        let parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            console.log(`Expenditure does not have valid date: ${date}`);
            return {succeeded: false};
        }

        parsedDates.push(parsedDate);
    }

    let amount = parseFloat(jsonExpenditure["amount"]);
    if (isNaN(amount)) {  
        console.log(`Expenditure does not have valid amount: ${jsonExpenditure["amount"]}`);
        return {succeeded: false};
    }

    let description = jsonExpenditure["description"];
    if (description === undefined) {
        // description is optional
        description = "";
    }

    let category = jsonExpenditure["category"];
    if (category === undefined) {
        // category is optional
        category = "";
    }

    
    let location = jsonExpenditure["location"];
    if (location === undefined) {
        // location is optional
        location = "";
    }

    let parsedExpenditure = new Expenditure(parsedDates, amount, description, category, location);

    return {succeeded: true, expenditure: parsedExpenditure};
}