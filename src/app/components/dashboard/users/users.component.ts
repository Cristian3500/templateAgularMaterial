import { UsuarioService } from 'src/app/services/usuario.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { usuario } from 'src/app/interfaces/usuario';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  listUsers: usuario[] = [];
  displayedColumns: string[] = ['id', 'nombrecompleto', 'usuario', 'direccion','fechacreacion','acciones'];
  dataSource!: MatTableDataSource<any>;
  loading = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private usuarioService: UsuarioService) {
    }

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadUsers(){
    this.loading = true;
    this.usuarioService.getUsers().subscribe(data => {
      this.listUsers = data;
      this.loading = false;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      });

  }

  editUser(id: number){

  }

  deleteUser(id: number){
    console.log(id);

  }

}
