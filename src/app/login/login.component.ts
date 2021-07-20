import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  forme: FormGroup;
  control : String ="";
  click : boolean = false;
  constructor(    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router : Router,
    private us : UserService) { }

  ngOnInit(): void {
    this.forme=this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',Validators.required]

      
    
  });

}


submit(): void {
  this.click = false;
  this.control = "";
  let user = {
    email: this.forme.value.email,
    password :  this.forme.value.password}

    this.us.getAll().subscribe(res=>{
    (res['hydra:member']).map(r=>{
      if((r.email==user.email)&&(r.password==user.password)){
        localStorage.setItem('currentUser',JSON.stringify(r));
        window.location.reload();
        this.router.navigate(['/home']);
      }
    })
  
  });
  setTimeout(() => {this.control="Vérifier vos données !", this.click=true; } , 1500);


}}