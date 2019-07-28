var Trip = /** @class */ (function () {
    function Trip(name, startDate, endDate, budget) {
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.budget = budget;
        this.expenditures = [];
        // TODO: make id generation use GUIDs
        this.id = Math.random() * 10000;
    }
    Trip.prototype.addItem = function (item) {
        if (!item)
            return false;
        // if any of the dates that this item applies to fall outside the date
        // range of the trip, it's an error
        for (var _i = 0, _a = item.dates; _i < _a.length; _i++) {
            var d = _a[_i];
            var itemDate = d.getDate();
            var tripStart = this.startDate.getDate();
            var tripEnd = this.endDate.getDate();
            if (itemDate < tripStart || itemDate > tripEnd) {
                console.log("Expenditure has date outside of range! \n                    ItemDate:" + itemDate + " TripStart:" + tripStart + " TripEnd:" + tripEnd);
                return false;
            }
        }
        this.expenditures.push(item);
        return true;
    };
    Trip.prototype.removeItem = function (id) {
        var index = this.expenditures.findIndex(function (element) { return (element.id == id); });
        // not found
        if (index == -1)
            return null;
        return this.expenditures.splice(index, 1)[0];
    };
    return Trip;
}());
var Expenditure = /** @class */ (function () {
    function Expenditure(dates, amount, description, category, location) {
        if (description === void 0) { description = ""; }
        if (category === void 0) { category = "uncategorized"; }
        if (location === void 0) { location = ""; }
        this.dates = dates;
        this.amount = amount;
        this.description = description;
        this.category = category;
        this.location = location;
        // TODO: make ID generation use GUIDs
        this.id = Math.random() * 10000;
    }
    return Expenditure;
}());
