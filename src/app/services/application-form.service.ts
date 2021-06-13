import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationFormService {
  public formControls = {
    personalInfo: [
      { label: "Name of Course", key: "courseName", type: "text", attributes: [], validators: ["required"], class: "" },
      { label: "Name of student", key: "studentName", type: "text", attributes: [], validators: ["required"], class: "" },
      { label: "age", key: "age", type: "text", attributes: [], validators: ["required"], class: "" }
    ],
    education: [
      { label: "education Level", key: "educationLevel", type: "text", attributes: [], validators: ["required"], class: "" },
      { label: "School", key: "school", type: "text", attributes: [], validators: ["required"], class: "" }

    ],
    entrance: [
      { label: "Qualified entrance", key: "entranceQualified", type: "text", attributes: [], validators: ["required"], class: "" },
      { label: "roll number", key: "rollNumber", type: "text", attributes: [], validators: ["required"], class: "" },

    ],
    certificates: [
      { label: "Adhar", key: "adharCertificate", type: "text", attributes: [], validators: ["required"], class: "" },
      { label: "Birth cert", key: "birthCertificate", type: "text", attributes: [], validators: ["required"], class: "" },

    ],
  }
  constructor() { }
}
