class Timesheet {
  constructor() {
    this.timesheets = new Map();
  }

  submitTimesheet(projectName, hours) {
    const totalHours = this.timesheets.get(projectName) ?? 0;
    this.timesheets.set(projectName, totalHours + hours);
    return true;
  }

  getTimesheets() {
    return Array.from(this.timesheets.values());
  }

  getTotalTimesheetHours(projectName) {
    return this.timesheets.get(projectName);
  }
}

module.exports = Timesheet;
