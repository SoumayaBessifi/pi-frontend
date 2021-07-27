import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ControlContainer, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorFn, FormControl, 
  ValidationErrors } from '@angular/forms';
  import { Subscription } from 'rxjs';
 import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  exist = false;
control : String = "";
click = false;

  constructor(private formBuilder : FormBuilder,
    private http: HttpClient,
    private router: Router,
    private us : UserService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
    
      civility:[null,Validators.required],
      lastName:[null,Validators.required],
      firstName :[null,Validators.required],
      email:[null,[Validators.required,Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)]],
      password:[null,[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}/)]]
  
    } ); }

   

     get f() { return this.form.controls; }

  

    submit(){
      this.exist = false;
      this.click = false;

      this.control = "";


      this.us.getAll().subscribe(res=>{
        (res['hydra:member']).map(r=>{
          if((r.email==this.f.email.value)){
            this.exist=true;
            
          
          }
        })
      
      });
      
      setTimeout(() => {if(!this.exist){
        this.us.submit(
         this.f.civility.value,
         this.f.lastName.value,
        this.f.firstName.value,
        this.f.email.value,
         this.f.password.value).pipe().subscribe(()=>this.router.navigateByUrl("/login"))
  }
  else{

  this.control="Ce mail existe déja !";
  this.click = true;
  
  
  }} , 2000);


    
  
         }}