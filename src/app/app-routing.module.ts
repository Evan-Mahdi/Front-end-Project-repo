import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFormComponent } from './add-form/add-form.component';
import { EventListComponent } from './event-list/event-list.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:"",redirectTo:'home',pathMatch:"full"},
  {path:"home",component:HomeComponent},
  {path:"event-list",component:EventListComponent},
  {path:"add-form",component:AddFormComponent},
  { path: 'add-form/:id', component: AddFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
