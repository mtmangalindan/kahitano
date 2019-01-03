import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router"
import { LoginService, User } from './login.service';
import { REACTIVE_DRIVEN_DIRECTIVES } from '@angular/forms/src/directives';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})


@Injectable({providedIn: 'root'})
export class AppComponent implements OnInit{

  recordList:any = {};
  account:User;
  billingCycle:string;
  startDate:string;
  endDate:string;
  record:Record;
  records:Array<Record> = [];
  request:Request;
  requests:Array<Request> = [];
  fileContent:string;
  fileName:string;
  
  
  constructor(private http: HttpClient,private router: Router,private loginService: LoginService) {
  }
  
  ngOnInit() {
   /* this.checkLogin();
    if(this.account == null){
      console.log("Not Logged in");  
      this.redirect;   
      
    }
    else{   
        console.log("logged in");     
    }*/
  }


  redirect(){
    window.location.href = 'http://localhost:8081/';
  }

  checkLogin(){
    if(this.loginService.getAuth != null){
      this.loginService.getAuth().subscribe(accountData=>{
        if(accountData != null){
          this.account = accountData;
        }  else{
          this.account = null; 
        }
      })
    }
  }

  save(): Observable<Record[]> {
    return this.http.post<Record[]>("http://localhost:8870/processedRecords" , this.requests );
  }

  saveForm() {
    this.save().subscribe(result => {
       this.records = result;
    }, error => console.error(error));

    console.log(this.records);
  }


  public changeListener(files: FileList){
    
    
    if(files && files.length > 0) {
       let file : File = files.item(0); 
            let reader: FileReader = new FileReader();
            reader.readAsText(file);
            reader.onload = (e) => {
                this.fileName = file.name;
                this.fileContent = reader.result as string; 
                console.log(this.fileContent);
                var contentArray = this.fileContent.split("\n"); 
                for(var i = 0; i < contentArray.length-1; i++){
                  var billingCycle = contentArray[i].split(",")[0];
                  var startDate = contentArray[i].split(",")[1];
                  var endDate = contentArray[i].split(",")[2];
                  
                  this.request = new Request(billingCycle,startDate,endDate);
                  console.log(this.request);
                  this.requests.push(this.request);        
             }
              console.log(this.requests);
          
             this.saveForm();
          }
   
      } 
    }

}
class Request {
    
  billingCycle:string;
  startDate:string;
  endDate:string;

  constructor(billingCycle:string,startDate:string,endDate:string){
      this.billingCycle = billingCycle;
      this.startDate = startDate;
      this.endDate = endDate;     
  }
}

class Record{

  billingCycle:string;
  startDate:string;
  endDate:string;
  amount:string;
  firstName:string;
  lastName:string;
  accountName:string;

}



  

