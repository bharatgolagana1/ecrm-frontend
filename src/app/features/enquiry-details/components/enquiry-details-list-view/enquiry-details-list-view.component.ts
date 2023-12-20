import { Component, ViewChild } from '@angular/core';
import {
  PageChangeEvent,
  PagerNumericButtonsComponent,
} from '@progress/kendo-angular-pager';
import { ActivatedRoute, Router } from '@angular/router';
import { EnquiryDetailsService } from '../../enquiry-details.service';
interface EnquiryList {
  dealNo: string;
  enqID: number;
  soldToLEID: number;
  soldToLE: string;
  enqStatusId: number;
  enqStatus: string;
  salesExecutiveID: number;
  salesExecutive: string;
  soldToContact: string;
  wsApprovalPendingWith: string;
}
@Component({
  selector: 'app-enquiry-details-list-view',
  templateUrl: './enquiry-details-list-view.component.html',
  styleUrls: ['./enquiry-details-list-view.component.scss'],
})
export class EnquiryDetailsListViewComponent implements OnInit {
  contactCards: EnquiryList[] = [];

  ngOnInit() {
    this.enquiryDetailService.getEnquirylist().subscribe((data: any) => {
      console.log(data);
      this.contactCards = data;
    });
  }
  searchTerm = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private enquiryDetailService: EnquiryDetailsService
  ) {}

  filteredCards() {
    return this.contactCards.filter(
      a =>
        a?.dealNo?.toLowerCase().includes(this.searchTerm?.toLowerCase()) ||
        a?.soldToContact
          ?.toLowerCase()
          .includes(this.searchTerm?.toLowerCase()) ||
        a?.soldToLE?.toLowerCase().includes(this.searchTerm?.toLowerCase())
    );
  }

  @ViewChild('pager', { static: false })
  pager!: PagerNumericButtonsComponent;
  public skip = 0;
  public pageSize = 1;

  public onPageChange(e: PageChangeEvent): void {
    this.skip = e.skip;
    this.pageSize = e.take;
    // this.pager.pageChooserLabel;
  }

  navigateById(id: string | number) {
    this.router.navigate(['/enquiry-update', `${id}`]);
  }

  contactcards = [
    {
      id: 1,
      number: '#3D09A',
      solddetails: ' Ravichandran Venugopal',
      soldsite: 'ENOC Processing Company LLC- Dubai',
    },
    {
      id: 2,
      number: '#3D09B',
      solddetails: ' Ravichandran Venugopal',
      soldsite: 'ENOC Processing Company LLC- Dubai',
    },
    {
      id: 3,
      number: '#3D09C',
      solddetails: ' Ravichandran Venugopal',
      soldsite: 'ENOC Processing Company LLC- Dubai',
    },
  ];
}
