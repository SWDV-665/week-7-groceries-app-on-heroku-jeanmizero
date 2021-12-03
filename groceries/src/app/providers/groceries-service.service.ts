import { Injectable } from '@angular/core';
//Set up server
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroceriesServiceService {
  items: any = [];
  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  baseUrl = 'http://localhost:8080';
  // Add to the services
  constructor(public http: HttpClient) {
    console.log('Hello GroceriesServicesProvider Provider');

    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  // Create(Post) Mothod
  addItem(item) {
    this.http.post(this.baseUrl + '/api/groceries/', item).subscribe((res) => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }

  // Read(Read)Method
  getItems() {
    return this.http
      .get(this.baseUrl + '/api/groceries')
      .pipe(map(this.extractData), catchError(this.handleError));
  }
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  // Update/Repace(Put) Method
  editItem(item, index) {
    console.log('Editing item = ', item);
    this.http
      .put(this.baseUrl + '/api/groceries/' + item._id, item)
      .subscribe((res) => {
        this.items = res;
        this.dataChangeSubject.next(true);
      });
  }

  //  Delete(Delete) Method
  removeItem(item) {
    console.log('### Remove item - id = ', item._id);
    this.http
      .delete(this.baseUrl + '/api/groceries/' + item._id)
      .subscribe((res) => {
        this.items = res;
        this.dataChangeSubject.next(true);
      });
  }
}
