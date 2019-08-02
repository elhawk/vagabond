import { ITrip } from "./trip";

export interface ITripManager {
    trips: ITrip[];

    addTrip(trip: ITrip) : number;

    getTripById(id: number) : ITrip | null;
}

export class TripManager implements ITripManager {
    constructor(public trips: ITrip[] = []) {
    }

    addTrip(trip: ITrip): number {
        // todo checks
        this.trips.push(trip);
        return trip.id;
    }

    // TODO: inject a date getter as a dependency
    getDate() : number {
        return Date.now();
    }

    getCurrentTrips() : ITrip[] {
        let currentTrips: ITrip[] = [];
        for(let trip of this.trips) {
            if (trip.startDate.getTime() <= this.getDate() && trip.endDate.getTime() >= this.getDate()) {
                currentTrips.push(trip);
            }
        }

        return currentTrips;
    }

    getUpcomingTrips() {
        let upcomingTrips: ITrip[] = [];
        for(let trip of this.trips) {
            if (trip.startDate.getTime() > this.getDate()) {
                upcomingTrips.push(trip);
            }
        }

        return upcomingTrips;
    }

    getPastTrips() {
        let pastTrips: ITrip[] = [];
        for(let trip of this.trips) {
            if (trip.endDate.getTime() < this.getDate()) {
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
