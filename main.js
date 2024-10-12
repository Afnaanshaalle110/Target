// Function to calculate the target distribution
function calculateTotalTarget(startDate, endDate, totalAnnualTarget, excludedDays = [5]) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const monthsData = {};

    // Function to check if a date is an excluded day
    const isExcludedDay = (date) => excludedDays.includes(date.getDay());

    // Function to get the number of working days excluding specified days for a month
    const getWorkingDaysExcluding = (year, month) => {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0); // Last day of the month
        let totalDays = 0;

        for (let d = firstDay; d <= lastDay; d.setDate(d.getDate() + 1)) {
            if (!isExcludedDay(d)) {
                totalDays++;
            }
        }
        return totalDays;
    };

    // Iterate through each date in the range
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const year = d.getFullYear();
        const month = d.getMonth();
        const monthKey = `${year}-${month}`;

        // Initialize month data if it doesn't exist
        if (!monthsData[monthKey]) {
            monthsData[monthKey] = {
                totalDays: getWorkingDaysExcluding(year, month),
                workedDays: 0
            };
        }

        // Count only the days worked within the range (if they are not excluded)
        if (!isExcludedDay(d)) {
            monthsData[monthKey].workedDays++;
        }
    }

    // Prepare the results
    let totalWorkingDays = 0;
    const result = {
        daysExcludingFridays: [],
        daysWorkedExcludingFridays: [],
        monthlyTargets: [],
        totalTarget: 0
    };

    // Calculate monthly data
    for (const monthKey in monthsData) {
        const { totalDays, workedDays } = monthsData[monthKey];
        result.daysExcludingFridays.push(totalDays);
        result.daysWorkedExcludingFridays.push(workedDays);
        totalWorkingDays += workedDays;
    }

    // Calculate monthly targets based on working days
    for (const monthKey in monthsData) {
        const workedDays = monthsData[monthKey].workedDays;
        const monthlyTarget = totalWorkingDays > 0 ? (workedDays / totalWorkingDays) * totalAnnualTarget : 0;
        result.monthlyTargets.push(monthlyTarget);
    }

    // Calculate total target based on worked days
    result.totalTarget = totalWorkingDays > 0 ? (totalAnnualTarget / totalWorkingDays) * totalWorkingDays : 0;

    return result;
}

// Example usage
const result = calculateTotalTarget('2024-01-01', '2024-03-31', 5220);

// Output the result
const output = {
  daysExcludingFridays: result.daysExcludingFridays,
  daysWorkedExcludingFridays: result.daysWorkedExcludingFridays,
  monthlyTargets: result.monthlyTargets,
  totalTarget: result.totalTarget
};

console.log(output);
