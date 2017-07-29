import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(public http: HttpClient, public _fb: FormBuilder,public router: Router) { }

  ngOnInit() {
    this.loginForm = this._fb.group({
      email: "",
      password: "",
      role: "admin"

    })
  }
  public login() {
    let url = "http://localhost:3000/auth/login";
    this.http.post<any>(url, this.loginForm.value)
      .subscribe(res => {
        localStorage.setItem('user-details', res.token);
        this.router.navigate(['/home'])
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client side error");
        } else {
          
          console.log("Server side error",err);
        }
      })
  }
}
