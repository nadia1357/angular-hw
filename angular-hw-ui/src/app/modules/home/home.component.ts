import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  registeredUser: boolean = true;
  newUser: boolean = false;

  public signInForm: any = {
    login: '',
    password: ''
  }

  public registerForm: any = {
    login: '',
    password: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

  onSubmitSignIn() { };

  onSubmitRegister() { };

}
