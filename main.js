function calculateTotalTarget(startDate, endDate, totalAnnualTarget, excludedDays = [5]) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const monthsData = {};

    // Create a set of excluded days for quick lookup
    const excludedDaysSet = new Set(excludedDays);

    // Function to check if a date is an excluded day
    const isExcludedDay = (date) => excludedDaysSet.has(date.getDay());

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
        totalTarget: totalAnnualTarget
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
        const monthlyTarget = (workedDays / totalWorkingDays) * totalAnnualTarget;
        result.monthlyTargets.push(monthlyTarget || 0);
    }

    return result;
}

// Ex usage
const result = calculateTotalTarget('2024-01-01', '2024-03-31', 5220);
console.log(result);
