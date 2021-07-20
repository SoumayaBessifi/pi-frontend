import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  connected : boolean;

  constructor(private router : Router) { 
    this.connected=localStorage.getItem('currentUser')!=null;

  }

  ngOnInit(): void {
    this.connected=localStorage.getItem('currentUser')!=null;

  }

  logout(){
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    window.location.reload();
  }
}
