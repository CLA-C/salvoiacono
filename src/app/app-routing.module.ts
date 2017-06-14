import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { WorkComponent } from './work/work.component';
import { EventComponent } from './event/event.component';
import { CartComponent } from './cart/cart.component';
import { TestComponent } from './test/test.component';
import { MessageComponent } from './message/message.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'test', component: TestComponent },
  { path: 'cart', component: CartComponent },
  { path: 'message', component: MessageComponent},
  { path: ':event', component: EventComponent },
  { path: ':event/:work', component: WorkComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
