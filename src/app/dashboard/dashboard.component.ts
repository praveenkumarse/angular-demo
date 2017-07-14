
import { GlobalService } from './../services/global.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import {Headers} from '@angular/http';
declare const $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  infoForm: FormGroup;
  info: any;
  constructor(public fb: FormBuilder, public global: GlobalService) { }

  ngOnInit() {

    this.infoForm = this.fb.group({
      info: this.fb.array([this.addInfo()])
    })
    this.getInformation();
  }
  public addInfo(): FormGroup {
    return this.fb.group({
      firstName: '',
      lastName: '',
      number: '',
      _id: ''
    })
  }
  public addRow() {
    this.info = this.infoForm.get('info') as FormArray;
    this.info.push(this.addInfo());
  }
  public removeRow(index) {
    if (this.infoForm.value.info[index]._id) {
      this.deleteInformation(this.infoForm.value.info[index]._id);
    } else {
      const temp = this.infoForm.controls['info'] as FormArray;
      temp.removeAt(index)
    }
  }

  public addInformation() {
    this.infoForm.value.info.forEach(element => {
      delete element._id
    });
    let url = "http://localhost:3000/api/home";
    this.global.postRequest(url, this.infoForm.value)
      .subscribe(res => {
        console.log(res);
      }, error => {
        console.log(error)
      })
  }
  public getInformation() {
    let url = "http://localhost:3000/api/home";
    this.global.getRequest(url)
      .subscribe(res => {
        let tempArray = res.info;
        const temp = this.infoForm.controls['info'] as FormArray;
        for (let key in tempArray) {
          temp.at(parseInt(key)).patchValue(tempArray[key])
          this.addRow();
        }
      }, error => {
        console.log(error)
      })
  }
  public deleteInformation(id) {
    let url = `http://localhost:3000/api/home/${id}`;
    this.global.deleteRequest(url)
      .subscribe(res => {
        console.log("data deleted successfully")
      }, error => {
        console.log(error)
      })
  }
  public updateInformation(index) {
    let id = this.infoForm.value.info[index]._id;
    let data = this.infoForm.value.info[index]
    let url = `http://localhost:3000/home/${id}`;
    this.global.putRequest(url, data)
      .subscribe(res => {
        console.log("Update successfully")
      }, error => {
        console.log(error)
      })
  }
  public upload(fileInput) {
    let url = "http://localhost:3000/upload";
    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e: any) {
        $('#preview').attr('src', e.target.result);
      }
      reader.readAsDataURL(fileInput.target.files[0]);
    }
    console.log("hello",fileInput.target.files)
 
    let formdata = new FormData()
    formdata.append('file', fileInput.target.files[0])
    formdata.append('name', "praveen")

  
      this.global.postRequest(url, formdata)
        .subscribe(res => {
          console.log("hello", res);
        })
  }
}
