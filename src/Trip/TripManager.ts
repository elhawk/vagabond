import { ITrip, Trip } from "./trip";
import { IDateWrapper, DateWrapper } from "../utils/DateWrapper";

export interface ITripManager {
    trips: ITrip[];

    addTrip(trip: ITrip) : number;

    getTripById(id: number) : ITrip | null;
}

export class TripManager implements ITripManager {

    constructor(
        public trips: ITrip[] = [],
        public dateWrapper : IDateWrapper = new DateWrapper()) {

    }

    // The server returns a list of trips serialized into JSON.
    // populate them into Trip objects and add them to our trips list.
    addServerTrips(trips: object[]) {
        trips.forEach((jsonTrip: any) => {
            try {
                let parsedTrip: ITrip = new Trip(
                    jsonTrip["name"].toString(),
                    new Date(jsonTrip["startDate"]),
                    new Date(jsonTrip["endDate"]),
                    parseFloat(jsonTrip["budget"]),
                    parseInt(jsonTrip["id"]),
                    []
                );
                this.trips.push(parsedTrip);
            } catch(err) {
                console.log("Unable to parse addServerTrips")
            };
        });
    }

    addTrip(trip: ITrip): number {
        this.trips.push(trip);
        return trip.id;
    }

    getCurrentTrips() : ITrip[] {
        let currentTrips: ITrip[] = [];
        for(let trip of this.trips) {
            if (trip.startDate.getTime() <= this.dateWrapper.now() && trip.endDate.getTime() >= this.dateWrapper.now()) {
                currentTrips.push(trip);
            }
        }

        return currentTrips;
    }

    getUpcomingTrips() {
        let upcomingTrips: ITrip[] = [];
        for(let trip of this.trips) {
            if (trip.startDate.getTime() > this.dateWrapper.now()) {
                upcomingTrips.push(trip);
            }
        }

        return upcomingTrips;
    }

    getPastTrips() {
        let pastTrips: ITrip[] = [];
        for(let trip of this.trips) {
            if (trip.endDate.getTime() < this.dateWrapper.now()) {
                pastTrips.push(trip);
            }
        }

        return pastTrips;
    }

    getTripById(id: number): ITrip | null {
        let index = this.trips.findIndex(element => element.id == id);
        if (index == -1) {
            return null;
        }
        else {
            return this.trips[index];
        }
    }
}
