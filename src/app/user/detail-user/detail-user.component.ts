import { Component, Inject,  OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
  userEditForm:FormGroup
  id : any
  civility:any
  lastName:any
  firstName:any
  email:any
  password:any
  constructor( @Inject(MAT_DIALOG_DATA) public data , private Eserivice:UserService) { 
    this.id=data.id;
    this.civility=data.civility;
    
    this.lastName=data.lastName;
    this.firstName=data.firstName;
    this.email=data.email;
    this.password=data.password;

  }

  ngOnInit(): void {

    this.userEditForm=new FormGroup({
      id: new FormControl(''),
      title:new FormControl(''),
      lastName:new FormControl(''),
      firstName:new FormControl(''),
      email:new FormControl(''),
      password:new FormControl(''),
      


    })

  }
  get EForm(){

    return this.userEditForm.controls;


 }
 updateUser(){
  this.Eserivice.updateUser(this.EForm.id.value,
    this.EForm.title.value,
    this.EForm.lastName.value,
    this.EForm.firstName.value,
    this.EForm.email.value,
    this.EForm.password.value).pipe().subscribe(()=>{
    location.reload();

  
    

  });
}

}
