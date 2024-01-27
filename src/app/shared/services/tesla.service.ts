import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ConfigInformation, ModelCodeAvailable, Tesla } from '../../core/models/tesla';

@Injectable({
  providedIn: 'root'
})
export class TeslaService {
  constructor(private httpClient: HttpClient) { }

  getModels(): Observable<Tesla[]> {
    return this.httpHandler<Tesla[]>(`/models`);
  }

  getOptionByModel(model: ModelCodeAvailable): Observable<ConfigInformation> {
    return this.httpHandler<ConfigInformation>(`/options/${model}`);
  }

  private httpHandler<T>(endpoint: string): Observable<T> {
    return this.httpClient.get<T>(endpoint)
      .pipe(
        map((response: T) => response),
      )
  }
}
