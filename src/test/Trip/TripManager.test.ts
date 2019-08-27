import {TripManager} from '../../Trip/TripManager'
import {Trip} from '../../Trip/trip'
import { IDateWrapper } from '../../utils/DateWrapper';

const currentDate: Date = new Date("2019-08-03");

class DateWrapperMock implements IDateWrapper {
    now(): number {
        return currentDate.getTime();
    }
}

it ("Returns correct set of current trips when they exist", ()=> {
    // set up a list of trips
    let pastTrip1 = new Trip("Past1", new Date("2019-07-01"), new Date("2019-07-11"), 1000, "guidId", []);
    let pastTrip2 = new Trip("Past2", new Date("2019-06-01"), new Date("2019-06-11"), 1000, "guidId", []);

    let currentTrip1 = new Trip("Current1", new Date("2019-08-01"), new Date("2019-08-11"), 1000, "guidId", []);
    let currentTrip2 = new Trip("Current2", new Date("2019-07-30"), new Date("2019-08-05"), 1000, "guidId", []);

    let upcomingTrip1 = new Trip("Upcoming1", new Date("2019-08-11"), new Date("2019-08-14"), 1000, "guidId", []);
    let upcomingTrip2 = new Trip("Upcoming2", new Date("2019-09-01"), new Date("2019-09-11"), 1000, "guidId", []);

    let trips : Trip[] = [pastTrip1, pastTrip2, currentTrip1, currentTrip2, upcomingTrip1, upcomingTrip2];

    // set up the trip manager
    let tripManager: TripManager = new TripManager(trips, new DateWrapperMock())

    // run the test
    let currentTrips: Trip[] = tripManager.getCurrentTrips();

    // check that we return both current trips, and nothing else
    expect(currentTrips).toContain(currentTrip1);
    expect(currentTrips).toContain(currentTrip2);
    expect(currentTrips.length).toEqual(2);
});

it ("Returns empty list when there are no current trips", ()=> {
    // set up a list of trips 
    let pastTrip1 = new Trip("Past1", new Date("2019-07-01"), new Date("2019-07-11"), 1000, "guidId", []);
    let pastTrip2 = new Trip("Past2", new Date("2019-06-01"), new Date("2019-06-11"), 1000, "guidId", []);

    let upcomingTrip1 = new Trip("Upcoming1", new Date("2019-08-11"), new Date("2019-08-14"), 1000, "guidId", []);
    let upcomingTrip2 = new Trip("Upcoming2", new Date("2019-09-01"), new Date("2019-09-11"), 1000, "guidId", []);

    let trips : Trip[] = [pastTrip1, pastTrip2, upcomingTrip1, upcomingTrip2];

    // set up the trip manager
    let tripManager: TripManager = new TripManager(trips, new DateWrapperMock())

    // run the test
    let currentTrips: Trip[] = tripManager.getCurrentTrips();

    // check that we return an empty list
    expect(currentTrips.length).toEqual(0);
});

it ("Returns correct set of past trips when they exist", ()=> {
    // set up a list of trips
    let pastTrip1 = new Trip("Past1", new Date("2019-07-01"), new Date("2019-07-11"), 1000, "guidId", []);
    let pastTrip2 = new Trip("Past2", new Date("2019-06-01"), new Date("2019-06-11"), 1000, "guidId", []);

    let currentTrip1 = new Trip("Current1", new Date("2019-08-01"), new Date("2019-08-11"), 1000, "guidId", []);
    let currentTrip2 = new Trip("Current2", new Date("2019-07-30"), new Date("2019-08-05"), 1000, "guidId", []);

    let upcomingTrip1 = new Trip("Upcoming1", new Date("2019-08-11"), new Date("2019-08-14"), 1000, "guidId", []);
    let upcomingTrip2 = new Trip("Upcoming2", new Date("2019-09-01"), new Date("2019-09-11"), 1000, "guidId", []);

    let trips : Trip[] = [pastTrip1, pastTrip2, currentTrip1, currentTrip2, upcomingTrip1, upcomingTrip2];

    // set up the trip manager
    let tripManager: TripManager = new TripManager(trips, new DateWrapperMock())

    // run the test
    let pastTrips: Trip[] = tripManager.getPastTrips();

    // check that we return both past trips, and nothing else
    expect(pastTrips).toContain(pastTrip1);
    expect(pastTrips).toContain(pastTrip2);
    expect(pastTrips.length).toEqual(2);
});

