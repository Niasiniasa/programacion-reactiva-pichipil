import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UserService } from 'src/app/core/services/user.service';



@NgModule({
  declarations: [
    UsersComponent,
    UsersDialogComponent,
    UsersTableComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    UsersComponent
  ],
  providers:[UserService]
})
export class UsersModule { }
