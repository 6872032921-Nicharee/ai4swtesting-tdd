class Timesheet {
  constructor() {
    this.timesheets = new Map();
  }

  submitTimesheet(projectName, hours) {
    this.timesheets.set(projectName, hours);
    return true;
  }

  getTimesheets() {
    return Array.from(this.timesheets.values());
  }
}

module.exports = Timesheet;
