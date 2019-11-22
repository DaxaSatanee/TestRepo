import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-item',
	templateUrl: './item.html'
})

export class itemC {
	public items: itemI[];
	public myAppUrl: string = "";
	public selectedItem: itemI = { id: 0, name: "", price: 0, oper: "add" };
	IName = new FormControl();


	constructor(public http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
		this.myAppUrl = baseUrl;
		http.get<itemI[]>(baseUrl + 'item').subscribe(result => {
			this.items = result;
		}, error => console.error(error));
	};

	saveItem(Id, Name, Price) {
		var IId = parseInt(Id);
		IId = isNaN(IId) ? 0 : IId;

		const formData = new FormData();
		formData.append('Id', IId.toString());
		formData.append('Name', Name);

		this.http
			.post<itemI[]>(this.myAppUrl + 'item/save', formData)
			.subscribe(data => {
				this.items = data;
			}, error => {
				console.log(error);
			});

	}

	editItem(item) {
		this.IName.setValue(item.Name);
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
	oper: string;
}
