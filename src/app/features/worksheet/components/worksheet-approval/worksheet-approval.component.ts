import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { StepperComponent, SelectEvent  } from '@progress/kendo-angular-layout';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { fileDataIcon, downloadIcon} from '@progress/kendo-svg-icons';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { WorksheetService, EnquiryDetails, WorkSheetSO, EnquiryProductsSO, ConfigItems, WorksheetPrerequisites } from '../../worksheet.service';
import { LoginService } from 'src/app/features/login/components/login/login.service';
import { EnquiryDetailsService } from 'src/app/features/enquiry-details/enquiry-details.service';

const logoURL = 
"https://raw.githubusercontent.com/fireflysemantics/logo/master/l1.svg";

@Component({
  selector: 'app-worksheet-approval',
  templateUrl: './worksheet-approval.component.html',
  styleUrls: ['./worksheet-approval.component.scss']
})

export class WorksheetApprovalComponent{
  currentStep!: number;
  showAPILoader = false;
  loaderMessage!: string;
  invalid = false;
  isCreditExposureSelected: boolean = false;
  isPriceDetailsSelected: boolean = false;
  public worksheetDetailsCard: WorkSheetSO[] = [];
  @ViewChild('stepper', { static: true })
  public stepper!: StepperComponent;
  test: any;
  enqId!: number;
  docSrcTypeWSAttachment: number = 658;
  drqStatusBackgroundColor: string = "";
  enquiryDetailsCard: EnquiryDetails[] = [];
  gridData: any[] = [];
  productItems: EnquiryProductsSO[] = [];
  configItems: ConfigItems[] = [];
  WorksheetPrerequisites: WorksheetPrerequisites[] = [];

  public steps = [
    {
      label: 'Worksheet Details',
      svgIcon: fileDataIcon,
    },
    {
      label: 'Credit Exposure',
      svgIcon: fileDataIcon,
    },
    {
      label: 'Downloads',
      svgIcon: downloadIcon,
    },
    {
      label: 'Price Details',
      svgIcon: fileDataIcon,
    },
  ];
  current: any;

  WorksheetApprovalForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private worksheetService: WorksheetService,
    private loginService: LoginService,
    private enquiryDetailsService: EnquiryDetailsService
  ) {
    this.matIconRegistry.addSvgIcon(
      'worksheet_invoice',
      this.domSanitizer.bypassSecurityTrustResourceUrl('worksheet-invoice-icon.svg')
    );
    this.matIconRegistry.addSvgIconLiteral('thumbs-up', this.domSanitizer.bypassSecurityTrustHtml(logoURL));
  }

  ngOnInit(): void {
    this.loaderMessage = "";
    this.loaderService.loaderState.subscribe(res => {
      this.showAPILoader = res;
    });
    this.loaderService.hideLoader();
    this.loaderService.loaderState.subscribe(res => {
      this.showAPILoader = res;
    });
    const enqIdString = this.route.snapshot.paramMap.get('id');
    if (enqIdString !== null) {
      const idNumber: number = parseInt(enqIdString, 10);
      this.enqId = idNumber;   
    }
    this.getEnquiryDetails(this.enqId);
    this.getWorksheetDetails(this.enqId);
    this.WorksheetApprovalForm = this.formBuilder.group({
      creditExposure: new FormGroup({
      }),
      priceDetails: new FormGroup({
        amComments: new FormControl('', Validators.required),
        smComments: new FormControl('', Validators.required),
        mgmtComments: new FormControl('', Validators.required),
        finComments: new FormControl('', Validators.required),
        wsattachment: new FormControl('', [Validators.nullValidator]),
      })
    });
    this.onCreditExposureClick();
  }

  public get currentGroup(): FormGroup {
    return this.getGroupAt(this.currentStep);
  }

  onStepSelect(event: any): void{
    this.ngOnInit();
  }
  
  public next(): void {
    if (this.currentGroup.valid && this.currentStep !== this.steps.length) {
      this.currentStep += 1;
      return;
    }
    this.currentGroup.markAllAsTouched();
    this.stepper.validateSteps();
  }

  public prev(): void {
    this.currentStep -= 1;
  }

  private getGroupAt(index: number): FormGroup {
    const groups = Object.keys(this.WorksheetApprovalForm.controls).map(
      groupName => this.WorksheetApprovalForm.get(groupName)
    ) as FormGroup[];
    return groups[index];
  }

  drqStatusBgColor(drqStatus: string): string {
    if (drqStatus == "Approved") {
        return "#038a17";
    }
    else if (drqStatus == "Pending") {
      return "#f77800";
    }
    else if (drqStatus == "Rejected") {
      return "#e82a0c";
    }
    else if (drqStatus == "Closed") {
      return "#e82a0c";
    }
    else {
      return "#ffffff";       
    }
  }

  getEnquiryDetails(enqId: number) {
    this.worksheetService.getEnquiryWorksheetlist().subscribe((data: any) => {
      this.enquiryDetailsCard = data.filter(
        (item: any) => item.enqID === enqId
      );
    });
  }

  getWorksheetDetails(enqId: number) {
    this.loaderMessage = "Loading Worksheet..."
    this.loaderService.showLoader();
    this.worksheetService.getWorksheetDetails(enqId).subscribe((data: any) => {
      this.worksheetService.worksheetDetailsCard = data;
      this.worksheetDetailsCard = data;
      this.getWorksheetPrerequisites(this.worksheetService.worksheetDetailsCard[0].enqId);
      this.getPaymentTerms(this.worksheetService.worksheetDetailsCard[0].enqId,this.worksheetService.worksheetDetailsCard[0].workSheetId);
      this.getProductItems(this.worksheetService.worksheetDetailsCard[0].enqId);
      this.getConfigItems(this.worksheetService.worksheetDetailsCard[0].enqId);
      this.getAttachmentDetails(this.worksheetService.worksheetDetailsCard[0].workSheetId.toString());
      this.loaderService.hideLoader();
      this.loaderMessage = "";
    });
  }

  getWorksheetPrerequisites(enqId: number){
    this.worksheetService.getWorksheetPrerequisites(enqId).subscribe((data: any) => {
      this.worksheetService.WorksheetPrerequisites = data;
      this.WorksheetPrerequisites = data;
    });
  }

  getPaymentTerms(enqId: number, worksheetId: number){
    this.worksheetService.getPaymentTerms(enqId,worksheetId).subscribe((data: any) => {
      this.worksheetService.paymentTerms = data;
      this.gridData = data;
    });
  }

  getProductItems(enqId: number){
    this.worksheetService.getProductItems(enqId,this.loginService.employeeId as number).subscribe((data: any) => {
      this.worksheetService.productItems = data;
      this.productItems = data;
    });
  }

  getConfigItems(enqId: number){
    this.worksheetService.getConfigItems(enqId).subscribe((data: any) => {
      this.worksheetService.configItems = data;
      this.configItems = data;
    });
  }

  getAttachmentDetails(wsID: string){
    this.enquiryDetailsService.getAttachmentDetails(wsID, this.docSrcTypeWSAttachment).subscribe((data: any) => {
      if(data!=null){
        this.worksheetService.wsattachments = data;
        console.log('this.worksheetService.attachments',data);
      }
      else{
        this.worksheetService.wsattachments = null;
        console.log('this.worksheetService.attachments',data);
      }
    });
  }

  onCreditExposureClick(){
    this.currentStep = 0;
    this.isCreditExposureSelected = true;
    this.isPriceDetailsSelected = false;
  }

  onPriceDetailsClick(){
    this.currentStep = 1;
    this.isCreditExposureSelected = false;
    this.isPriceDetailsSelected = true;
    console.log('worksheet Details', this.worksheetDetailsCard);
    console.log('worksheet Prereq', this.WorksheetPrerequisites);
  }
  
  approveWorksheet(){
    if (!this.validateComments()) {
      this.WorksheetApprovalForm.markAllAsTouched();
    }
    else if (this.validateComments()) {
      console.log("Worksheet Form", this.WorksheetApprovalForm.value);
      this.loaderMessage = "Approving Worksheet..."
      this.loaderService.showLoader();
      this.worksheetService
      .postApproveEnquiry(this.WorksheetApprovalForm.value, this.enqId)
      .subscribe((data: any) => {
        console.log('on save', data);
        this.loaderService.hideLoader();
        this.loaderMessage = "";
        if (data) {
          const notificationMessage = data.outPut;
          const notificationType = data.outPut.startsWith('Success') || data.outPut.startsWith('Approval') ? 'success' : 'error';
          this.notificationService.showNotification(
            notificationMessage,
            notificationType,
            'center',
            'bottom'
          );
        }
        this.router.navigate(['/worksheet-details']);
      },
      error => {
        this.loaderService.hideLoader();
        this.loaderMessage = "";
        this.notificationService.showNotification(
          error,
          'error', 'center', 'bottom'
        );
      });
      this.worksheetService.resetValues();
    }
    else{
      this.WorksheetApprovalForm.markAllAsTouched();
    }
  }

  saveWorksheet(): void{
      console.log("Worksheet Form", this.WorksheetApprovalForm.value);
      this.loaderMessage = "Saving Worksheet..."
      this.loaderService.showLoader();
      this.worksheetService
        .postSaveEnquiry(this.WorksheetApprovalForm.value, this.enqId)
        .subscribe((data: any) => {
          console.log('on save', data);
          this.loaderService.hideLoader();
          this.loaderMessage = "";
          if (data) {
            const notificationMessage = data.outPut;
            const notificationType = data.outPut.startsWith('Success') ? 'success' : 'error';
            this.notificationService.showNotification(
              notificationMessage,
              notificationType,
              'center',
              'bottom'
            );
          }
          this.router.navigate(['/worksheet-details']);
        },
        error => {
          this.loaderService.hideLoader();
          this.loaderMessage = "";
          this.notificationService.showNotification(
            error,
            'error', 'center', 'bottom'
          );
        });
        this.worksheetService.resetValues();
        this.WorksheetApprovalForm.markAllAsTouched();
  }

  rejectWorksheet(): void{
    // if (!this.WorksheetApprovalForm.valid) {
    //   this.WorksheetApprovalForm.markAllAsTouched();
    // }
    // if (this.WorksheetApprovalForm.valid) {
      console.log("Worksheet Form", this.WorksheetApprovalForm.value);
      this.loaderMessage = "";
      this.loaderService.showLoader();
      this.worksheetService
        .postRejectEnquiry(this.WorksheetApprovalForm.value, this.enqId)
        .subscribe((data: any) => {
          console.log('on save', data);
          this.loaderService.hideLoader();
          this.loaderMessage = "";
          if (data) {
            const notificationMessage = data.outPut;
            const notificationType = data.outPut.startsWith('Success') ? 'success' : 'error';
            this.notificationService.showNotification(
              notificationMessage,
              notificationType,
              'center',
              'bottom'
            );
          }
          this.ngOnInit();
          this.onPriceDetailsClick();
        },
        error => {
          this.loaderService.hideLoader();
          this.loaderMessage = "";
          this.notificationService.showNotification(
            error,
            'error', 'center', 'bottom'
          );
        });
        this.worksheetService.resetValues();
      // }
    this.WorksheetApprovalForm.markAllAsTouched();
  }

  validateComments(): boolean{
    const formvalue = this.WorksheetApprovalForm.value;
    if(this.worksheetDetailsCard[0].currentApprovalLevel == '1' ||  this.worksheetDetailsCard[0].currentApprovalLevel == 'Auto'){
      if(formvalue.priceDetails.amComments === ""){
        this.WorksheetApprovalForm.markAllAsTouched();
        return false;
      }
      else{
        return true;
      }
    }
    else if(this.worksheetDetailsCard[0].currentApprovalLevel == '2'){
      if(formvalue.priceDetails.smComments == ""){
        this.WorksheetApprovalForm.markAllAsTouched();
        return false;
      }
      else{
        return true;
      }
    }
    else if(this.worksheetDetailsCard[0].currentApprovalLevel == '3'){
      if(formvalue.priceDetails.finComments == ""){
        this.WorksheetApprovalForm.markAllAsTouched();
        return false;
      }
      else{
        return true;
      }
    }
    else if(this.worksheetDetailsCard[0].currentApprovalLevel == '4'){
      if(formvalue.priceDetails.mgmtComments == ""){
        this.WorksheetApprovalForm.markAllAsTouched();
        return false;
      }
      else{
        return true;
      }
    }
    return true;
  }

  onBackClickHandle() {
    this.router.navigate(['worksheet-details']);
    this.worksheetService.resetValues();
  }

  onReset() {
    this.ngOnInit();
  }

  onTabSelect(e: SelectEvent): void {
    if(e.index == 0){
      this.onCreditExposureClick();
    }
    else if(e.index == 1){
      this.onPriceDetailsClick();
    }
  }

}
