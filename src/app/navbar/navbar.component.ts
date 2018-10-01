import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private breakpointObserver: BreakpointObserver) {}
  
  ngOnInit() {
    // const auth = {
    //   authenticated: true
    // }
  }
    
  
  
  }
