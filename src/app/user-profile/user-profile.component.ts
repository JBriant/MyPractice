import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Patient } from '../patient';
import {MatSelectModule} from '@angular/material/select';
import { NgxPermissionsService } from 'ngx-permissions';


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
  roles = [];
  patientModel = new Patient('','', '','',Date(),'',"",'');

  constructor(private permissionsService: NgxPermissionsService, private http: HttpClient) { }

     
  ngOnInit() {
   //Get user user access permissions
    this.http.get('http://localhost:3000/api/xjoin?_join=ur.userroles,_j,r.roles&_on1=(ur.roleId,eq,r.roleId)&_fields=r.role,ur.userId&_size=50&_where=(userId,eq,1)').subscribe(
      (permissions) => {
        console.log(permissions)
        var x = "";        
        for (var i = 0; i < permissions.length; i++){
          this.permissionsService.addPermission(permissions[i].r_role)
          
        }
    
      }
    )
    
    this.http.get('http://localhost:3000/api/patient')
    .subscribe(
      (data:any[])=>{
        this.fetchData = data;
        //console.log("Patients data>>>>>> ",data);        
      }   
    ) 

    this.http.get('http://localhost:3000/api/clinics')
    .subscribe(
      (data:any[])=>{ 
        this.clinicData = data; 
        //console.log("clinics Data>>>>",data);          
      }  
    )  
 
   
  } 
  maritalCode:string; 


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
