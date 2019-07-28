interface ITrip {
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

interface IExpenditure {
    id: number;
    dates: Date[];
    amount: number;
    description: string;
    category: string;
    location: string;
}

class Trip implements ITrip{
    // TODO: make this based on previously saved trips
    private static _nextId : number = 1;

    id: number;
    expenditures: IExpenditure[] = [];

    constructor (
        public name: string,
        public startDate: Date,
        public endDate: Date,
        public budget: number ) {
           this.id = Trip._nextId++; 
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
        let index = this.expenditures.findIndex((element) => element.id == id));
        
        // not found
        if (index == -1)
            return null;
        
        return this.expenditures.splice(index, 1)[0];

    }


}