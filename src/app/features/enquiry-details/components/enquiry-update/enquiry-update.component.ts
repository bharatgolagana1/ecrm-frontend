import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { EnquiryDetailsService } from '../../enquiry-details.service';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/features/login/components/login/login.service';
import { valueFrom } from '@progress/kendo-angular-dropdowns/common/util';



@Component({
  selector: 'app-enquiry-update',
  templateUrl: './enquiry-update.component.html',
  styleUrls: ['./enquiry-update.component.scss'],
})
export class EnquiryUpdateComponent implements OnInit {
  public currentStep = 3;
  showAPILoader = false;
  invalid = true;
  id!: string | null;
  poExpectedDate: Date = new Date();
  

 
  constructor(
    private loaderService: LoaderService,
    private router: Router,
    public enquiryDetailsService: EnquiryDetailsService,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    console.log(":current", this.poExpectedDate)
    this.loaderService.loaderState.subscribe(res => {
      this.showAPILoader = res;
    });
    this.enquiryDetailsService.getupdateEnqDropdown().subscribe((data: any) => {
      this.dealPositionList = data.filter(
        (item: any) => item.comboType === 'DEALPOSITION'
      );
      this.probabilityList = data.filter(
        (item: any) => item.comboType === 'PROBABILITY'
      );
      this.enquiryModeList = data.filter(
        (item: any) => item.comboType === 'ENQUIRYMODE'
      );
    });
    
    this.id = this.route.snapshot.paramMap.get('id');
    this.getEnqdetails();
  }
 
 
  getEnqdetails(){
  this.enquiryDetailsService.getEnquiryDetails(this.id).subscribe((res:any) => {
    console.log(res);
    if (this.enquiryUpdateForm.get('dealPosition')) {
      console.log('dealPosition from API:', res[0]?.dealPositionID);
      console.log('Probability from API:',res[0]?.probability)

      this.enquiryUpdateForm.patchValue({
        poExpectedDate: new Date(res[0]?.poExpectedDate),
        dealPosition: res[0]?.dealPosition,
        probability: res[0]?.probability,
        dealValue: res[0]?.dealValue,
        
      });
      
    }
  });
 }


  public step = [
    {
      label: 'Contact Details',
      isValid: true,
    },
    {
      label: 'Enquiry Details',
      isValid: true,
    },
    {
      label: 'Enquiry Description',
      isValid: true,
    },
    {
      label: 'Enquiry Update',
    },
  ];

  public dealPositionList: Array<string> = [];
  public probabilityList: Array<string> = [];
  public enquiryModeList: Array<string> = [];
  public enquiryUpdateForm: FormGroup = new FormGroup({
    poExpectedDate: new FormControl('', Validators.required),
    dealPosition: new FormControl('', Validators.required),
    probability: new FormControl('', Validators.required),
    dealValue: new FormControl('', Validators.required),
    modeOfCommunication: new FormControl('', Validators.required),
    remarksValue: new FormControl('', Validators.required),
    attachment: new FormControl('', Validators.required),
  });
  public async updateEnquiryForm(): Promise<void> {
    if (this.enquiryUpdateForm.valid) {
      this.loaderService.showLoader();
      const updatedBody = await this.handleUpdateEnquiryBody(
        this.enquiryUpdateForm.value,
        1
      );
      console.log('updated body', updatedBody);
      this.enquiryDetailsService
        .updateEnquiryDetails(updatedBody)
        ?.subscribe(data => {
          console.log('after save', data);
          this.loaderService.hideLoader();
          this.router.navigate(['enquiry-listview']);
        });
    }
  }

  async handleUpdateEnquiryBody(formData: any, id: string | number) {
    console.log('formdata', formData);
    return {
      enqID: id,
      remarks: formData.remarksValue,
      probabilityID: formData.probability,
      dealPositionID: formData.dealPosition,
      dealValue: formData.dealValue,
      loginID: this.loginService.employeeId,
      POExpectedDate: formData.poExpectedDate,
      modeOfCommunicationID: formData.modeOfCommunication,
    };
  }

  onReset() {
    this.enquiryUpdateForm.reset();
  }
  handleHistoryButton() {
    this.router.navigate([`/enquiry-details-history/${this.id}`]);
  }
}
