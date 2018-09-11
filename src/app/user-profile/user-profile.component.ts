import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Patient } from '../patient';
import {MatSelectModule} from '@angular/material/select';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})


export class UserProfileComponent implements OnInit {

  name:string = '';
  family:string;
  gender:string;
  found:boolean;
  myObj:object;
  familyname:string;
  title:string;
  phoneNumber:string;
  birthDate:Date;
  firstname:string;
  lastname:string; 
  maritalStatus:string;
  patientId:string; 
  idNumber:string;
  language:string

  fetchData = [];
  clinicData = [];
  patientModel = new Patient('','', '','',Date(),'',"",'');

  constructor(private http: HttpClient) { }

    
  ngOnInit() {
    //api call to get specific user data. Used as profile at the right of the page in this case
    this.http.get('http://45.56.87.77:8081/baseDstu3/Patient/2717')
    .subscribe(
      (data:any[]) =>{
        this.myObj = data;
        this.lastname = this.myObj.name[0].given[1];//Given Name
        this.idNumber = this.myObj.id;//Id number
        this.familyname = this.myObj.name[0].family;//family Name
        this.firstname = this.myObj.name[0].given[0];//first Name
        //this.title = this.myObj.name[0].prefix[0];//title
        //console.log(this.myObj.telecom[0].system);//number type
        this.phoneNumber = this.myObj.telecom[0].value;//number
        this.gender = this.myObj.gender;//gender
        this.birthDate = this.myObj.birthDate;//birthDate
        this.maritalStatus = this.myObj.maritalStatus.coding[0].display;//marital Status
        this.language=this.myObj.communication[0].language.coding[0].display;//language
        
        if(data.length){
            console.log(this.family)
        }
        
      }
    )

    this.http.get('http://localhost:3000/patients')
    .subscribe(
      (data:any[])=>{
        this.fetchData = data.response;
        console.log("Patients data>>>>>> ",data);        
      }  
    ) 

    this.http.get('http://localhost:3000/clinics')
    .subscribe(
      (data:any[])=>{
        this.clinicData = data.response;
        console.log("clinics Data>>>>",data);        
      }  
    ) 
 
   
  } 
  maritalCode:string;
  
//To add a new patient the below class is called. But first we have to get the marital status code that correctly matches the status to avoid server error
  postProfile(){
    if(this.patientModel.maritalStatus === "Married"){
      this.maritalCode = "M";
    }
    else if(this.patientModel.maritalStatus === "Never Married"){
      this.maritalCode = "S";
    }
    else if(this.patientModel.maritalStatus === "Annulled"){
      this.maritalCode = "A";
    }
    else if(this.patientModel.maritalStatus === "Divorced"){
      this.maritalCode = "D"; 
    }
    else if(this.patientModel.maritalStatus === "Interlocutory"){
      this.maritalCode = "I";
    }
    else if(this.patientModel.maritalStatus === "Legally Separated"){
      this.maritalCode = "L";
    }
    else if(this.patientModel.maritalStatus === "Polygamous"){
      this.maritalCode = "P";
    }
    else if(this.patientModel.maritalStatus === "Domestic Partner"){
      this.maritalCode = "T";
    }
    else if(this.patientModel.maritalStatus === "Widowed"){
      this.maritalCode = "V";
    }
    else{
      this.maritalCode = "UNK";
    }

    //Now that we have the appropriate data lets fill in the gaps and post the data
    this.http.post('http://45.56.87.77:8081/baseDstu3/Patient/', 
    {
      "resourceType": "Patient",
      "id": "27171",
      "meta": {
        "versionId": "2",
        "lastUpdated": "2018-08-04T15:44:26.484+03:00"
      },
      "text": {
        "status": "additional",
        "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">Sample</div>"
      },
      "identifier": [
        {
          "system": "27172",
          "value": "id"
        }
      ],
      "active": true,
      "name": [ 
        {
          "family": this.patientModel.familyname,
          "given": [
            this.patientModel.givenname,
            this.patientModel.firstname
          ],
          "prefix": [
            this.patientModel.title
          ]
        }
      ],
      "telecom": [
        {
          "system": "phone",
          "value": this.patientModel.phonenumber,
          "use": "home"
        }
      ],
      "gender": this.patientModel.gender,
      "birthDate": this.patientModel.birthdate,
      "maritalStatus": {
        "coding": [
          {
            "system": "http://hl7.org/fhir/v3/MaritalStatus",
            "code": this.maritalCode,
            "display": this.patientModel.maritalStatus
          }
        ]
      },
      "communication": [
        {
          "language": {
            "coding": [
              {
                "system": "urn:ietf:bcp:47",
                "code": "en-US",
                "display": "English (United States)"
              }
            ]
          }
        }
      ]
    })
      .subscribe(
        (data:any)=>{
          console.log(data);
          
        }
      )

  }

  //To delete a given patient make the api call with the specific patient ID
  deletePatient(){
    this.http.delete('http://45.56.87.77:8081/baseDstu3/Patient/2812')
    .subscribe(
      result => console.log(result), 
      err => console.error(err)
    );
  }

  mysqlData(){
    
    
    
  } 

} 
