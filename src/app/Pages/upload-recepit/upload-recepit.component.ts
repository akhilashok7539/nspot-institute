import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-upload-recepit',
  templateUrl: './upload-recepit.component.html',
  styleUrls: ['./upload-recepit.component.css']
})
export class UploadRecepitComponent implements OnInit {
  filetypeid;
  multiForm: FormData = new FormData();

  constructor(private router:Router,private activaterouter:ActivatedRoute,private apiservice:ApiService,private toaster:ToastrService) { 
    this.activaterouter.paramMap.subscribe(
      data =>{
        console.log(data['params'].id);
        this.filetypeid=data['params'].id;
      }
    )
  }

  ngOnInit(): void {
  }
  update()
  {
    this.apiservice.doPutRequest('payment/recipt/institute/'+this.filetypeid,this.multiForm).subscribe(
      data =>{
        this.toaster.success("Recepit  Uploaded successfully");
        this.router.navigate(['/institute/admission-desk']);
      },
      error =>{
        this.toaster.error("unable to update Recepit successfully")

      }
    )
  }
  selectedfile(event)
  {
    const file = event.target.files[0];
    this.multiForm.append("transactionRecipt",file);
  }
  
}
