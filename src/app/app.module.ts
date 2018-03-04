import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DialogComponent } from './dialog/dialog.component';

import {
  MatDialogModule, MatInputModule, MatFormFieldModule, MatCardModule, MatToolbarModule, MatButtonModule,
  MatCheckboxModule, MatListModule, MatIconModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule, MatToolbarModule,
    MatButtonModule, MatCheckboxModule, MatListModule, MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
