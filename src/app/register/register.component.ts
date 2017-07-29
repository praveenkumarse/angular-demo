import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(public _fb: FormBuilder,public router:Router) { }

  ngOnInit() {
    this.registerForm = this._fb.group({
      email: "",
      password: "",
      'role':"admin",
      name:""
    })
  }
  public register(){
    // let url="http://localhost:3000/auth/register";
    // this.global.postRequest(url,this.registerForm.value,'login')
    // .subscribe(res=>{
      
    //   localStorage.setItem('user-details',res.token);
    //   this.router.navigate(['home']);
     
    // },err=>{

    // })
  }
}
