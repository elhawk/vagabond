import React from 'react';
import { ITrip, Trip, TripManager } from './trip';
import { ItemFieldTypes, AddItem, IItemToAdd } from './AddItem';
import { TripExpenditures } from './ExpendituresView';


interface ITripViewProps {
    tripManager: TripManager;
}

interface ITripViewState {
    // All the trips we are rendering
    trips: ITrip[];

    // A single trip to display the expenditures, by its id.  When the id is -1 
    // we display the total trips view.
    tripToDisplay: number;
}

// A view to see a list of all of your trips.  Clicking on a trip will drill down
// into that single trip, opening your expenditures view
export class TripView extends React.Component<ITripViewProps, ITripViewState> {

    constructor(props: ITripViewProps) {
        super(props);

        this.state = {
            trips: [],
            tripToDisplay: -1,};

        this.onItemAddedCallback = this.onItemAddedCallback.bind(this);
        this.onCloseExpendituresViewCallback = this.onCloseExpendituresViewCallback.bind(this);
        this.onTripClick = this.onTripClick.bind(this);
    }
    
    // todo: see if I can get rid of item.item
    newTripInput: IItemToAdd = { item:
        {"Name": {name: "Name", type: ItemFieldTypes.stringType, required: true},
        "StartDate": {name: "Start Date", type: ItemFieldTypes.dateType, required: true},
        "EndDate": {name: "End Date", type: ItemFieldTypes.dateType, required: true},
        "Budget": {name: "Budget", type: ItemFieldTypes.numberType, required: true},}
    };

    render() {
        // Display add / list trips view
        if (this.state.tripToDisplay == -1) {
            let tripsList = [];
            for (let trip of this.state.trips) {
                tripsList.push(<SingleTrip trip={trip} onTripClick={this.onTripClick} />)
            }
            return (
            <div>
                <AddItem 
                    onItemAddedCallback={this.onItemAddedCallback}
                    itemToAdd={this.newTripInput}
                    itemName = {"Trip"} 
                    title={"Your Trips"} />
                {tripsList}
            </div>);
        } else {
            // Display single trip view
            return <TripExpenditures
                trip={this.props.tripManager.getTripById(this.state.tripToDisplay)}
                onCloseCallback={this.onCloseExpendituresViewCallback}/>
        }
    }

    onTripClick(id: number) {
        this.setState({tripToDisplay: id});
    }

    onItemAddedCallback(item: IItemToAdd) {
        let tripId = this.props.tripManager.addTrip(
            new Trip(
                item.item["Name"].value,
                new Date(item.item["StartDate"].value),
                new Date(item.item["EndDate"].value),
                item.item["Budget"].value));

        this.setState({trips: this.props.tripManager.trips});
    }

    onCloseExpendituresViewCallback() {
        this.setState({tripToDisplay: -1});
    }
}

function SingleTrip(
    props: {
        trip: ITrip,
        onTripClick: (id: number) => void}) {
            console.log(props.trip.id);
    return (
        <div key={props.trip.id} onClick={() => props.onTripClick(props.trip.id)}>
            {props.trip.name} 
            Start Date: {props.trip.startDate.toDateString()}
            End Date: {props.trip.endDate.toDateString()}
            Budget: {props.trip.budget}
        </div>
    );
}