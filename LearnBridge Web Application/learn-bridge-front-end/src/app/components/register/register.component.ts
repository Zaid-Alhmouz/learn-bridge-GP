import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm:FormGroup = new FormGroup({
    name:new FormControl (''),
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
  })


  handelForm(): void{
    
  }
}
