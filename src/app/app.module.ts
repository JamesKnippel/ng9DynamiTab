import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Tab } from './tabs/tab/tab.component';
import { Tabs } from './tabs/tab-container/tab-container.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PeopleListComponent } from './people/people-list/people-list.component';
import { PeopleEditComponent } from './people/people-edit/people-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicTabsDirective } from './tabs/dynamic-tabs.directive';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule, MatIcon } from '@angular/material/icon';




@NgModule({
  declarations: [
    AppComponent,
    DynamicTabsDirective,
    Tab,
    Tabs,
    PeopleListComponent,
    PeopleEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [Tab]
})
export class AppModule { }
