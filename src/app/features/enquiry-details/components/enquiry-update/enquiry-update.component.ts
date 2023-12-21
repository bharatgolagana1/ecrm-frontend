import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { EnquiryDetailsService } from '../../enquiry-details.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-enquiry-update',
  templateUrl: './enquiry-update.component.html',
  styleUrls: ['./enquiry-update.component.scss'],
})
export class EnquiryUpdateComponent implements OnInit {
  public currentStep = 3;
  showAPILoader = false;
  invalid=false;
  enquiryUpdate:unknown=[];
  id!: string | null;
  
  constructor(
    private loaderService: LoaderService,
    private router: Router,
    public enquiryDetailsService:EnquiryDetailsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loaderService.loaderState.subscribe(res => {
      this.showAPILoader = res;
    });
  
    this.enquiryDetailsService.getupdateEnqDropdown().subscribe((data:any) => {
      this.dealPositionList = data.filter((item:any) => item.comboType === "DEALPOSITION");
      this.probabilityList = data.filter((item:any) => item.comboType === "PROBABILITY");
      this.enquiryModeList = data.filter((item:any) => item.comboType === "ENQUIRYMODE");
    })
    this.id = this.route.snapshot.paramMap.get('id');
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
  public updateEnquiryForm(): void {
    if(this.enquiryUpdateForm.valid){
      this.enquiryUpdateForm.markAllAsTouched();
    }
    if(this.enquiryUpdateForm){
      this.enquiryDetailsService.updateEnquiryDetails(this.enquiryUpdateForm.value, 1).subscribe((data)=>{
        console.log("after save",data)
        this.loaderService.hideLoader();
      })
      console.log("submit",this.enquiryUpdateForm.value)
    }

    
    this.loaderService.showLoader();
    console.log('loader', this.loaderService.loaderState, this.showAPILoader);
    this.enquiryUpdateForm.markAllAsTouched();
    console.log(this.enquiryUpdateForm.value);
    setTimeout(() => {
      this.loaderService.hideLoader();
      this.router.navigate(['/work-list']);
    }, 3000);
  }

  onReset() {
    this.enquiryUpdateForm.reset();
  }

}
