import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutePaths } from './core/Constants';
import { EnquiryDetailsComponent } from './features/enquiry-details/components/enquiry-details/enquiry-details.component';
import { LoginComponent } from './features/login/components/login/login.component';
import { DashboardComponent } from './features/dashboard/components/dashboard/dashboard.component';
import { CalendarComponent } from './features/service-calendar/components/calendar/calendar.component';
import { WorksheetDetailsComponent } from './features/worksheet/components/worksheet-details/worksheet-details.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRoutePaths.Empty,
  },
  {
    path: AppRoutePaths.Login,
    component: LoginComponent,
    loadChildren: () =>
      import('./features/login/login.module').then(m => m.LoginModule),
  },
  {
    path: AppRoutePaths.Dashboard,
    component: DashboardComponent,
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        m => m.DashboardModule
      ),
  },
  {
    path: AppRoutePaths.EnquiryDetails,
    component: EnquiryDetailsComponent,
    loadChildren: () =>
      import('./features/enquiry-details/enquiry-details.module').then(
        m => m.EnquiryDetailsModule
      ),
  },
  {
    path: AppRoutePaths.WorkList,
    loadChildren: () =>
      import('./features/work-list/work-list.module').then(
        m => m.WorkListModule
      ),
  },
  {
    path: AppRoutePaths.ServiceCalendar,
    component: CalendarComponent,
    loadChildren: () =>
      import('./features/service-calendar/service-calendar.module').then(
        m => m.ServiceCalendarModule
      ),
  },
  {
    path: AppRoutePaths.WorksheetDetails,
    component: WorksheetDetailsComponent,
    loadChildren: () =>
      import('./features/worksheet/worksheet.module').then(
        m => m.WorksheetModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
