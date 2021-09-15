import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router,
              private loginService: LoginService
              )
  {
    this.formLogin = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
      });
   }

  ngOnInit(): void {
  }

  iniciarSesion(){
    this.loading = true;
    const usuario: usuario = {
      usuario: this.formLogin.value.usuario,
      password: this.formLogin.value.password
    }
    this.loginService.login(usuario).subscribe(data => {
      this.loginService.setLocaStorage(data.token);
      console.log(data.toke);

      this.fakeLoading();
    }, error => {
      this.loading = false;
      this.error();
      this.formLogin.reset();
    });

  }

  error(){
    this.snackBar.open('Las credenciales no son válidas', 'Error', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  fakeLoading(){
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['dashboard']);
      this.loading = false;
    }, 1000);
  }

}
