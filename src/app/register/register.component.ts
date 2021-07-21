import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ControlContainer, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    
    civility:['',Validators.required],
    lastName:['',Validators.required],
    firstName :['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required, Validators.minLength(8)]

    } ); }

    get EForm(){
      return this.form.controls
      
    }

   

  

    submit(){
      this.click = false;

      this.control = "";


      this.us.getAll().subscribe(res=>{
        (res['hydra:member']).map(r=>{
          if((r.email==this.EForm.email.value)){
            this.exist=true;
            
          
          }
        })
      
      });
      
      setTimeout(() => {if(!this.exist){
        this.us.submit(
         this.EForm.civility.value,
         this.EForm.lastName.value,
        this.EForm.firstName.value,
        this.EForm.email.value,
         this.EForm.password.value).pipe().subscribe(()=>this.router.navigateByUrl("/login"))
  }
  else{
  this.control="ce mail existe déja";
  this.click = true;
  
  
  }} , 2000);


    
  
         }}