import React from 'react';
import { ITrip, Trip } from './trip';
import { TripManager } from './TripManager'
import { ExpendituresView } from './Expenditure/ExpendituresView';
import { AddTrip } from './AddTrip';
import { IFormValues } from '../AddItem/Form';
import { DeleteTripButton } from './DeleteTrip';

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
        this.onTripDeleted = this.onTripDeleted.bind(this);
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
                return <ExpendituresView
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
                <TripList tripName={"Current"} trips={currentTrips} onTripClick={this.onTripClick} user={this.props.userName} onTripDeleted={this.onTripDeleted}/>
                <TripList tripName={"Upcoming"} trips={upcomingTrips} onTripClick={this.onTripClick} user={this.props.userName} onTripDeleted={this.onTripDeleted}/>
                <TripList tripName={"Past"} trips={pastTrips} onTripClick={this.onTripClick} user={this.props.userName} onTripDeleted={this.onTripDeleted}/>
                <br />
                <br />
            </div>);
    }

    onTripClick(id: string) {
        this.setState({tripToDisplay: id});
    }

    onTripDeleted(id: string) {
        this.props.tripManager.removeTrip(id);
        this.setState({trips: this.props.tripManager.trips});
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
        user: string,
        tripName: string,
        trips: Trip[],
        onTripDeleted: (id: string) => void,
        onTripClick: (id: string)=> void}) : JSX.Element {
    let tripsElement = [];
    if (props.trips.length == 0) {
        let noTripsMessage: string = "You have no " + props.tripName.toLowerCase() + " trips."
        tripsElement.push(noTripsMessage);
    } else {
        tripsElement.push(<TripsHeader />);
        for (let trip of props.trips) {
            tripsElement.push(<SingleTrip trip={trip} onTripClick={props.onTripClick} user={props.user} onDeleteSucceeded={props.onTripDeleted}/>)
        }
    }

    return (
        <div className="container trips-list">
            <h3> {props.tripName} Trips </h3>
            {tripsElement}
            <br />
        </div>
    );
}

function SingleTrip(
    props: {
        user: string,
        trip: ITrip,
        onDeleteSucceeded: (id: string) => void,
        onTripClick: (id: string) => void}) {
    return (
        <div className="container line-item" key={props.trip.id} >
            <div className="clickable" onClick={() => props.onTripClick(props.trip.id)}>{props.trip.name} </div>
            <div>{props.trip.startDate.toDateString()}</div>
            <div>{props.trip.endDate.toDateString()}</div>
            <div>{"$" + props.trip.budget}</div>
            <DeleteTripButton user={props.user} tripId={props.trip.id} onDeleteSucceeded={props.onDeleteSucceeded}/>
        </div>
    );
}