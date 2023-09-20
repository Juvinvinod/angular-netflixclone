import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from '../components/info/info.component';

const routes: Routes = [
  { path: 'info', component: InfoComponent }, // :tvData is the parameter to pass data
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
