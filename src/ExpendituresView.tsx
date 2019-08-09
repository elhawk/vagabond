import React from "react";
import { ITrip, IExpenditure, Expenditure } from "./Trip/trip";
import { IItemToAdd, AddItem } from "./AddItem/AddItem";

interface IExpendituresViewProps {
    trip: ITrip;
    onCloseCallback: (() => void);
    userName: string;
}

interface IExpendituresViewState {
    expenditures: IExpenditure[];
}

// TODO could we refactor to share more code between this and TripView? Very copypasta right now.
export class TripExpenditures extends React.Component<IExpendituresViewProps, IExpendituresViewState>{
    
    constructor(props: IExpendituresViewProps) {
        super(props);

        this.state = {expenditures: props.trip.expenditures};

        this.onExpenditureAddedCallback = this.onExpenditureAddedCallback.bind(this);
    }
    
    // todo: see if I can get rid of item.item
    newExpenditureInput: IItemToAdd = { item:
        {"Description": {name: "Description", type: "string", required: true},
        "Date": {name: "Date", type: "date", required: true}, // TODO implement multiple dates
        "Amount": {name: "Amount", type: "number", required: true},
        "Category": {name: "Category", type: "string", required: false},} // todo: make this a multi select thing
    };

    onExpenditureAddedCallback(item: IItemToAdd) {
        let expenditure = new Expenditure(
            [new Date(item.item["Date"].value)],
            item.item["Amount"].value,
            item.item["Description"].value,
            item.item["Category"].value
        );

        this.props.trip.addItem(expenditure);
        this.setState({expenditures: this.props.trip.expenditures});
    }

    render() {
        let expendituresList = this.state.expenditures.map(SingleExpenditure);
        return (
        <div>
            <AddItem 
                onItemAddedCallback={this.onExpenditureAddedCallback}
                itemToAdd={this.newExpenditureInput}
                itemName = {"Expenditure"} 
                title={this.props.trip.name + " Spending"}        
                action={"/expenditures/"}
                userName={this.props.userName} />/>
            <BackToTrips onCloseCallback={this.props.onCloseCallback}/>
            {expendituresList}
        </div>);
    }

}

function SingleExpenditure(expenditure: IExpenditure) {
    return (
        <div className="container line-item" key={expenditure.id}>
            <div>{expenditure.description} </div>
            <div>Date: {expenditure.dates[0].toDateString()}</div>
            <div>Amount: {expenditure.amount}</div>
            <div>Category: {expenditure.category}</div>
        </div>
    );
}

function BackToTrips(props: {onCloseCallback: (() => void)}) {
    return (
        <button onClick={props.onCloseCallback}>Back to Trips View</button>
    );
}