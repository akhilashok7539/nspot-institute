import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { endPoints } from '../../config/endPoints';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

declare var Razorpay: any;
@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})

export class PricingComponent implements OnInit {
  planList;
  instituteId = this.authService.instituteProfile.id;
  instituteDetails
  createdSuscription;
  currentSubscription
  constructor(
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }
  /**
   * fetches the subscription from 
   */
  loadData(): void {

    this.apiService.doGetRequest(endPoints.Get_subscriptionOrderInstitute + this.instituteId).subscribe((returnData: any) => {
      if (returnData.data.length > 0) {
        this.currentSubscription = returnData.data[returnData.data.length - 1];
        console.log(this.currentSubscription);
      }

    });

    this.apiService.doGetRequest(endPoints.Get_plans + 'national_boards').subscribe((returnData: any) => {
      this.planList = returnData.data;
      console.log(this.planList);
    });

    this.apiService.doGetRequest(endPoints.GetInstituteInfo + this.instituteId).subscribe((returnData: any) => {
      this.instituteDetails = returnData.data;
      console.log(this.instituteDetails);
    });
  }

  /**
   * Initializing the payment
   */
  placeOrder(product) {
    const subscriptionObj = {
      subscriptionPlanId: product.id,
      instituteId: this.instituteId,
      razorpayPlan_id: product.plan.id
    }
    console.log(subscriptionObj)
    this.apiService.doPostRequest(endPoints.Create_subscriptionOrder, subscriptionObj).subscribe((returnData: any) => {
      this.createdSuscription = returnData.data

      const that = this;
      var options = {
        "key": environment.RAZORPAY_KEY_ID,
        "name": "Nspot",
        "description": product.plan.name,
        "subscription_id": this.createdSuscription.razorpaySubscription_id,
        "handler": function (response) {
          console.log(response)
          that.paymentSuccess(response)
        },
        "prefill": {
          "name": this.instituteId.name,
          "email": this.instituteDetails.email,
          "contact": this.instituteDetails.officialMobile
        },
        "notes": {
          "address": "NSPOT CONSULTANCY SERVICES PRIVATE LIMITED 39/2475-B1, Suite#118 LR Towers, SJRRA 104, S Janatha Rd, Palarivattom, Kochi, Kerala 682025"
        },
        "theme": {
          "color": "#1a4d59"
        }
      };

      var rzp1 = new Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        that.paymentFailed(response)
      });

      rzp1.open();

    }, error => {
      console.error(error);

    });
  }

  paymentSuccess(successRespose) {
    const subscriptionObj = {
      razorpay_payment_id: successRespose.razorpay_payment_id,
      razorpay_signature: successRespose.razorpay_signature,
      instituteSubscriptionId: this.createdSuscription.id
    }
    this.apiService.doPostRequest(endPoints.Confirm_subscriptionOrder, subscriptionObj).subscribe((returnData: any) => {
      alert("subscription success")
    })
  }
  paymentFailed(failedRespose) {
    console.log(failedRespose)
    const subscriptionObj = {
      instituteSubscriptionId: this.createdSuscription.id,
      reason: failedRespose.reason
    }
    this.apiService.doPostRequest(endPoints.Cancel_subscriptionOrder, subscriptionObj).subscribe((returnData: any) => {
      alert("subscription failed")
    })
  }

}

