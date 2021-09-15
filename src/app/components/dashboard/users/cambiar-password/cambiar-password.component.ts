import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit {
  hide = true;
  loading = false;
  formChangePassword: FormGroup;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router,
              private snackBar: MatSnackBar) {

    this.formChangePassword = this.fb.group({
      passwordAnterior: ['', Validators.required],
      passwordNueva: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  changePassword(): void{

      const cambiarPassword: any = {
        passwordAnterior:this.formChangePassword.value.passwordAnterior,
        passwordNueva: this.formChangePassword.value.passwordNueva
      }
      this.loading = true;
      this.usuarioService.cambiarPassword(cambiarPassword).subscribe(data => {

        this.snackBar.open('La contraseña se actualizo con éxito.', '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['blue-snackbar']
        });

        this.router.navigate(["/dashboard"]);
      }, error => {
         this.loading = false;

         this.formChangePassword.reset();
         this.snackBar.open(error.error.message, 'Error', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });

      });

  }

}
