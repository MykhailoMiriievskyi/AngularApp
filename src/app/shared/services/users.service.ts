import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { map } from "rxjs/operators";

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/users?email=${email}`)
        //.pipe(map(response => {
        // return response;
        // }))
        .pipe(map((user: User) => {
            return user[0] ? user[0] : undefined;
          })
        )
  }

  createNewUsers(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/users', user);
  }
}
