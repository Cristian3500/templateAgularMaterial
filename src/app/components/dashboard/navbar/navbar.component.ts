import { LoginService } from './../../../services/login.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output()
  navBarLeft: EventEmitter<any> = new EventEmitter<any>();
  nombrecompleto: string = "";
  constructor(private loginService: LoginService,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.callBar();
  }

  callBar(){
    this.navBarLeft.emit(true);
    this.nombrecompleto = this.loginService.getNombreUsuario();
  }

  logout(){
    this.loginService.eliminarLocalStorage();
    this.router.navigate(['/login']);
  }

}
