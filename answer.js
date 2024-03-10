// Example input
const startDateStr = "2023-01-01"; // Start date in YYYY-MM-DD format
const endDateStr = "2023-01-06"; // End date in YYYY-MM-DD format
const totalAnnualTarget = 5220; // Example total annual target

// Convert string dates to Date objects
const startDate = new Date(startDateStr);
const endDate = new Date(endDateStr);

// Calculate the required values
const daysInMonthExcludingFridays = calculateDaysInMonthExcludingFridays(startDate);
const daysWorkedExcludingFridays = calculateDaysExcludingFridays(startDate, endDate);
const dailyTargetForMonth = calculateDailyTargetForMonth(startDate, totalAnnualTarget);
const periodTarget = dailyTargetForMonth * daysWorkedExcludingFridays;

// Output the results
console.log(`Days in the month excluding Fridays: ${daysInMonthExcludingFridays}`);
console.log(`Days worked in the period excluding Fridays: ${daysWorkedExcludingFridays}`);
console.log(`Daily target for the month: ${dailyTargetForMonth.toFixed(2)}`);
console.log(`Total target for the period excluding Fridays: ${periodTarget.toFixed(2)}`);

function calculateDaysExcludingFridays(start, end) {
  let count = 0;
  let date = new Date(start);
  while (date <= end) {
    if (date.getDay() !== 5) { // In JS, 0 is Sunday, so Friday is 5
      count++;
    }
    date.setDate(date.getDate() + 1);
  }
  return count;
}

function calculateDaysInMonthExcludingFridays(date) {
  const yearMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayOfMonth = new Date(yearMonth);
  const lastDayOfMonth = new Date(yearMonth.getFullYear(), yearMonth.getMonth() + 1, 0); // Last day of month
  let fridaysCount = 0;

  for (let current = new Date(firstDayOfMonth); current <= lastDayOfMonth; current.setDate(current.getDate() + 1)) {
    if (current.getDay() === 5) { // Friday check
      fridaysCount++;
    }
  }
  return lastDayOfMonth.getDate() - fridaysCount; // Total days in month minus Fridays
}

function calculateDailyTargetForMonth(startDate, totalAnnualTarget) {
  const monthlyTarget = totalAnnualTarget / 12; // Divide the annual target by 12 to find the monthly target
  const daysInMonthExcludingFridays = calculateDaysInMonthExcludingFridays(startDate);
  return monthlyTarget / daysInMonthExcludingFridays; // Divide the monthly target by the number of days in the month excluding Fridays
}
