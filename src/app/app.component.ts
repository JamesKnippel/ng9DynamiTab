import { Component, ViewChild } from '@angular/core';
import { Tabs } from '../app/tabs/tab-container/tab-container.component';
import { Tab } from '../app/tabs/tab/tab.component';


// TODO
// Refctor with RXJS

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('peopleEdit') editPersonTemplate;
  @ViewChild('about') aboutTemplate;
  @ViewChild(Tabs) tabsComponent;

  links = [
    'Link 1',
    'Link 2',
    'Link 3',
  ];

  people = [
    {
      id: 1,
      name: 'Jim',
      lastname: 'Knippel',
      twitter: '@Knippel_James'
    }
  ];

  onEditPerson(person) {
    this.tabsComponent.openTab(
      `Editing ${person.name}`,
      this.editPersonTemplate,
      person,
      true
    );
  }

  onAddPerson() {
    this.tabsComponent.openTab('New Person', this.editPersonTemplate, {}, true);
  }

  onPersonFormSubmit(dataModel) {
    if (dataModel.id > 0) {
      this.people = this.people.map(person => {
        if (person.id === dataModel.id) {
          return dataModel;
        } else {
          return person;
        }
      });
    } else {
      // create a new one
      dataModel.id = Math.round(Math.random() * 100);
      this.people.push(dataModel);
    }

    // close the tab
    this.tabsComponent.closeActiveTab();
  }

  onOpenAbout() {
    this.tabsComponent.openTab('About', this.aboutTemplate, {}, true);
  }
}
