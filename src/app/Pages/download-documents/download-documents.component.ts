import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-download-documents',
  templateUrl: './download-documents.component.html',
  styleUrls: ['./download-documents.component.css']
})
export class DownloadDocumentsComponent implements OnInit {
  applicationId;
  certificates:any=[];
  arr:any = [];
  listarray:any = [];
  finalArray:any = [];
  SoretedList:any=[];
  constructor(private apiservice:ApiService) { }

  ngOnInit(): void {
    this.applicationId = sessionStorage.getItem("applicationID")
    this.loadData()
  }
  loadData(){
    this.apiservice.doGetRequest(`/applicationForm/applications/files/`+this.applicationId).subscribe(
      data =>{
        console.log(data);
        this.certificates = data['data'];
        let arr = [];
        console.log(Object.keys(this.certificates));
        console.log(Object.values(this.certificates));
       
        this.listarray.push( Object.keys(this.certificates).map(key => (
        
            { type: key, value: this.certificates[key] })
            
            ))
            // console.log(this.listarray);
            this.listarray = this.listarray[0];
            console.log(this.listarray);
            
            this.listarray.forEach(element => {
              if(element.type != "id" && element.type != "createdAt" && element.type != "updatedAt" && element.type != "formId")
              {
                this.finalArray.push(element)

              }
              else
              {
              }
            });
            console.log(this.finalArray);
            for(let j=0;j<this.finalArray.length;j++)
            {
              if(this.finalArray[j].value != null)
              {
                this.SoretedList.push(this.finalArray[j])
              }
            }
      }
    )
  }
  insertSpaces(string) {
    string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
    string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    return string;
}
  download(value)
  {
    window.open("https://nspot-server.herokuapp.com/" + value, '_blank');
  }
}
