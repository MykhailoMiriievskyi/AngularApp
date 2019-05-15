import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private userService: UsersService, private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup ({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }
onSubmit() {  
  const formData = this.form.value;
  this.userService.getUserByEmail(formData.email)
  .subscribe((user: User) => {
    
    if (user) {
if (user.password === formData.password) {
  window.localStorage.setItem('user', JSON.stringify(user));
this.authService.login();
//this.router.navigate([''])
}
else {
  alert('Пароль не верный!')
}
    }
else {
alert('Такого пользователя не существует!')
}

  });
}
}
