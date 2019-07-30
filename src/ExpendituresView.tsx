import React from "react";
import { ITrip, IExpenditure } from "./trip";
import { ItemFieldTypes, IItemToAdd, AddItem } from "./AddItem";

interface IExpendituresViewProps {
    trip: ITrip;
}

interface IExpendituresViewState {
    expenditures: IExpenditure[];
}

// TODO could we refactor to share more code between this and TripView? Very copypasta right now.
export class TripExpenditures extends React.Component<IExpendituresViewProps, IExpendituresViewState>{
    
    constructor(props: IExpendituresViewProps) {
        super(props);

        this.state = {expenditures: []};

        this.onExpenditureAddedCallback = this.onExpenditureAddedCallback.bind(this);
    }
    
    // todo: see if I can get rid of item.item
    newExpenditureInput: IItemToAdd = { item:
        {"Description": {name: "description", type: ItemFieldTypes.stringType, required: true},
        "Date": {name: "date", type: ItemFieldTypes.dateType, required: true}, // TODO implement multiple dates
        "Amount": {name: "amount", type: ItemFieldTypes.numberType, required: true},
        "Category": {name: "category", type: ItemFieldTypes.stringType, required: false},} // todo: make this a multi select thing
    };

    onExpenditureAddedCallback(item: IItemToAdd) {
        console.log("expenditure added");
        console.log(item);
        // TODO implement adding this to the list
    }

    render() {
        let expendituresList = this.state.expenditures.map(SingleExpenditure);
        return (
        <div>
            {this.props.trip.name}
            <AddItem 
                onItemAddedCallback={this.onExpenditureAddedCallback}
                itemToAdd={this.newExpenditureInput}
                itemName = {"Expenditure"} />
            <BackToTrips />
            {expendituresList}
        </div>);
    }

}

function SingleExpenditure(expenditure: IExpenditure) {
    return (
        <div key={expenditure.id}>
            {expenditure.description} 
            Date: {expenditure.dates[0]}
            Amount: {expenditure.amount}
            Category: {expenditure.category}
        </div>
    );
}

// TODO: implement back to trips
function BackToTrips() {
    return (
        <button>Back to Trips View</button>
    );
}