import { fetch } from 'whatwg-fetch';

const { origin } = window.location;

export const RequestController = new AbortController();
const { signal } = RequestController;

export default class RequestManager {
  static async getReportList(coordinate) {
    const response = await fetch(`${origin}/report/${coordinate.latitude}/${coordinate.longitude}`, { signal });
    const reports = await response.json();
    return reports;
  }

  static async postNewReport(report) {
    const response = await fetch(`${origin}/report`, {
      signal,
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
