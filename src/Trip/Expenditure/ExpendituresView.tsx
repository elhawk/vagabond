import React from "react";
import { ITrip } from "../trip";
import { AddExpenditure } from "./AddExpenditure";
import { IFormValues } from "../../AddItem/Form";
import { IExpenditure, parseExpenditure } from "./Expenditure";
import { DeleteExpenditureButton } from "../../DeleteItem/DeleteButton";

interface IExpendituresViewProps {
    trip: ITrip;
    onCloseCallback: (() => void);
    userName: string;
}

interface IExpendituresViewState {
    expenditures: IExpenditure[];
    fetchedServerExpenditures: boolean;
}

export class ExpendituresView extends React.Component<IExpendituresViewProps, IExpendituresViewState>{
    
    constructor(props: IExpendituresViewProps) {
        super(props);

        this.state = {expenditures: [], fetchedServerExpenditures: false};
        this.onExpenditureAddedCallback = this.onExpenditureAddedCallback.bind(this);
        this.generateSingleExpenditure = this.generateSingleExpenditure.bind(this);
        this.onDeleteSucceeded = this.onDeleteSucceeded.bind(this);
    }

    componentDidMount() {
        if (this.state.fetchedServerExpenditures) {
            // only fetch the expenditures from the server once per session
            return;
        }

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
                    }
                }
                this.setState({expenditures: this.state.expenditures, fetchedServerExpenditures: true});
            });
    }

    private onExpenditureAddedCallback(item: IFormValues) {
        // this should only be called when the expenditure has successfully been saved to the server
        // todo: remove dates hack when adding multiple dates is supported on the client
        item.dates = [item.date];
        let addedEx = parseExpenditure(item);

        if (addedEx.succeeded && addedEx.expenditure != undefined) {
            this.state.expenditures.push(addedEx.expenditure);
            this.setState({expenditures: this.state.expenditures});
        } else {
            console.log('unexpected error parsing expenditure after roundtrip');
        }
    }

    generateSingleExpenditure(ex: IExpenditure) {
        return SingleExpenditure(ex, this.props.trip.id, this.props.userName, this.onDeleteSucceeded);
    }

    onDeleteSucceeded(id: string) {
        let exIndex = this.state.expenditures.findIndex(element => (element.id == id));
        if (exIndex == -1) {
            console.log(`onDeleteSucceeded: id ${id} does not exist in expenditure array`);
            return;
        }

        this.state.expenditures.splice(exIndex, 1);
        this.setState({expenditures: this.state.expenditures});
    }

    render() {
        let expendituresList;
        if (this.state.expenditures.length != 0) {
            expendituresList = this.state.expenditures.map(this.generateSingleExpenditure);
        }
        return (
            <div>
                <AddExpenditure 
                    tripName={this.props.trip.name}
                    tripId={this.props.trip.id}        
                    userName={this.props.userName}
                    onItemAddedCallback={this.onExpenditureAddedCallback} />
                <BackToTrips onCloseCallback={this.props.onCloseCallback}/>
                <ExpendituresHeader />
                {expendituresList}
                <br />
                <br />
            </div>);
    }
}

function SingleExpenditure(expenditure: IExpenditure, tripId: string, userName: string, onDeleteSucceeded: (id: string) => void) {
    return (
        <div className="container line-item" key={expenditure.id}>
            <div>{expenditure.description} </div>
            <div>{expenditure.dates[0].toDateString()}</div>
            <div>{expenditure.amount}</div>
            <div>{expenditure.category}</div>
            <DeleteExpenditureButton onDeleteSucceeded={onDeleteSucceeded} expenditureId={expenditure.id} tripId={tripId} user={userName}/>
        </div>
    );
}

function BackToTrips(props: {onCloseCallback: (() => void)}) {
    return (
        <button onClick={props.onCloseCallback}>Back to Trips View</button>
    );
}

function ExpendituresHeader() {
    return (
        <div className="container line-item-header line-item" key="expendituresHeader">
            <div>Description</div>
            <div>Date</div>
            <div>Amount</div>
            <div>Category</div>
        </div>
    );
}