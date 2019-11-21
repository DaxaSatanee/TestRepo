import { Component, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { debug } from 'util';
//import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-item',
	templateUrl: './item.html'
})

@Injectable()
export class itemC {
	public items: itemI[];
	myAppUrl: string = "";
	private headers: HttpHeaders;

	constructor(public http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
		this.myAppUrl = baseUrl;
		http.get<itemI[]>(baseUrl + 'item').subscribe(result => {
			this.items = result;
		}, error => console.error(error));
	};

	saveItem(item) {
		return this.http.post(this.myAppUrl + 'item/save', { "name": item }, { headers: this.headers });
	}

	//errorHandler(error: Response) {
	//	console.log(error);
	//	return Observable.throw(error);
	//}

	//addItem(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
	//	http.post(baseUrl + 'item/save', { Id: "4", Name: "loo" }).subscribe(res => console.log(res));
	//};

}

interface itemI {
	id: number;
	name: string;
	price: number;
}
