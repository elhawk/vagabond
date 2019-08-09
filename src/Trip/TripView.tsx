import React from 'react';
import { ITrip, Trip } from './trip';
import { TripManager } from './TripManager'
import {  AddItem, IItemToAdd } from '../AddItem/AddItem';
import { TripExpenditures } from '../ExpendituresView';

interface ITripViewProps {
    tripManager: TripManager;

    userName: string;
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
        {"Name": {name: "Name", type: "string", required: true},
        "StartDate": {name: "Start Date", type: "date", required: true},
        "EndDate": {name: "End Date", type: "date", required: true},
        "Budget": {name: "Budget", type: "number", required: true},}
    };

    onComponentMount() {
        // TODO: fetch trips only for logged in user
        fetch ('/trips')
            .then(res => res.json())
            .then(trips => {
                this.props.tripManager.addServerTrips(trips);
                this.setState({trips: this.props.tripManager.trips});
            });
    }

    render() {
        // Display add / list trips view
        if (this.state.tripToDisplay == -1) {
            return this.renderTripsListView();
        } else {
            // Display single trip view
            let tripToDisplay: Trip | null = this.props.tripManager.getTripById(this.state.tripToDisplay);
            if (tripToDisplay != null) {
                return <TripExpenditures
                    trip={tripToDisplay}
                    onCloseCallback={this.onCloseExpendituresViewCallback}
                    userName={this.props.userName}/>
            } else {
                console.log("Could not find trip with ID "+ this.state.tripToDisplay);
                return null;
            }
        }
    }

    renderTripsListView() : JSX.Element {
        let currentTrips: Trip[] = this.props.tripManager.getCurrentTrips();
        let upcomingTrips: Trip[] = this.props.tripManager.getUpcomingTrips();
        let pastTrips: Trip[] = this.props.tripManager.getPastTrips();

        return (
            <div>
                <AddItem 
                    onItemAddedCallback={this.onItemAddedCallback}
                    itemToAdd={this.newTripInput}
                    itemName = {"Trip"} 
                    title={"Your Trips"}
                    action={"/trips/"}
                    userName={this.props.userName} />
                <TripList tripName={"Current"} trips={currentTrips} onTripClick={this.onTripClick}/>
                <TripList tripName={"Upcoming"} trips={upcomingTrips} onTripClick={this.onTripClick}/>
                <TripList tripName={"Past"} trips={pastTrips} onTripClick={this.onTripClick}/>
            </div>);
    }

    onTripClick(id: number) {
        this.setState({tripToDisplay: id});
    }

    onItemAddedCallback(item: IItemToAdd) {
        let tripId = this.props.tripManager.addTrip(
            Trip.newTrip(
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

function TripsHeader() {
    return (
        <div className="container line-item-header line-item" key="tripsheader">
            <div>Trip Name</div>
            <div>Start Date</div>
            <div>End Date</div>
            <div>Budget</div>
        </div>
    );
}

function TripList(props: {
        tripName: string,
        trips: Trip[],
        onTripClick: (id: number)=> void}) : JSX.Element {
    let tripsElement = [];
    if (props.trips.length == 0) {
        let noTripsMessage: string = "You have no " + props.tripName.toLowerCase() + " trips."
        tripsElement.push(noTripsMessage);
    } else {
        tripsElement.push(<TripsHeader />);
        for (let trip of props.trips) {
            tripsElement.push(<SingleTrip trip={trip} onTripClick={props.onTripClick} />)
        }
    }

    return (
        <div className="container trips-list">
            <h3> {props.tripName} Trips </h3>
            {tripsElement}
        </div>
    );
}

function SingleTrip(
    props: {
        trip: ITrip,
        onTripClick: (id: number) => void}) {
    return (
        <div className="container line-item clickable" key={props.trip.id} onClick={() => props.onTripClick(props.trip.id)}>
            <div>{props.trip.name} </div>
            <div>{props.trip.startDate.toDateString()}</div>
            <div>{props.trip.endDate.toDateString()}</div>
            <div>{"$" + props.trip.budget}</div>
        </div>
    );
}