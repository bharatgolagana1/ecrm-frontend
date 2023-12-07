import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { EnquiryDetailsComponent } from './enquiry-details/enquiry-details.component';
import { KendoModule } from 'src/app/kendo.module';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { EnquiryDetailsFormsComponent } from './enquiry-details-forms/enquiry-details-forms.component';
import { EnquiryDescriptionComponent } from './enquiry-description/enquiry-description.component';

@NgModule({
  declarations: [
    EnquiryDetailsComponent,
    ContactDetailsComponent,
    EnquiryDetailsFormsComponent,
    EnquiryDescriptionComponent 
  ],
  imports: [
    CommonModule,
    KendoModule,
    LayoutModule,
  ],
  exports:[EnquiryDetailsComponent,
    ContactDetailsComponent],
    
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  
})
export class EnquiryDetailsModule{ }
