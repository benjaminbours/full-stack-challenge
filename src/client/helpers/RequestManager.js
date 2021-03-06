import { fetch } from 'whatwg-fetch';

const { origin } = window.location;

/**
 * Abort controller is here to cancel request between page transition.
 */
export const RequestController = new AbortController();
const { signal } = RequestController;

/**
 * Tools class to handle the different api request.
 */
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
