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
  plansubscriptionid;
  rzp1: any;
  subscriptionPlanId;
  currentselectedPlans;
  currentSubscprionId;
  constructor(
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.loadData();
    console.log(this.authService.instituteProfile.name);

  }
  /**
   * fetches the subscription from 
   */
  loadData(): void {

    // this.apiService.doGetRequest(endPoints.Get_subscriptionOrderInstitute + this.instituteId).subscribe((returnData: any) => {
    //   if (returnData.data.length > 0) {
    //     this.currentSubscription = returnData.data[returnData.data.length - 1];
    //     console.log(this.currentSubscription);
    //   }
    // });
    this.apiService.doGetRequest('payment/subscription/institute/'+this.instituteId).subscribe((returnData: any) => {
      this.currentselectedPlans = returnData['data'][0];
      console.log(this.currentselectedPlans);
    });

    this.apiService.doGetRequest('plans/allTier').subscribe((returnData: any) => {
      this.planList = returnData['result'];
      console.log(this.planList);
      this.planList.map(x =>{
        if(this.currentselectedPlans !=null)
        {
          if(x.item.id === this.currentselectedPlans?.SubscriptionTierId)
          {
            x.planchoosed = "SELECTEDPLAN"
          }
          else{
            x.planchoosed = "NOTSELECTEDPLAN"
          }
        }
        else{
          x.planchoosed = "NOTSELECTEDPLAN"
        }
       
      })
    });

   
    // this.apiService.doGetRequest(`packages`).subscribe((returnData: any) => {
    //   this.planList = returnData.data;
    //   console.log(this.planList);
    // });

    // this.apiService.doGetRequest(endPoints.GetInstituteInfo + this.instituteId).subscribe((returnData: any) => {
    //   this.instituteDetails = returnData.data;
    //   console.log(this.instituteDetails);
    // });
  }

  /**
   * Initializing the payment
   */
  placeOrder(product) {
    this.plansubscriptionid = product?.item?.razorPayPlanId;
    // console.log(product);

    const subscriptionObj = {
      SubscriptionTierId: product.item.id,
      instituteId: this.instituteId,
      razorpayPlan_id: product?.plans?.id

    }
    // console.log(subscriptionObj);

    // console.log(subscriptionObj)
    // this.apiService.doPostRequest('payment/subscription/create', subscriptionObj).subscribe((returnData: any) => {
    //   this.createdSuscription = returnData.data

    //   const that = this;
    //   var options = {
    //     "key": "rzp_test_J7wOs0sSPhfvXU",
    //     "name": "Nspot",
    //     "description": product.plan.name,
    //     "subscription_id": this.createdSuscription.razorpaySubscription_id,
    //     "handler": function (response) {
    //       console.log(response)
    //       that.paymentSuccess(response)
    //     },
    //     "prefill": {
    //       "name": this.instituteId.name,
    //       "email": this.instituteDetails.email,
    //       "contact": this.instituteDetails.officialMobile
    //     },
    //     "notes": {
    //       "address": "NSPOT CONSULTANCY SERVICES PRIVATE LIMITED 39/2475-B1, Suite#118 LR Towers, SJRRA 104, S Janatha Rd, Palarivattom, Kochi, Kerala 682025"
    //     },
    //     "theme": {
    //       "color": "#1a4d59"
    //     }
    //   };

    //   var rzp1 = new Razorpay(options);
    //   rzp1.on('payment.failed', function (response) {
    //     that.paymentFailed(response)
    //   });

    //   rzp1.open();

    // }, error => {
    //   console.error(error);

    // });
    this.apiService.doPostRequest('payment/subscription/create', subscriptionObj).subscribe((returnData: any) => {
      this.createdSuscription = returnData.data;
      this.subscriptionPlanId = this.createdSuscription.id;
      console.log(this.subscriptionPlanId);
     
      // this.currentSubscprionId 
      const that = this;
      var options = {
        "key": "rzp_test_J7wOs0sSPhfvXU",
        "name": "Nspot",
        "description": product.item?.name,
        // "subscription_id": "item_IPnql3ZSsMnjEL",
        "subscription_id": this.createdSuscription.razorpaySubscription_id,
        "amount": product?.plans?.item?.amount * 100,

        "handler": function (response) {
          console.log(response)
          that.paymentSuccess(response)
        },
        "prefill": {
          "name": this.authService.instituteProfile.name,
          "email": this.authService.instituteProfile.email,
          "contact": this.authService.instituteProfile.officialMobile
        },
        "notes": {
          "address": "NSPOT CONSULTANCY SERVICES PRIVATE LIMITED 39/2475-B1, Suite#118 LR Towers, SJRRA 104, S Janatha Rd, Palarivattom, Kochi, Kerala 682025"
        },
        "theme": {
          "color": "#1a4d59"
        }
      }
      console.log(options);

      this.rzp1 = (window as any).Razorpay(options);
      this.rzp1.open();
      this.rzp1.on('payment.failed', function (response) {
        console.log(response);
        this.paymentFailed(response)

      });
    })
  }

  paymentSuccess(successRespose) {
    console.log(this.subscriptionPlanId);
    

    if(this.currentselectedPlans != null )
    {
      // this.currentselectedPlans.id
      let request = {
        "instituteSubscriptionId":this.currentselectedPlans.id,
        "reason":"New plan Selected"
      }
     this.apiService.doPostRequest('payment/subscription/cancel',request).subscribe(
       data =>{
        const subscriptionObj = {
          razorpay_payment_id: successRespose.razorpay_payment_id,
          razorpay_signature: successRespose.razorpay_signature,
          instituteSubscriptionId: this.subscriptionPlanId
        }
        this.apiService.doPostRequest(endPoints.Confirm_subscriptionOrder, subscriptionObj).subscribe((returnData: any) => {
          this.toastr.success("subscription success")
          console.log(returnData);
          
        
        })
       }
     )
    }
    else{
      const subscriptionObj = {
        razorpay_payment_id: successRespose.razorpay_payment_id,
        razorpay_signature: successRespose.razorpay_signature,
        instituteSubscriptionId: this.subscriptionPlanId
      }
      this.apiService.doPostRequest(endPoints.Confirm_subscriptionOrder, subscriptionObj).subscribe((returnData: any) => {
        this.toastr.success("subscription success")
        console.log(returnData);
        
      
      })
    }
    
  }
  paymentFailed(failedRespose) {
    console.log(failedRespose)
    const subscriptionObj = {
      instituteSubscriptionId: this.plansubscriptionid,
      reason: failedRespose.reason
    }
    this.apiService.doPostRequest(endPoints.Cancel_subscriptionOrder, subscriptionObj).subscribe((returnData: any) => {
      this.toastr.error("subscription failed")
    })
  }

}

