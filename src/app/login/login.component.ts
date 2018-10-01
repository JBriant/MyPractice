import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { User } from '../patient';
import {Router} from '@angular/router';

const jwt = require('jsonwebtoken');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient,
    private _router: Router
  ) { }

  userName:string; 
  password:string;
  userPas:string;
  userId:number;
  userRoles = [];
  loginData = [];
  userModel = new User("","",1);

  ngOnInit() {
  }

  loginUser(){
    this.userPas = this.userModel.password;
    this.userName = this.userModel.userName;

    //Encrypt password to sha1
    var crypto = require('crypto');
    var shasum = crypto.createHash('sha1');
    shasum.update(this.userPas);
    //console.log(shasum.digest('hex'));

    this.userPas = shasum.digest('hex');

    this.http.get('http://localhost:3000/api/users/findOne?_where=((userName,eq,'+this.userName+')~and(password,eq,'+this.userPas+'))')
    .subscribe(
      (data:any[])=>{
        this.loginData = data;
        if(data.length){
          let payload = {subject: this.loginData[0].userId};
          let token = jwt.sign(payload, 'secretKey')
          localStorage.setItem('token',token); 
          this._router.navigate(['/dashboard'])
          console.log("Token>>> ",token);
        }
        else{
          console.log('Invalid user credentials'); 
        }
                
      }  
      
    ) 
    
  }

}
