/**
 * Created by owl on 2/20/17.
 */

import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import {ConfigService} from './config.service';

import {Photo} from '../class/photo';


@Injectable()
export class UploadService {

    RS: String = "";

    constructor(private _configService: ConfigService, private _http: Http) {
        this.RS = this._configService.getConfig().RESTServer + '/api/v1/upload/';
    };

    uploadPhoto(postData: any, files: File[]) {
        let headers = new Headers();
        let formData: FormData = new FormData();
        formData.append('files', files[0], files[0].name);
        // For multiple files
        // for (let i = 0; i < files.length; i++) {
        //     formData.append(`files[]`, files[i], files[i].name);
        // }

        if(postData !== "" && postData !== undefined && postData !== null){
            for (var property in postData) {
                if (postData.hasOwnProperty(property)) {
                    formData.append(property, postData[property]);
                }
            }
        }

        var _resourceUrl = this.RS + 'photo';

        var returnReponse = new Promise((resolve, reject) => {
            this._http.post(_resourceUrl, formData, {
                headers: headers
            }).subscribe(
                res => {
                    var r = res.json();
                    console.log(r);
                },
                error => {
                    console.log(error);
                    reject(error);
                }
            );
        });
        return returnReponse;
    }

}
