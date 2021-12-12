export const messages = {
    validation: {
        required: 'Required',
        invalidEmailAddress: 'Invalid email address',
        invalidUsername: 'Please enter a valid username',
        invalidPassword: 'Invalid password. Password must be at least 8 characters long, that includes a number and an alphabet.',
        invalidCreditCard: 'Invalid credit card. Please enter valid card number.',
        invalidText: 'Invalid input. Please enter valid characters.',
        invalidNumber: 'Invalid input. Please enter valid number.',
        invalidExpiry: 'Invalid input. Please enter a valid expiry date in YYY/MM format.',
        invalidPhone: 'Invalid phone number',
        invalidUrl: 'Invalid url',
        invalidTextWithCaps: 'First letter must be uppercase',
        invalidCode: 'Must be uppercase and cannot exceed length 2',
        invalidMinSelect: 'Minimum one among the checkboxes should be selected',
        minlength: 'Minimim 10 charactors required',
        maxlength: 'Maximum 10 charactors',
    },
};

export const constants = {
    notificationRefreshRate: 10000,
    chatOnlineCheckRefreshRate: 10000
};


export const scorllNotes = {

    ADDMISSION_APPLICATION_AWAITING : "Important Note: Decisions made while reviewing an admission application are important. Please make sure to do the reviews swiftly and as soon as possible. Accordingly, this will impress the student /Parent and increase the chances of taking admission from your institute.",
    FEE_PAYMENT_AWATING_APPLICATIONS:"Important Note: The admission seat will be confirmed only if the applicant successfully pays the ‘Initial Fee amount’ within 24 hours of pre-approval.",
    FEE_PAYMENT_REMITTED_APPLICATIONS:"Important Note: Upon receiving the initial payment from the student applicant, immediately you have to upload the 'Student receipt with seal'. (Receipt should contain-Institutes name & address, applicant's name, Course name applied, Amount Paid by the applicant, payment date, etc.)Only after the successful upload of the student fee receipt, Nspot initiate payment to the institute bank account.",
    STUDENT_ENROLMENT_REGISTER:"Important Note: Please update the Registration No: / Admission No: as per your records.",
    ADMISSION_OFFICERS:"Important Note: Information entered here should be confidential and never to be shared with anyone especially your Login id or password.",
    CUSTOMISE_ADMISSION_APPLICATION_FORM:"Please note: Tick appropriate fields, to customise the admission application form.",
    POST_YOUR_ADMISSION_SEAT:"Important Note: Please make sure to carefully enter the info regarding  Full course fee, Initial fee to be paid by the student, the Required Eligibility, etc. since these details will be mentioned in the admission confirmation letter sent to the applicant, and change cant be done.",


}

export const alertNotes = {


    ENABLE_ADMISSION_dESK : "Caution:Please make sure you have Customized the Admission Application Form before enabling the Live Admission Desk.",
    DISABLE_ADMISSION_dESK : "Caution:Once disabled, the Admission Seat/Course posted will no longer be visible to the students on the Live Admission Desk. ",
    APPROVE_APPLICATIONS : "Caution:Before approving, please make sure there is a vacant admission seat available for this applicant. Upon approval, a reminder notification is sent to the applicant for collecting the initial fee, instructed by you in the spot admission fee info.",
    REJECT_APPLICATIONS:"Caution:Please mention a reason for rejection of the application, So that the applicant can resubmit with proper eligible documents required for the admission seat.",
    RECEPIT_UPLOADED:"You have successfully uploaded the Student Fee Receipt. Nspot team will soon be transferring the fee payment to the institute bank account after the verification. Thank You!!"
}