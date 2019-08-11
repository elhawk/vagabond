import React from 'react';
import { ITrip, Trip } from './trip';
import { TripManager } from './TripManager'
import { TripExpenditures } from './Expenditure/ExpendituresView';
import { AddTrip } from './AddTrip';
import { IFormValues } from '../AddItem/Form';

interface ITripViewProps {
    tripManager: TripManager;

    userName: string;
}

interface ITripViewState {
    // All the trips we are rendering.  I don't love how there's 2 sources of truth
    // between this and the trips manager -- this should always be assigned from the trips manager.
    trips: ITrip[];

    // A single trip to display the expenditures, by its id.  When the id is empty
    // we display the total trips view.
    tripToDisplay: string;
}

// A view to see a list of all of your trips.  Clicking on a trip will drill down
// into that single trip, opening your expenditures view
export class TripView extends React.Component<ITripViewProps, ITripViewState> {

    constructor(props: ITripViewProps) {
        super(props);

        this.state = {
            trips: props.tripManager.trips,
            tripToDisplay: "",};

        this.onItemAddedCallback = this.onItemAddedCallback.bind(this);
        this.onCloseExpendituresViewCallback = this.onCloseExpendituresViewCallback.bind(this);
        this.onTripClick = this.onTripClick.bind(this);
    }

    componentDidMount() {
        let url = '/trips?user=' + this.props.userName;
        fetch (url)
            .then(res => res.json())
            .then(trips => {
                console.log(trips);
                this.props.tripManager.addServerTrips(trips);
                this.setState({trips: this.props.tripManager.trips});
            });
    }

    render() {
        // Display add / list trips view
        if (this.state.tripToDisplay === "") {
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
                <AddTrip userName={this.props.userName} onItemAddedCallback={this.onItemAddedCallback} />
                <TripList tripName={"Current"} trips={currentTrips} onTripClick={this.onTripClick}/>
                <TripList tripName={"Upcoming"} trips={upcomingTrips} onTripClick={this.onTripClick}/>
                <TripList tripName={"Past"} trips={pastTrips} onTripClick={this.onTripClick}/>
            </div>);
    }

    onTripClick(id: string) {
        this.setState({tripToDisplay: id});
    }

    onItemAddedCallback(item: IFormValues) {
        // this callback should only be called when the trip has successfully been saved
        // on the server
        this.props.tripManager.addServerTrips([item]);
        this.setState({trips: this.props.tripManager.trips});
    }

    onCloseExpendituresViewCallback() {
        this.setState({tripToDisplay: ""});
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
        onTripClick: (id: string)=> void}) : JSX.Element {
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
        onTripClick: (id: string) => void}) {
    return (
        <div className="container line-item clickable" key={props.trip.id} onClick={() => props.onTripClick(props.trip.id)}>
            <div>{props.trip.name} </div>
            <div>{props.trip.startDate.toDateString()}</div>
            <div>{props.trip.endDate.toDateString()}</div>
            <div>{"$" + props.trip.budget}</div>
        </div>
    );
}