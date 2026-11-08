
class Timesheet {
  constructor() {
    this.timesheets = new Map();
  }

  submitTimesheet(projectName, hours) {
    if (typeof projectName !== 'string' || !projectName.trim()) {
      return false;
    }

    if (
      typeof hours !== 'number' ||
      !Number.isFinite(hours) ||
      hours <= 0 ||
      !Number.isInteger(hours * 2)
    ) {
      return false;
    }

    const key = projectName.trim().toLowerCase();
    const totalHours = this.timesheets.get(key) ?? 0;

    this.timesheets.set(key, totalHours + hours);
    return true;
  }

  getTimesheets() {
    return Array.from(this.timesheets.values());
  }

  getTotalTimesheetHours(projectName) {
    if (typeof projectName !== 'string') {
      return undefined;
    }

    return this.timesheets.get(projectName.trim().toLowerCase());
  }
}

module.exports = Timesheet;
