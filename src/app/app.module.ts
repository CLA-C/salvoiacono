import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { MasonryModule } from 'angular2-masonry';
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio"; 
import { MatDialogModule } from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card";
import { MatSnackBarModule } from "@angular/material/snack-bar"; 

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
import { ZoomComponent } from './zoom/zoom.component';
import { AppService } from './app.service';

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
    AppPipe,
    ZoomComponent
  ],
  entryComponents: [
    AppComponent,
    FormLoginComponent,
    FormWorkComponent,
    FormEventComponent,
    FormFooterComponent,
    ZoomComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MasonryModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatDialogModule,
    MatCardModule,
    MatSnackBarModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
