import { NgModule } from '@angular/core';

// Import all Kendo UI components here
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { InputsModule, TextBoxModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { LabelModule } from '@progress/kendo-angular-label';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { NotificationModule } from '@progress/kendo-angular-notification';

@NgModule({
  imports: [
    ButtonsModule,
    GridModule,
    DatePickerModule,
    ReactiveFormsModule,
    LayoutModule,
    InputsModule,
    TextBoxModule,
    DropDownsModule,
    InputsModule,
    LabelModule,
    IndicatorsModule,
    NotificationModule,
    // Add more Kendo UI modules here
  ],
  exports: [
    ButtonsModule,
    GridModule,
    DatePickerModule,
    LayoutModule,
    InputsModule,
    TextBoxModule,
    DropDownsModule,
    InputsModule,
    LabelModule,
    IndicatorsModule,
    NotificationModule,
    // Export all Kendo UI modules here
  ],
})
export class KendoModule {}
