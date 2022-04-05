import {Component, OnInit} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import {AuthenticationService} from '../../services/authentication.service';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../../store';

@Component({
  selector: 'app-login-ngxs',
  templateUrl: './login-ngxs.component.html',
  styleUrls: ['./login-ngxs.component.css'],

})
export class LoginNgxsComponent implements OnInit {
  username: string;
  password: string;
  username$: Observable<string>;
  loggedIn$: Observable<boolean>;

  private ngServiceUnsuscribe :Subject<boolean> = new Subject();

  constructor(
    private _authenticationService: AuthenticationService,
    private store: Store<fromStore.AuthState>) 
    {
    
    }
  

  ngOnInit() { 
    this._authenticationService. signIn({username: this.username, password: this.password})
      .pipe(takeUntil(this.ngServiceUnsuscribe))
      .subscribe(results=> this.store
        .dispatch(fromStore.AuthorizationSuccess({ state: { loggedIn: results, username: this.username} })));

      this.loggedIn$ = this.store.pipe(select(fromStore.selectIsLoggedIn));
      this.username$ = this.store.pipe(select(fromStore.selectUserName));
  }

  ngOnDestroy(){
    this.ngServiceUnsuscribe.complete();
  }

  doLogin() {
    this._authenticationService.signIn({username: this.username, password: this.password})
      .subscribe({
         next: (data) => {
           //hack :-/
           this.loggedIn$ = of(data);
           this.username$ = of(this.username);       
          }  ,
         complete: () =>  {   
             //возвращает пустой объект. не хватило времени чтоб разобраться с темой NgRx
             //this.loggedIn$ = this.store.pipe(select(fromStore.selectIsLoggedIn));
             //this.username$ = this.store.pipe(select(fromStore.selectUserName));
         },
         error: (error)=>  alert(error),      
       });     
  }

  logout(): void {
    this._authenticationService.signout().subscribe({
         next: (data) => {
           this.loggedIn$ = of(data);         
          }  ,             
       });;
  }
}
