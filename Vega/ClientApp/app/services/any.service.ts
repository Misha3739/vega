import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {FetchedData} from "../models/common/fetched-data";
import {Subject} from "rxjs";

@Injectable()
export class AnyService {
    static instance:AnyService;

    constructor(private http: Http) {
        return AnyService.instance = AnyService.instance || this;
    }

    fetchedData:FetchedData[] = [];

    dataFetched = new Subject();

  getAny(url: string, key: string) {
    return this.http.get(url)
        .map(res => res.json())
        .subscribe(result => {
            let fetched = (this.fetchedData.filter(f => f.key == key))[0];
            if(fetched) {
                fetched.data = result;
            } else {
                this.fetchedData.push(new FetchedData(key, result))
            }
            this.dataFetched.next(key);
        });
  }

  getFetchedItem(key: string, id: number): any {
      let fetched = (this.fetchedData.filter(f => f.key == key))[0];
      if(fetched) {
          return fetched.data.find(d => d.id == id);
      }
      return null;
  }

  deleteItem(url: string) {
    return this.http.delete(url);
  }
}
