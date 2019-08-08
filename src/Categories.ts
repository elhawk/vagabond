// start off with the default categories populated
export var Categories: string[] = [
    "Accomodation",
    "Food",
    "Transportation",
    "Entertainment",
    "Shopping",
    "Miscellaneous",
    "Uncategorized"
];

export function addCategory(newCategory: string) : boolean {
    // Check that the category to be added is not an empty string, 
    // and does not already exist in the categories array

    if (newCategory === "") {
        return false;
    }

    if (Categories.findIndex(category => category.toLowerCase() == newCategory.toLowerCase()) != -1) {
        return false;
    }

    // Add the new category before uncategorized, which we want to keep as the last element
    Categories.pop();
    Categories.push(newCategory);
    Categories.push("Uncategorized");

    return true;
}