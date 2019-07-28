export interface ITripManager {
    trips: ITrip[];

    addTrip(trip: ITrip) : boolean;
}

export interface ITrip {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    budget: number;
    expenditures: IExpenditure[];

    // Adds an expenditure to the trip, and returns 
    // success or failure
    addItem(item: IExpenditure) : boolean;

    // Removes an expenditure from the trip and returns the removed item
    removeItem(id: number) : IExpenditure;
}

export interface IExpenditure {
    id: number;
    dates: Date[];
    amount: number;
    description: string;
    category: string;
    location: string;
}

class TripManager implements ITripManager {
    
    constructor(public trips: ITrip[] = []) {

    }
    
    addTrip(trip: ITrip): boolean {
        // todo checks

        this.trips.push(trip);
        return true;
    }
}

class Trip implements ITrip {
    id: number;
    expenditures: IExpenditure[] = [];

    constructor (
        public name: string,
        public startDate: Date,
        public endDate: Date,
        public budget: number ) {
            // TODO: make id generation use GUIDs
           this.id = Math.random() * 10000;
    }

    addItem(item: IExpenditure): boolean {
        if (!item) 
            return false;

        // if any of the dates that this item applies to fall outside the date
        // range of the trip, it's an error
        for (let d of item.dates) {
            let itemDate = d.getDate();
            let tripStart = this.startDate.getDate();
            let tripEnd = this.endDate.getDate();
            if (itemDate < tripStart || itemDate > tripEnd) {
                console.log(`Expenditure has date outside of range! 
                    ItemDate:${itemDate} TripStart:${tripStart} TripEnd:${tripEnd}`);
                return false;
            }
        }

        this.expenditures.push(item);
        return true;
    }

    removeItem(id: number): IExpenditure {
        let index = this.expenditures.findIndex(element => (element.id == id));
        
        // not found
        if (index == -1)
            return null;
        
        return this.expenditures.splice(index, 1)[0];

    }
}

class Expenditure implements IExpenditure {

    id: number;        

    constructor(
        public dates: Date[],
        public amount: number,
        public description: string = "",
        public category: string = "uncategorized",
        public location: string = "") {
        // TODO: make ID generation use GUIDs
        this.id = Math.random()*10000;
    }
}
