import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AgGridModule } from 'ag-grid-angular'
import { AppComponent } from './app.component'
import { CommoditiesListComponent } from './components/commodities-list/commodities-list.component';
import { StoreModule } from '@ngrx/store'
import { commoditiesListReducer } from './reducers/commodities-list.reducer'

@NgModule({
  declarations: [
    AppComponent,
    CommoditiesListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule,
    StoreModule.forRoot({ 
      commodities: commoditiesListReducer,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
