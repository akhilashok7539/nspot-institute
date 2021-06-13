export const endPoints = {
    login: 'user/login',


    CreateInstitute: 'institute/create',
    createHeilights: 'institute/highlights/create/',
    socialMediaAndVirtualTour: 'institute/virtual-tour/create/',
    Create_galleryItem: 'institute/gallery/create/', // :instituteId
    Create_bankDetails: 'institute/bank-details/create/', // :instituteId
    Create_aptitudeTest: 'institute/aptitude-tests/create/', // :instituteId
    Create_aptitudeQuestion: 'institute/aptitude-tests/', // :testId/create
    UploadProfilePhotoFile: 'institute/UploadProfilePhotoFile/', 

    Create_course: 'institute/course/create/', // :instituteId
    Create_courseFee: 'institute/course/fees/create/', // :instituteCourseId
    Create_admissionOfficer: 'admission-officer/create/',

    Create_subscriptionOrder: 'payment/subscription/create',
    Confirm_subscriptionOrder: 'payment/subscription/confirm',
    Cancel_subscriptionOrder: 'payment/subscription/cancel',
    Get_subscriptionOrderInstitute: 'payment/subscription/institute/', // :instituteId


    //application form related
    Create_additionalField: 'applicationForm/additionalFields/create/',
    Remove_additionalField: 'applicationForm/additionalFields/remove/', // :instituteId/:formSection/:fieldName(key)
    Create_removedField: 'applicationForm/removedFields/create/',
    Remove_removedField: 'applicationForm/removedFields/remove/', // :instituteId/:formSection/:fieldName(key)
    Get_additionalField: 'applicationForm/getAdditional/', // :instituteId/:formSection
    Get_removedField: 'applicationForm/getRemoved/', // :instituteId/:formSection
    Get_applications: 'applicationForm/applications', // ?where[courseId]=12&&where[status]="pre-application-applied"
    Update_applicationForm: 'applicationForm/applications/update',


    GetInstituteInfo: 'institute/',
    Get_socialMedia: 'institute/social-media/', // :instituteId
    Get_virtualTour: 'institute/virtual-tour/', // :instituteId
    Get_highlights: 'institute/highlights/', // :instituteId
    Get_boardOfCouncil: 'institute/board-of-council/', // :instituteId
    Get_gallery: 'institute/gallery/', // :instituteId
    Get_bankDetails: 'institute/bank-details/', // :instituteId
    Get_aptitudeTests: 'institute/aptitude-tests/', // :instituteId
    Get_aptitudeTests_questions: 'institute/aptitude-tests/', // :testId
    Get_admissionOfficer: 'admission-officer/',
    Get_admissionOfficerByInstitute: 'admission-officer/getByInstitute/', // instituteId
    Get_plans: 'plans/byInstituteType/', // instituteNationalityType // international_boards, national_boards,state_boards

    // Common endpoints
    instituteTypes: 'institute-types',
    Get_academicLevels: 'academic-level/',
    Get_licenseAuthorities: 'license-issue-authority/',
    Get_academicLevel_Courses: 'academic-level/courses/', //:accademicLevelId
    Get_courseTypes: 'course-types/',
    Get_universityTypes: 'university-types/',
    Get_paymentTenures: 'payment-tenures/',
    Get_courseStream: 'course-stream/',
    Get_courseStream_specialization: 'course-stream/specialization/', //courseStreamId

    Get_notifications: 'notifications/', //where[userId]
    Update_notifications: 'notifications/update',


    Calculate_NspotFee: 'institute/course/calculate-nspot-fees/', // :totalFee
    Get_courses: 'institute/course/', // ?where[id]=12&&where[status]="pre-application-applied"
    Update_course: 'institute/course/update/', // :courseId
    Validate_OTP: "user/otp/validate", // phoneNumber, otp
    Create_OTP: "user/otp/create" // mobile number
};
