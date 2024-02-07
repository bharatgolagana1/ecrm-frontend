import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EnquiryDetailsService } from '../../enquiry-details.service';

type SoleToContact = {
  contactID: number;
  contactName: string;
  isContactActive: boolean;
  comboType: string;
  contactEmailID: string;
  leDeptId: number;
  departmentName: string;
  leSiteId: number;
  siteName: string;
};

type SoldToSite = {
  leSiteID: number;
  leSiteName: string;
  isSiteActive: boolean;
  comboType: string;
  leContactID: number;
};

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit {
  public soldToContact: any = [];
  public soldToSite: unknown = [];
  public regionsList: unknown = [];
  public soldToContactList:unknown = [];

  public soldToSiteDefaultValue :{
    contactID: unknown;
    contactName: unknown;
    comboType: string;
    leSiteId: unknown;
    siteName:unknown;
    departmentName: unknown; 
    isContactActive:boolean;
    contactEmailID:unknown;
    leDeptId: unknown
  }| null = null;
  constructor(public enquiryDetailsService: EnquiryDetailsService) {
    this.soldToContact = this.soldToContact.slice();
  }
  ngOnInit(): void {
    this.enquiryDetailsService.getSoldToContactsList().subscribe(data => {
      this.soldToContact = data;
      this.soldToContactList = data;
    });
  }

  handleSoldToContactFilter(contactID: string) {
    if(contactID && contactID.length >= 1){
    this.soldToContact = this.soldToContact.filter(
      (s:SoleToContact) => s.contactName.toLowerCase().indexOf(contactID.toLowerCase())!== -1
    );
  }
  else{
    this.soldToContact = this.soldToContactList
  }
 
}

  @Input()
  public contactDetails!: FormGroup;
  handleSoldToContactChanged(contact: SoleToContact) {
    if (contact && contact?.contactID) {
      this.enquiryDetailsService
        .getSoldToSiteList(contact.contactID)
        .subscribe((res: any) => {
          this.soldToSite = res || '';
  
          if (res && res.length > 0) { 
            this.soldToSiteDefaultValue = {
              contactID: res[0]?.contactID,
              contactName: res[0]?.contactName,
              comboType: 'SOLDTOLESITE',
              leSiteId: res[0]?.leSiteID,
              siteName: res[0]?.lesiteName,
              departmentName: res[0]?.departmentName,
              isContactActive: true,
              contactEmailID: res[0]?.contactEmailID,
              leDeptId: res[0]?.leDeptId
            };
  
            this.contactDetails.patchValue({
              soldToSite: this.soldToSiteDefaultValue.leSiteId
            });

            this.handleSoldToSiteChanged(this.soldToSiteDefaultValue);
          }
        });
    }
  }
  
  handleSoldToSiteChanged(site: any) { 
    this.enquiryDetailsService
      .getRegionFromSiteList(site.leSiteId) 
      .subscribe((res: any) => {
        this.regionsList = res || '';
        this.contactDetails.patchValue({
          region: res[0]?.comboName,
          soldToLE: res[1]?.comboName,
        });
        this.enquiryDetailsService.regionId = res[0]?.comboID;
        this.enquiryDetailsService.leID = res[1]?.comboID;
      });
  }
  

}
