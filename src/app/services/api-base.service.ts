import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiBaseService {

  protected apiEndpoing: string;
  constructor(
    protected http: HttpClient,
    protected apiPath: String,
    protected version: String = 'v1') {

    let baseApiPath = environment.apiUrl;
    
    if (location.protocol === 'https:')
      baseApiPath = baseApiPath.replace('http:', 'https:');

    this.apiEndpoing = `${baseApiPath}api/${version}/${apiPath}`;
  }

  public get<T>(apiMethodName: string): Observable<T> {
    return this.http.get<T>(this.getApiFullPath(apiMethodName));
  }

  public post<T>(apiMethodName: string, body: any): Observable<T> {
    return this.http.post<T>(this.getApiFullPath(apiMethodName), body);
  }

  public put<T>(apiMethodName: string, body: any): Observable<T> {
    return this.http.put<T>(this.getApiFullPath(apiMethodName), body);
  }

  public delete<T>(apiMethodName: string): Observable<T> {
    return this.http.delete<T>(this.getApiFullPath(apiMethodName));
  }

  private getApiFullPath(apiMethodName: string): string {
    return `${this.apiEndpoing}/${apiMethodName}`;
  }

}