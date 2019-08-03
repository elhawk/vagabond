import { ITrip } from "./trip";
import { IDateWrapper, DateWrapper } from "./utils/DateWrapper";

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
