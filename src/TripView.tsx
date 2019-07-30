import React from 'react';
import { ITrip, Trip, TripManager } from './trip';
import { ItemFieldTypes, AddItem, IItemToAdd } from './AddItem';


interface ITripViewProps {
    tripManager: TripManager;
}

interface ITripViewState {
    trips: ITrip[];
}

// A view to see a list of all of your trips.  Clicking on a trip will drill down
// into that single trip, opening your expenditures view
export class TripView extends React.Component<ITripViewProps, ITripViewState> {

    constructor(props: ITripViewProps) {
        super(props);

        this.state = {trips: []};

        this.onItemAddedCallback = this.onItemAddedCallback.bind(this);
    }
    
    // todo: see if I can get rid of item.item
    newTripInput: IItemToAdd = { item:
        {"Name": {name: "Name", type: ItemFieldTypes.stringType, required: true},
        "StartDate": {name: "Start Date", type: ItemFieldTypes.dateType, required: true},
        "EndDate": {name: "End Date", type: ItemFieldTypes.dateType, required: true},
        "Budget": {name: "Budget", type: ItemFieldTypes.numberType, required: true},}
    };

    render() {
        let tripsList = this.state.trips.map(SingleTrip);
        return (
        <div>
            <AddItem 
                onItemAddedCallback={this.onItemAddedCallback}
                itemToAdd={this.newTripInput}
                itemName = {"Trip"} />
            {tripsList}
        </div>);
    }

    onItemAddedCallback(item: IItemToAdd) {
        let tripId = this.props.tripManager.addTrip(
            new Trip(
                item.item["Name"].value,
                item.item["StartDate"].value,
                item.item["EndDate"].value,
                item.item["Budget"].value));

        this.setState({trips: this.props.tripManager.trips});
    }
}

function SingleTrip(trip: ITrip) {
    return (
        <div key={trip.id}>
            {trip.name} 
            Start Date: {trip.startDate}
            End Date: {trip.endDate}
            Budget: {trip.budget}
        </div>
    );
}