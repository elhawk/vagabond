import {Trip, Expenditure} from '../trip';

// Trip tests -- add expenditure
it("Doesn't let you add expenditure outside of trip dates", () => {
    let trip : Trip = Trip.newTrip("Test Trip", new Date("2019-01-01"), new Date("2019-01-10"), 1000);
    let expenditure: Expenditure = new Expenditure([new Date("2019-01-20")], 10);
    expect(trip.addItem(expenditure)).toEqual(false);
});

it("Doesn't let you add expenditure where some dates are outside trip dates", () => {
    let trip : Trip = Trip.newTrip("Test Trip", new Date("2019-01-01"), new Date("2019-01-10"), 1000);
    let expenditure: Expenditure = new Expenditure([new Date("2019-01-02"), new Date("2019-01-20")], 10);
    expect(trip.addItem(expenditure)).toEqual(false);
});

it("Lets you add expenditure where dates are start or end date", () => {
    let trip : Trip = Trip.newTrip("Test Trip", new Date("2019-01-01"), new Date("2019-01-10"), 1000);

    let startDateExpenditure: Expenditure = new Expenditure([new Date("2019-01-01")], 10);
    expect(trip.addItem(startDateExpenditure)).toEqual(true);

    let endDateExpenditure: Expenditure = new Expenditure([new Date("2019-01-10")], 10);
    expect(trip.addItem(endDateExpenditure)).toEqual(true);
});

it("Lets you add expenditure where all dates are in range", () => {
    let trip : Trip = Trip.newTrip("Test Trip", new Date("2019-01-01"), new Date("2019-01-10"), 1000);

    let expenditure: Expenditure = new Expenditure([new Date("2019-01-02"), new Date("2019-01-03")], 10);
    expect(trip.addItem(expenditure)).toEqual(true);
});

//Trip tests -- remove item
it ("Removing an existing expenditure works", ()=> {
    let expenditure = new Expenditure([new Date("2019-01-02")], 10);

    let trip: Trip = new Trip(
        "Test Trip",
         new Date("2019-01-01"),
         new Date("2019-01-10"),
         1000,
         5,
         [expenditure]);

    expect(trip.removeItem(expenditure.id)).toEqual(expenditure);
    expect(trip.expenditures.length).toEqual(0);
});

it ("Removing a nonexistent expenditure returns null", ()=> {
    let trip: Trip = new Trip(
        "Test Trip",
         new Date("2019-01-01"),
         new Date("2019-01-10"),
         1000,
         5,
         []);

    expect(trip.removeItem(35)).toEqual(null);
});