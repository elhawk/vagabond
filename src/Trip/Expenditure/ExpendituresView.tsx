import React from "react";
import { ITrip, IExpenditure } from "../trip";
import { AddExpenditure } from "./AddExpenditure";

interface IExpendituresViewProps {
    trip: ITrip;
    onCloseCallback: (() => void);
    userName: string;
}

interface IExpendituresViewState {
    expenditures: IExpenditure[];
}

export class TripExpenditures extends React.Component<IExpendituresViewProps, IExpendituresViewState>{
    
    constructor(props: IExpendituresViewProps) {
        super(props);

        this.state = {expenditures: props.trip.expenditures};

       // this.onExpenditureAddedCallback = this.onExpenditureAddedCallback.bind(this);
    }

    render() {
        let expendituresList = this.state.expenditures.map(SingleExpenditure);
        return (
        <div>
            <AddExpenditure 
                tripName={this.props.trip.name}        
                userName={this.props.userName} />
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