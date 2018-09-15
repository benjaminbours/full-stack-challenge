import { fetch } from 'whatwg-fetch';

const { origin } = window.location;

export default class RequestManager {
  static async getReportList(coordinate) {
    const response = await fetch(`${origin}/report/${coordinate.latitude}/${coordinate.longitude}`);
    const reports = await response.json();
    return reports;
  }

  static async postNewReport(report) {
    const response = await fetch(`${origin}/report`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(report),
    });
    const content = await response.json();
    return content;
  }
}
