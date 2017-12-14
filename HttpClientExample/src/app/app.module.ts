import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { AlertModule } from 'ngx-bootstrap';
//https://stackoverflow.com/questions/37649164/how-to-add-bootstrap-to-an-angular-cli-project
//angular-cli 项目引入bootstrap步骤
 /*
**IMPORTANT UPDATE: ng2-bootstrap 已被 ngx-bootstrap替代 **
ngx-bootstrap 支持 angular 3 和 4.

Update : 1.0.0-beta.11-webpack or above versions

检查angular-cli版本: ng -v
如果angular-cli版本打印1.0.0-beta.11-webpack 按以下步骤:
1，安装 ngx-bootstrap 和 bootstrap:
npm install ngx-bootstrap bootstrap --save
以上会安装最新版bootstrap，记住：ngx-bootstrap supports Angular3和4.

2，修改 src/app/app.module.ts，根据需要导入所需。
import { AlertModule } from 'ngx-bootstrap';
...
@NgModule({
...
imports: [AlertModule.forRoot(), ... ],
... 
})
3，打开 angular-cli.json 并在style中加入bootstrap样式：_bootstrap@3.3.7@bootstrap为安装后的文件夹
  "styles": [
"styles.css",
"../node_modules/_bootstrap@3.3.7@bootstrap/dist/css/bootstrap.min.css"
],
4，修改 src/app/app.component.html 根据需要引用bootstrap
<alert type="success">hello</alert>
 */


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AlertModule.forRoot()
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
