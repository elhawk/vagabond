import React from 'react';
import { TripManager } from './trip';
import { ItemFieldTypes, AddItem, IItemToAdd } from './AddItem';

interface ITripViewProps {
    tripManager: TripManager;
}

interface ITripViewState {
    trips: IItemToAdd[];
}

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
        console.log("render");
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
        console.log(this.state["trips"]);
        this.state["trips"].push(item);
        console.log(this.state["trips"]);
        this.setState({trips: this.state.trips});
        console.log(this.state["trips"]);
    }
}

function SingleTrip(item: IItemToAdd) {
    return (
        <div key={item.item["Name"].value}>
            {item.item["Name"].value} 
            Start Date: {item.item["StartDate"].value}
            End Date: {item.item["EndDate"].value}
            Budget: {item.item["Budget"].value}
        </div>
    );
}