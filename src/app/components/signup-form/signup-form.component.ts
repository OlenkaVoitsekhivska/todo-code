/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  constructor(private authservice: AuthService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const data = {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
      phone: form.value.phone,
    };

    this.authservice.handleSignup(data);
  }
}
