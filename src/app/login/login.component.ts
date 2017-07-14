import { Router } from '@angular/router';
import { GlobalService } from './../services/global.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(public _fb: FormBuilder,public global:GlobalService ,public router:Router) { }

  ngOnInit() {
    this.loginForm = this._fb.group({
      email: "",
      password: "",
      role:"admin"

    })
  }
  public login(){
    let url="http://localhost:3000/auth/login";
    this.global.postRequest(url,this.loginForm.value)
    .subscribe(res=>{
       let userInfo={
        _id:res.user._id,
        token:res.token,
        email:res.email
      }
      document.cookie=JSON.stringify(userInfo);
      this.router.navigate(['/home'])
    },err=>{

    })
  }
}
