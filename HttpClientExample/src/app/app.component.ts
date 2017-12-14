import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";

class Customer {
  id: number;
  name: string;
  email: string;
  tel: string;
}

@Component({
  selector: 'customers',
  templateUrl: './app.component.html'
})
  //Export前加入@Injectable()，并在app.module.ts中@NgModule providers加入AppComponent，才可提供数据。
  //也可独立出来写一个Service，并在当前app.component中引用。
  @Injectable() 
export class AppComponent implements OnInit {
  customersObservable: Observable<Customer[]>;
  webAPIUrl = "http://immaohai.com:3000/customers";
  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.customersObservable = this.httpClient
      .get<Customer[]>(this.webAPIUrl);
  }

  //=====Json-server配置好后可通过http://127.0.0.1:3000/customers?_page=1&_limit=1网址请求第1页前2笔
  //用httpClient的get方法
  getUseHttpClientGetMethod() {
    const params = new HttpParams().set('_page', "1").set('_limit', "2");
    this.customersObservable = this.httpClient.get<Customer[]>(this.webAPIUrl, { params });
  }
  //=========使用htttpClient的request() API请求数据。
  GetCustomerByHttpClient_RequestMethod_withParaFromString() {
    const params = new HttpParams({ fromString: '_page=1&_limit=1' });

    this.customersObservable = this.httpClient
      .request<Customer[]>("GET", this.webAPIUrl,
      {
        responseType: "json",
        params
      });
  }
  //=========插入客制HTTP Headers 到请求
  GetCustomerWithHttpHeaders() {
    const headers = new HttpHeaders().set("X-CustomHttpHeader", "CUSTOM_VALUE");
    this.customersObservable = this.httpClient.get<Customer[]>(this.webAPIUrl, { headers });
  }
  //==========发送 HTTP PUT 请求。用户替换对象
  PutWithPara() {
    this.httpClient.put(this.webAPIUrl+"/1",
      {
        "name": "NewCustomer001",
        "email": "newcustomer001@email.com",
        "tel": "0000252525"
      })
      .subscribe(
      data => {
        console.log("PUT Request is successful ", data);
      },
      error => {
        console.log("Rrror", error);
      }
      );
      this.customersObservable = this.httpClient
        .get<Customer[]>(this.webAPIUrl);
  }
  //===============发送 HTTP PATCH 请求。用于更新
  PatchWithPara() {
    this.httpClient.patch(this.webAPIUrl+"/1",
      {
        "email": "newcustomer001@email.com"
      })
      .subscribe(
      data => {
        console.log("PUT Request is successful ", data);
      },
      error => {
        console.log("Error", error);
      }
      );
      this.customersObservable = this.httpClient
        .get<Customer[]>(this.webAPIUrl);
  }
  //===============发送 HTTP DELETE 请求。用于删除
  DeleteWithPara() {
    this.httpClient.delete(this.webAPIUrl+"/1")
      .subscribe(
      data => {
        console.log("PATCH Request is successful ", data);
      },
      error => {
        console.log("Error", error);
      }
      );
      this.customersObservable = this.httpClient
        .get<Customer[]>(this.webAPIUrl);
  }
  //===============发送 POST PATCH 请求。 HTTP POST方法有很多用途，但最常见的用例是当我们需要在服务器上添加新的数据时，我们举一个例子，在Rest API服务器数据库中添加一个新客户：
  PostWithPara() {
    this.httpClient.post(this.webAPIUrl,
      {
        "name": "Customer004",
        "email": "customer004@email.com",
        "tel": "0000252525"
      })
      .subscribe(
      data => {
        console.log("POST Request is successful ", data);
      },
      error => {
        console.log("Error", error);
      }
      );
      this.customersObservable = this.httpClient
        .get<Customer[]>(this.webAPIUrl);
  }
}