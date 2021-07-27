import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from '../services/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { user } from '../model/user';
import { DetailUserComponent } from './detail-user/detail-user.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  Form:FormGroup
  listm:user[]=[];

  constructor(    private user : UserService,private maroute: Router,  private modalService: NgbModal, private dialogeRef : MatDialog) { }

  ngOnInit(): void {
    this.Form=new FormGroup({
      id : new FormControl(''),
      civility:new FormControl(''),
      lastName:new FormControl(''),
      firstName:new FormControl(''),
      email:new FormControl(''),
      password : new FormControl('')
      
    })

    this.user.getAll().subscribe(next=>{this.listm=next['hydra:member'];
  console.log(next); 

}, 
  error=>console.log(console.error()));

  }
  get EForm(){
    return this.Form.controls
 }


 deleteUser(i:number)
 {
// this.user.deleteUser(i).subscribe(()=>this.user.getAll().subscribe(next=>this.listm=next['hydra:member'], error=>console.log(console.error()),()=>alert('Do You Want to Delete this User ? ')));
if (confirm("Do You Want to Delete this User ?")){

  this.user.deleteUser(i).subscribe(()=>this.user.getAll().subscribe(next=>this.listm=next['hydra:member'], ));
}
 }


 openEditDialoge(id:any,civility:any,lastName:any,firstName:any,email:any,password:any){
   this.dialogeRef.open(DetailUserComponent,{data:{
    "id":id,
    "civility": civility,
    "lastName": lastName,
   "firstName": firstName,
    "email":email,
    "password":password
    
     
   }}
   )
  
   
 }

 
}
