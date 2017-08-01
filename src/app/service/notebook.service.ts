import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {ConfigService} from './config.service';

import {Task} from '../class/task';
import {AsyncSubject} from "rxjs/AsyncSubject";

import 'rxjs/add/operator/map';
import {User} from "../entity/user";
import {SessionService} from "./session.service";
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NotebookService {

    private subject = new Subject<any>();

    set(data: any) {
        this.subject.next(data);
    }

    get(): Observable<any> {
        return this.subject.asObservable();
    }

    save(person: Task) {

    }
}
