import React from "react";
import { ITrip } from "../trip";
import { AddExpenditure } from "./AddExpenditure";
import { IFormValues } from "../../AddItem/Form";
import { IExpenditure, parseExpenditure } from "./Expenditure";

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
        this.onExpenditureAddedCallback = this.onExpenditureAddedCallback.bind(this);
    }

    componentDidMount() {
        let url = '/expenditures?user=' + this.props.userName + "&tripId=" + this.props.trip.id;
        fetch (url)
            .then(res => res.json())
            .then(expenditures => {
                for (let ex of expenditures) {
                    let parsedExpenditure = parseExpenditure(ex);
                    if (parsedExpenditure.succeeded && parsedExpenditure.expenditure != undefined) {
                        this.state.expenditures.push(parsedExpenditure.expenditure);
                    } else {
                        console.log(`error parsing expenditure`);
                        console.log(ex);
                    }
                }
                this.setState({expenditures: this.state.expenditures});
            });
    }

    private onExpenditureAddedCallback(item: IFormValues) {

    }

    render() {
        let expendituresList;
        console.log(this.state.expenditures);
        if (this.state.expenditures.length != 0) {
            expendituresList = this.state.expenditures.map(SingleExpenditure);
        }
        return (
        <div>
            <AddExpenditure 
                tripName={this.props.trip.name}
                tripId={this.props.trip.id}        
                userName={this.props.userName}
                onItemAddedCallback={this.onExpenditureAddedCallback} />
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