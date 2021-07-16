import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})
export class PaymentHistoryComponent implements OnInit {

  constructor(private router:Router,private apiservice:ApiService) { }

  ngOnInit(): void {
    this.getpaymenthistory()
  }
  upload()
  {

    this.router.navigate(['/institute/upload-receipt'])
  }
  getpaymenthistory()
  {
    this.apiservice.doGetRequest(`applicationForm/applications?where[courseId]=41&&where[applicationStatus]=payment-completed`).subscribe(
      data =>{
        console.log(data);
        
      },
      error =>{

      }
    )
  }
}
