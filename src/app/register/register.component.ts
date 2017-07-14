import { GlobalService } from './../services/global.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(public _fb: FormBuilder,public global:GlobalService) { }

  ngOnInit() {
    this.registerForm = this._fb.group({
      email: "",
      password: "",
      'role':"admin"
    })
  }
  public register(){
    let url="http://localhost:3000/auth/register";
    this.global.postRequest(url,this.registerForm.value)
    .subscribe(res=>{
      let userInfo={
        _id:res.user._id,
        token:res.token,
        email:res.email
      }
      document.cookie=JSON.stringify(userInfo)
    },err=>{

    })
  }
}
