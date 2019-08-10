export interface ITrip {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    budget: number;
    expenditures: IExpenditure[];

    // Adds an expenditure to the trip, and returns 
    // success or failure
    addItem(item: IExpenditure) : boolean;

    // Removes an expenditure from the trip and returns the removed item
    removeItem(id: number) : IExpenditure | null;
}

export interface IExpenditure {
    id: number;
    dates: Date[];
    amount: number;
    description: string;
    category: string;
    location: string;
}

export class Trip implements ITrip {

    constructor (
        public name: string,
        public startDate: Date,
        public endDate: Date,
        public budget: number,
        public id: string,
        public expenditures: IExpenditure[]) {
           
    }

    addItem(item: IExpenditure): boolean {
        if (!item) 
            return false;

        // if any of the dates that this item applies to fall outside the date
        // range of the trip, it's an error
        for (let d of item.dates) {
            let itemDate = d.getTime();
            let tripStart = this.startDate.getTime();
            let tripEnd = this.endDate.getTime();
            if (itemDate < tripStart || itemDate > tripEnd) {
                console.log(`Expenditure has date outside of range! 
                    ItemDate:${itemDate} TripStart:${tripStart} TripEnd:${tripEnd}`);
                return false;
            }
        }

        this.expenditures.push(item);
        return true;
    }

    removeItem(id: number): IExpenditure | null {
        let index = this.expenditures.findIndex(element => (element.id == id));
        
        // not found
        if (index === -1)
            return null;
        
        return this.expenditures.splice(index, 1)[0];

    }
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
        this.id = Math.floor(Math.random()*10000);
    }
}
