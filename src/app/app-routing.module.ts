import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user'
  },
  {
    path: "user",
    component: UsersComponent,
},
  {
    path: "user/create",
    component: AddEditUserComponent,
},
  {
    path: "user/:id",
    component: AddEditUserComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
