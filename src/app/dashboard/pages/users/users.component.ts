import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { User } from './models';
import { Users } from './repository/users.repository';
import { UserService } from 'src/app/core/services/user.service';
import { pageNumber, pageSize } from 'src/app/core/constants/page.constants';
import { Subject, fromEvent, takeUntil } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  @ViewChild('scrollDiv', { static: true }) scrollDiv!: ElementRef;
  private destroy = new Subject();	
  userName = '';
  private pageNumber = pageNumber;
  private pageSize = pageSize;
  users: Array<User> = [];

  constructor(private matDialog: MatDialog, private userService: UserService) {}
  //UserService es un servicio que se encarga de realizar peticiones de usuarios


  ngOnInit(): void {
    this.users = this.userService.get(this.pageSize); //Utilizamos la peticion get del servicio para obtener los usuarios y los guardamos en nuestra variable
  }

  ngAfterViewInit() { //Se espera que se carguen todos los datos antes de hacer algun tipo de modificacion en el scroll
    fromEvent(this.scrollDiv.nativeElement, 'scroll').pipe(takeUntil(this.destroy)) //Cuando salimos de la vista donde esta la barra que estamos observando, se destruye
      .subscribe((event) => this.nextPage(event as Event)); // Forzamos que sea un tipo Event para asegurarnos
  }
  
  private nextPage(event: Event) {
    const target = event.target as HTMLElement; // Convierte event.target en un HTMLElement
    const { scrollTop, scrollHeight, clientHeight } = target; //Definimos las dimensiones y la posicion de la barra
  
    if (scrollTop + clientHeight >= scrollHeight) { //Controla que haya llegado al final
      this.pageSize = this.pageSize * (this.pageNumber += 1); //Define la cantidad de elementos que va a pedir en la siguiente llamada
      this.users = this.userService.get(this.pageSize);//Pide los resultados de la segunda pagina, sumandoselos a la primera pagina
    }
  }


  openUsersDialog(): void {
    this.matDialog.open(UsersDialogComponent)
    .afterClosed()
    .subscribe({
      next: (v) => {
        if (!!v){
          Users.push(  //Los usuarios debemos guardarlos en nuestro repositio y no en la lista del componente
            {
              ...v,
              id: new Date().getTime(),
            },
          )
        }
        this.users = this.userService.get(pageSize * this.pageNumber);
      },
    });
  }

  onEditUser(user: User): void {
    this.matDialog.open(UsersDialogComponent, {
      data: user,
    }).afterClosed().subscribe({
      next: (v) => {
        if (!!v) {
          this.users = this.users.map((u) =>
          u.id === user.id ? {...u, ...v}:u
          );
        }
      }
    })
  }

  onDeleteUser(userId: number): void{
    if (confirm('Editar alumno'))
    this.users = this.users.filter((u) => u.id !== userId)
  }

}

