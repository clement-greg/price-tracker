import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) { }

  async get(url: string, params: any = null): Promise<any> {
    const fullUrl = `${environment.baseUrl}${url}`;
    const value = await this.http.get(fullUrl, { params })
      .toPromise();

    return value;
  }

  async post(url: string, objectToPost: any): Promise<any> {
    const fullUrl = `${environment.baseUrl}${url}`;
    const value = await this.http.post(fullUrl, objectToPost).toPromise();

    return value;
  }

  async delete(url: string): Promise<any> {
    const fullUrl = `${environment.baseUrl}${url}`;
    const value = await this.http.delete(fullUrl).toPromise();

    console.log('deleting');
    console.log(fullUrl);
    return value;
  }

  getWeatherForecast(): Promise<any> {
    return this.get('weatherforecast');
  }

  saveTestItem(testItem: any) {

    return this.post('test', testItem);
  }

  getTestItems(): Promise<any[]> {
    return this.get('test');
  }

  deleteTestItem(id: string): Promise<any> {
    return this.delete(`test/${id}`);
  }
}
