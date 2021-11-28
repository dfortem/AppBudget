import { Application } from "../models/Application";

export class ApplicationService {

  static getAllApplications(): Promise<Application[]> {
    let options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }

    return fetch('/data', options)
      .then((response: Response) => {
        return response.json();
      }).catch(err => {
        throw new Error(err)
      });
  }
}
