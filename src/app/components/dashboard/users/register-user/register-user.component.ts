import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  hide = true;
  loading = false;

  formRegister: FormGroup;
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private snackBar: MatSnackBar,
              private router: Router
              ) {

    this.formRegister = this.fb.group({
      nombrecompleto: ['', Validators.required],
      usuario: ['', Validators.required],
      direccion: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

  }

  ngOnInit(): void {
  }

  saveUser()
  {
    const usuario: usuario =
    {
      nombrecompleto: this.formRegister.value.nombrecompleto,
      usuario: this.formRegister.value.usuario,
      direccion: this.formRegister.value.direccion,
      password: this.formRegister.value.password
    }

    this.loading = true;
    this.usuarioService.saveUser(usuario).subscribe(data =>
    {
      this.snackBar.open('Usuario registrado con éxito', 'Ok', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['blue-snackbar']
      });

      this.formRegister.reset();
      this.loading = false;
      this.router.navigate(['/dashboard/users']);
    },
    error =>
    {
      this.snackBar.open(error.error.message, 'Error', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      this.loading=false;
    }
    )

  }
}
