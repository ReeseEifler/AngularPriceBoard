import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { CommoditiesListComponent } from './components/commodities-list/commodities-list.component';
import { StoreModule } from '@ngrx/store';
import { simpleReducer } from './reducers/simple.reducer';
import { commodityReducer } from './reducers/commodity.reducer'
import { CommodityComponent } from './components/commodity/commodity.component';

@NgModule({
  declarations: [
    AppComponent,
    CommoditiesListComponent,
    CommodityComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule,
    StoreModule.forRoot({ 
      commodity: commodityReducer,
      message: simpleReducer 
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