it ("Returns empty list when there are no past trips", ()=> {
    // set up a list of trips 
    let currentTrip1 = new Trip("Current1", new Date("2019-08-01"), new Date("2019-08-11"), 1000, "guidId", []);
    let currentTrip2 = new Trip("Current2", new Date("2019-07-30"), new Date("2019-08-05"), 1000, "guidId", []);

    let upcomingTrip1 = new Trip("Upcoming1", new Date("2019-08-11"), new Date("2019-08-14"), 1000, "guidId", []);
    let upcomingTrip2 = new Trip("Upcoming2", new Date("2019-09-01"), new Date("2019-09-11"), 1000, "guidId", []);

    let trips : Trip[] = [currentTrip1, currentTrip2, upcomingTrip1, upcomingTrip2];

    // set up the trip manager
    let tripManager: TripManager = new TripManager(trips, new DateWrapperMock())

    // run the test
    let pastTrips: Trip[] = tripManager.getPastTrips();

    // check that we return an empty list
    expect(pastTrips.length).toEqual(0);
});

it ("Returns correct set of upcoming trips when they exist", ()=> {
    // set up a list of trips
    let pastTrip1 = new Trip("Past1", new Date("2019-07-01"), new Date("2019-07-11"), 1000, "guidId", []);
    let pastTrip2 = new Trip("Past2", new Date("2019-06-01"), new Date("2019-06-11"), 1000, "guidId", []);

    let currentTrip1 = new Trip("Current1", new Date("2019-08-01"), new Date("2019-08-11"), 1000, "guidId", []);
    let currentTrip2 = new Trip("Current2", new Date("2019-07-30"), new Date("2019-08-05"), 1000, "guidId", []);

    let upcomingTrip1 = new Trip("Upcoming1", new Date("2019-08-11"), new Date("2019-08-14"), 1000, "guidId", []);
    let upcomingTrip2 = new Trip("Upcoming2", new Date("2019-09-01"), new Date("2019-09-11"), 1000, "guidId", []);

    let trips : Trip[] = [pastTrip1, pastTrip2, currentTrip1, currentTrip2, upcomingTrip1, upcomingTrip2];

    // set up the trip manager
    let tripManager: TripManager = new TripManager(trips, new DateWrapperMock())

    // run the test
    let upcomingTrips: Trip[] = tripManager.getUpcomingTrips();

    // check that we return both past trips, and nothing else
    expect(upcomingTrips).toContain(upcomingTrip1);
    expect(upcomingTrips).toContain(upcomingTrip1);
    expect(upcomingTrips.length).toEqual(2);
});

it ("Returns empty list when there are no upcoming trips", ()=> {
    // set up a list of trips 
    let currentTrip1 = new Trip("Current1", new Date("2019-08-01"), new Date("2019-08-11"), 1000, "guidId", []);
    let currentTrip2 = new Trip("Current2", new Date("2019-07-30"), new Date("2019-08-05"), 1000, "guidId", []);

    let pastTrip1 = new Trip("Past1", new Date("2019-07-01"), new Date("2019-07-11"), 1000, "guidId", []);
    let pastTrip2 = new Trip("Past2", new Date("2019-06-01"), new Date("2019-06-11"), 1000, "guidId", []);

    let trips : Trip[] = [currentTrip1, currentTrip2, pastTrip1, pastTrip2];

    // set up the trip manager
    let tripManager: TripManager = new TripManager(trips, new DateWrapperMock())

    // run the test
    let upcomingTrips: Trip[] = tripManager.getUpcomingTrips();

    // check that we return an empty list
    expect(upcomingTrips.length).toEqual(0);
});