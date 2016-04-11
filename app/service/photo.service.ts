import {Injectable} from 'angular2/core';

import {Photo} from '../class/photo';
import {Http, Headers, Response} from 'angular2/http';

@Injectable()
export class PhotoService {

  constructor(private _http: Http) {};

    getPhotos(entityId: String) {
      console.log('getPhotos');

      return new Promise<Photo[]>(resolve => {
        var _resourceUrl = 'http://localhost:4567/api/v1/photo/list/' + entityId;
        var headers = new Headers();
        this._http.get(_resourceUrl, {
            headers: headers
            })
            .map(res => res.json())
            .subscribe(
              data => {
                resolve(data);
                if(data.result == "OK") {

                }
              },
              err => console.log(err)
            );
      });
    }

}
