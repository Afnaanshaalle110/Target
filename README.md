# Target Calculation Excluding Specific Days

## Description
This project provides a JavaScript function to calculate the proportional distribution of an annual target across multiple months, excluding specified non-working days (e.g., Fridays). The function computes the total number of working days for each month within a given date range and distributes the target based on those working days.

## Function: `calculateTotalTarget`

### Parameters
- **startDate**: (string) The start date of the period in `YYYY-MM-DD` format.
- **endDate**: (string) The end date of the period in `YYYY-MM-DD` format.
- **totalAnnualTarget**: (number) The total target amount to be distributed across the date range.
- **excludedDays**: (array, optional) An array of integers representing the days of the week to exclude (0 for Sunday, 1 for Monday, ..., 6 for Saturday). Default is `[5]`, which excludes Fridays.

### Returns
The function returns an object containing:
- **daysExcludingFridays**: (array) Count of non-excluded working days for each month in the range.
- **daysWorkedExcludingFridays**: (array) Count of days worked (non-excluded) within the specified range for each month.
- **monthlyTargets**: (array) Proportional target assigned to each month based on valid working days.
- **totalTarget**: (number) The total calculated target based on the working days within the given range.

## Example Usage
```javascript
const result = calculateTotalTarget('2024-01-01', '2024-03-31', 5220);
console.log(result);
/*
Output:
{
  daysExcludingFridays: [27, 25, 26],
  daysWorkedExcludingFridays: [27, 25, 26],
  monthlyTargets: [435, 434.99999999999994, 435],
  totalTarget: 1305
}
*/

