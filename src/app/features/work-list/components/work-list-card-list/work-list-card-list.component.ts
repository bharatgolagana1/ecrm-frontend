import { Component, OnInit } from '@angular/core';

import  customerCards from '../../data/mock.json'
type customerCards = {
  avatar: string;
  customerid: string;
  applicationcode: string;
  customername: string;
  companyname?: string;

}   
@Component({
  selector: 'app-work-list-card-list',
  templateUrl: './work-list-card-list.component.html',
  styleUrls: ['./work-list-card-list.component.scss']
})

export class WorkListCardListComponent implements OnInit  {
  customerCardsList!:customerCards[]
    ngOnInit(): void {
      console.log("customer", customerCards)
      this.customerCardsList = [customerCards.customerCards][0]
      console.log("", this.customerCardsList)
    }
   
}

    