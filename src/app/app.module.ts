import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material'; import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { MasonryModule } from 'angular2-masonry';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WorkComponent } from './work/work.component';
import { FormLoginComponent } from './form/form-login/form-login.component';
import { FormWorkComponent } from './form/form-work/form-work.component';
import { FormEventComponent } from './form/form-event/form-event.component';
import { EventComponent } from './event/event.component';
import { FormFooterComponent } from './form/form-footer/form-footer.component';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './cart/cart.component';
import { TestComponent } from './test/test.component';
import { MenuComponent } from './menu/menu.component';
import { MessageComponent } from './message/message.component';
import { AppPipe } from './app.pipe';

enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WorkComponent,
    FormLoginComponent,
    FormWorkComponent,
    FormEventComponent,
    EventComponent,
    FormFooterComponent,
    FooterComponent,
    CartComponent,
    TestComponent,
    MenuComponent,
    MessageComponent,
    AppPipe
  ],
  entryComponents: [
    AppComponent,
    FormLoginComponent,
    FormWorkComponent,
    FormEventComponent,
    FormFooterComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    MasonryModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
