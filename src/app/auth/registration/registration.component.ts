import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
    'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    'name': new FormControl(null, [Validators.required]),
    'agree': new FormControl(false, [Validators.requiredTrue])
    });
  }

  onSubmit() {  
    const {email, password, name} = this.form.value;
    const user = new User(email, password, name);
    this.userService.createNewUsers(user)
    .subscribe((user: User) => {
this.router.navigate(['/login'])
alert('Теперь Вы можете войти!')
    });
  }

  forbiddenEmails (control: FormControl): Promise<any> {
return new Promise ((resolve, reject) => {
this.userService.getUserByEmail (control.value)
.subscribe ((user: User) => {
  if (user) {
    resolve ({forbiddenEmail: true});
  } else {
    resolve(null);
  }

});
  });}
}
