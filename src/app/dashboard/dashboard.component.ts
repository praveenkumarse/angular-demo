
import { GlobalService } from './../services/global.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

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
      this.deleteInformation(this.infoForm.value[index]._id);
    } else {
      const temp = this.infoForm.controls['info'] as FormArray;
      temp.removeAt(index)
    }




  }

  public addInformation() {
    console.log("hello", this.infoForm.value)
    this.infoForm.value.forEach(element => {
      delete element._id
    });
    let url = "http://localhost:3000/add";
    this.global.postRequest(url, this.infoForm.value)
      .subscribe(res => {
        console.log(res);
      })
  }
  public getInformation() {
    let url = "http://localhost:3000/info";
    this.global.getRequest(url)
      .subscribe(res => {
        console.log("hello test",res.info)
        const temp = this.infoForm.controls['info'] as FormArray;
        res.info.forEach(element => {
          temp.patchValue(element)
          this.addRow();
        });

      })
  }
  public deleteInformation(id) {
    let url = `http://localhost:3000/delete/${id}`;
    this.global.deleteRequest(url)
      .subscribe(res => {
        console.log("data deleted successfully")
      })
  }
}
