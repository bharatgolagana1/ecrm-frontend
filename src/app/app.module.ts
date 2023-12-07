import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './features/login/login.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { WorkListModule } from './features/work-list/work-list.module';
import { KendoModule } from './kendo.module';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { EnquiryDetailsModule } from './features/enquiry-details/enquiry-details.module';
import { HttpClientModule } from '@angular/common/http';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { LoginService } from './features/login/components/login/login.service';
import { NotificationService } from './core/services/notification.service';
import { LoaderService } from './core/services/loader.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    DashboardModule,
    KendoModule,
    HttpClientModule,
    IndicatorsModule,
    NotificationModule,
    LayoutModule,
    EnquiryDetailsModule,
  ],
  providers: [LoginService, NotificationService, LoaderService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
