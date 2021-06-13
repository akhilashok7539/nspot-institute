import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/login/login.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { EmailVerificationComponent } from './Pages/email-verification/email-verification.component';
import { InnerLayoutComponent } from './Layout/inner-layout/inner-layout.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { AddCourseComponent } from './Pages/add-course/add-course.component';
import { OuterLayoutComponent } from './Layout/outer-layout/outer-layout.component';
import { OuterHeaderComponent } from './Layout/outer-layout/outer-header/outer-header.component';
import { OuterFooterComponent } from './Layout/outer-layout/outer-footer/outer-footer.component';
import { InnerHeaderComponent } from './Layout/inner-layout/inner-header/inner-header.component';
import { InnerFooterComponent } from './Layout/inner-layout/inner-footer/inner-footer.component';
import { InnerSidebarComponent } from './Layout/inner-layout/inner-sidebar/inner-sidebar.component';
import { ContactUsComponent } from './Pages/contact-us/contact-us.component';
import { PostCourseComponent } from './Pages/post-course/post-course.component';
import { KycComponent } from './Pages/kyc/kyc.component';
import { Signup3ThreeComponent } from './Pages/signup3-three/signup3-three.component';
import { Signup4FourComponent } from './Pages/signup4-four/signup4-four.component';
import { Signup2TwoComponent } from './Pages/signup2-two/signup2-two.component';
import { GalleryComponent } from './Pages/gallery/gallery.component';
import { FeesInfoComponent } from './Pages/fees-info/fees-info.component';
import { CourseListedComponent } from './Pages/course-listed/course-listed.component';
import { StudentRequestComponent } from './Pages/student-request/student-request.component';
import { StudetntListComponent } from './Pages/studetnt-list/studetnt-list.component';
import { AdmissionOfficersComponent } from './Pages/admission-officers/admission-officers.component';
import { CustomApplicationComponent } from './Pages/custom-application/custom-application.component';
import { BankInfoComponent } from './Pages/bank-info/bank-info.component';
import { PricingComponent } from './Pages/pricing/pricing.component';
import { AddAdmissionOfficerComponent } from './Pages/admission-officers/add-admission-officer/add-admission-officer.component';
import { AptitudeTestComponent } from './Pages/aptitude-test/aptitude-test.component';
import { AddAptitudeTestComponent } from './Pages/aptitude-test/add-aptitude-test/add-aptitude-test.component';
import { ViewAptitudeTestComponent } from './Pages/aptitude-test/view-aptitude-test/view-aptitude-test.component';
import { ControlMessagesComponent } from './components/control-messages/control-messages.component';
import { CourseStep1Component } from './Pages/post-course/course-step1/course-step1.component';
import { CourseStep2Component } from './Pages/post-course/course-step2/course-step2.component';
import { CourseStep3Component } from './Pages/post-course/course-step3/course-step3.component';
import { CourseStep4Component } from './Pages/post-course/course-step4/course-step4.component';
import { CheckboxFormComponent } from './components/checkbox-form/checkbox-form.component';
import { AdditionalFieldsFormComponent } from './components/additional-fields-form/additional-fields-form.component';
import { AdmissionDeskComponent } from './Pages/admission-desk/admission-desk.component';
import { DetailedApplicationComponent } from './Pages/admission-desk/detailed-application/detailed-application.component';
import { environment } from 'src/environments/environment';

const config: SocketIoConfig = { url: environment.baseApiUrl, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    EmailVerificationComponent,
    InnerLayoutComponent,
    DashboardComponent,
    AddCourseComponent,
    OuterLayoutComponent,
    OuterHeaderComponent,
    OuterFooterComponent,
    InnerHeaderComponent,
    InnerFooterComponent,
    InnerSidebarComponent,
    ContactUsComponent,
    PostCourseComponent,
    KycComponent,
    Signup3ThreeComponent,
    Signup4FourComponent,
    Signup2TwoComponent,
    GalleryComponent,
    FeesInfoComponent,
    CourseListedComponent,
    StudentRequestComponent,
    StudetntListComponent,
    AdmissionOfficersComponent,
    CustomApplicationComponent,
    BankInfoComponent,
    PricingComponent,
    AddAdmissionOfficerComponent,
    AptitudeTestComponent,
    AddAptitudeTestComponent,
    ViewAptitudeTestComponent,
    ControlMessagesComponent,
    CourseStep1Component,
    CourseStep2Component,
    CourseStep3Component,
    CourseStep4Component,
    CheckboxFormComponent,
    AdditionalFieldsFormComponent,
    AdmissionDeskComponent,
    DetailedApplicationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
