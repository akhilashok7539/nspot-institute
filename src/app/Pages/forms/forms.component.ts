import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { ApplicationFormService } from 'src/app/services/application-form.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  public form: FormGroup;
  personalInfoArray1:any =[];
  unsubcribe: any
  config = [
    {
      type: 'input',
      label: 'Full name',
      name: 'name',
      placeholder: 'Enter your name',
    },
    {
      type: 'select',
      label: 'Favourite food',
      name: 'food',
      options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
      placeholder: 'Select an option',
    },
    {
      label: 'Submit',
      name: 'submit',
      type: 'button',
    },
  ];
  instituteId = this.authService.userProfile.userId;
  constructor(  private applicationFormService: ApplicationFormService,
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute) { 
      this.instituteId = this.authService.userProfile.userId;
    }

  ngOnInit(): void {
    this.loadNewFields();
    // this.form =this.createGroup();
    // console.log(this.form.value);
  }
  createGroup() {
    const group = this.formBuilder.group({});
    this.personalInfoArray1.forEach(el=>{
      group.addControl(el.fieldName, this.formBuilder.control(""))
    });
    return group;
    
    
  }
  loadNewFields(){
    this.apiService.doGetRequest(`applicationForm/getAdditional/`+ this.instituteId + '/personalInfo').subscribe((returnData: any) => {

       this.personalInfoArray1 = returnData['data'];
      
        // this.personalInfoArray1.forEach(element => {
        //     console.log(element.fieldName);
        //     this.arr1.push(element.fieldName)
        // });
        // console.log(this.arr1);
        
        // this.arr1.map(field =>{
        //   this.arrayItems.push({ title: field });
        //   this.demoArray.push(this.formBuilder.control(true));
        // })

        // let group = {}
        // this.personalInfoArray1.forEach(element => {
        //   group[element.fieldName] =new FormControl(true);
        // });
        // this.form.value['personalInfo'] = new FormGroup(group)
        // console.log(this.form.value);
        

    }, error => {
      console.error(error);
    });

  }
  getFields() {
    return this.personalInfoArray1;
  }

  ngDistroy() {
    this.unsubcribe();
  }
}
