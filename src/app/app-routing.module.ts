import { NgModule } from '@angular/core';
import { AuthGuard } from './guards/auth.guard'
import { UserTypeGuard } from './guards/user-type.guard'

import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { InnerLayoutComponent } from './Layout/inner-layout/inner-layout.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { AddCourseComponent } from './Pages/add-course/add-course.component';
import { OuterLayoutComponent } from './Layout/outer-layout/outer-layout.component';
import { ContactUsComponent } from './Pages/contact-us/contact-us.component';
import { PostCourseComponent } from './Pages/post-course/post-course.component';
import { Signup2TwoComponent } from './Pages/signup2-two/signup2-two.component';
import { Signup3ThreeComponent } from './Pages/signup3-three/signup3-three.component';
import { Signup4FourComponent } from './Pages/signup4-four/signup4-four.component';
import { CourseListedComponent } from './Pages/course-listed/course-listed.component';
import { StudetntListComponent } from './Pages/studetnt-list/studetnt-list.component';
import { AdmissionOfficersComponent } from './Pages/admission-officers/admission-officers.component';
import { CustomApplicationComponent } from './Pages/custom-application/custom-application.component';
import { BankInfoComponent } from './Pages/bank-info/bank-info.component';
import { PricingComponent } from './Pages/pricing/pricing.component';
import { AddAdmissionOfficerComponent } from './Pages/admission-officers/add-admission-officer/add-admission-officer.component';
import { GalleryComponent } from './Pages/gallery/gallery.component';
// import { AddAptitudeTestComponent } from './Pages/aptitude-test/add-aptitude-test/add-aptitude-test.component';
// import { ViewAptitudeTestComponent } from './Pages/aptitude-test/view-aptitude-test/view-aptitude-test.component';
import { CourseStep1Component } from './Pages/post-course/course-step1/course-step1.component';
import { AptitudeTestComponent } from './Pages/aptitude-test/aptitude-test.component';
import { CourseStep2Component } from './Pages/post-course/course-step2/course-step2.component';
import { CourseStep3Component } from './Pages/post-course/course-step3/course-step3.component';
import { CourseStep4Component } from './Pages/post-course/course-step4/course-step4.component';
import { AdmissionDeskComponent } from './Pages/admission-desk/admission-desk.component';
import { DetailedApplicationComponent } from './Pages/admission-desk/detailed-application/detailed-application.component';
import { FormsComponent } from './Pages/forms/forms.component';
import { ViewCourseComponent } from './Pages/view-course/view-course.component';
import { EditInstitutekycInfoComponent } from './Pages/edit-institutekyc-info/edit-institutekyc-info.component';
import { UpdateCourseInfoComponent } from './Pages/update-course-info/update-course-info.component';
import { CompletedStudnetListComponent } from './Pages/completed-studnet-list/completed-studnet-list.component';
import { PaymentHistoryComponent } from './Pages/payment-history/payment-history.component';
import { UpdateVirtualTourComponent } from './Pages/update-virtual-tour/update-virtual-tour.component';
import { UpdateBoardofcouncilComponent } from './Pages/update-boardofcouncil/update-boardofcouncil.component';
import { UpdateDownloadComponent } from './Pages/update-download/update-download.component';
import { UpdateHostelinfoComponent } from './Pages/update-hostelinfo/update-hostelinfo.component';
import { UploadRecepitComponent } from './Pages/upload-recepit/upload-recepit.component';
import { DownloadDocumentsComponent } from './Pages/download-documents/download-documents.component';
import { InfrastructureEditComponent } from './Pages/infrastructure-edit/infrastructure-edit.component';
import { InstituteTravelEditComponent } from './Pages/institute-travel-edit/institute-travel-edit.component';
import { AddAdmisionNumberComponent } from './Pages/add-admision-number/add-admision-number.component';
import { ConfirmationLetterComponent } from './Pages/confirmation-letter/confirmation-letter.component';

const routes: Routes = [
  {
    path: '',
    component: OuterLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', component: LoginComponent },
      { path: 'contact-us', component: ContactUsComponent },
    ],
  },
  {
    path: 'signup',
    component: OuterLayoutComponent,
    children: [
      // { path: '', component: SignupComponent },
      { path: 'step-2', component: Signup2TwoComponent },
      { path: 'step-3/:instituteId', component: Signup3ThreeComponent },
      { path: 'step-4/:instituteId', component: Signup4FourComponent },
    ],
  },
  {
    path: 'institute',
    component: InnerLayoutComponent,
    canActivate: [AuthGuard, UserTypeGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'gallery', component: GalleryComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'post-a-course', component: PostCourseComponent },
      { path: 'post/course', component: CourseStep1Component },
      { path: 'post/course/step-2/:courseId', component: CourseStep2Component },
      { path: 'post/course/step-3/:courseId', component: CourseStep3Component },
      { path: 'post/course/step-4/:courseId', component: CourseStep4Component },
      { path: 'courses-listed', component: CourseListedComponent },
      { path: 'admission-desk', component: AdmissionDeskComponent },
      { path: 'admission-desk/detailed-application-view/:applicationId', component: DetailedApplicationComponent },
      { path: 'admission-register-list', component: StudetntListComponent },
      { path: 'admission-officer', component: AdmissionOfficersComponent },
      {
        path: 'admission-officer/add',
        component: AddAdmissionOfficerComponent,
      },
      { path: 'customize-application', component: CustomApplicationComponent },
      { path: 'forms', component: FormsComponent },
      { path: 'viewcourse', component: ViewCourseComponent },
      { path: 'bank-info', component: BankInfoComponent },
      { path: 'pricing', component: PricingComponent },
      { path: 'aptitude-test/view', component: AptitudeTestComponent },
      { path: 'edit-institute/:id', component: EditInstitutekycInfoComponent },
      { path: 'edit-course/:id', component: UpdateCourseInfoComponent },
      { path: 'studentList', component: CompletedStudnetListComponent },
      { path: 'paymentHistory', component: PaymentHistoryComponent },
      { path: 'update-virtualtour', component: UpdateVirtualTourComponent },
      { path: 'update-counicl', component: UpdateBoardofcouncilComponent },
      { path: 'update-downloads', component: UpdateDownloadComponent },
      { path: 'update-hostel', component: UpdateHostelinfoComponent },
      { path: 'upload-receipt/:id', component: UploadRecepitComponent },
      { path: 'download-documents', component: DownloadDocumentsComponent },

      { path: 'infrastructure-edit', component: InfrastructureEditComponent },
      { path: 'travelinfo-edit', component: InstituteTravelEditComponent },
      { path: 'add-admissionnumber', component: AddAdmisionNumberComponent },

      { path: 'view-receipt/:applicationId', component: ConfirmationLetterComponent },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
