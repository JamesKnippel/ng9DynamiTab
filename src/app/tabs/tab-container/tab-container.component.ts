import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef
} from '@angular/core';
import { Tab } from '../tab/tab.component';
import { DynamicTabsDirective } from '../dynamic-tabs.directive';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'tabs',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class Tabs implements AfterContentInit {
  dynamicTabs: Tab[] = [];

  @ContentChildren(Tab) tabs: QueryList<Tab>;
  @ViewChild(DynamicTabsDirective) dynamicTabPlaceholder: DynamicTabsDirective;

  /*
    Alternative approach of using an anchor directive
    would be to simply get hold of a template variable
    as follows
  */
  // @ViewChild('container', {read: ViewContainerRef}) dynamicTabPlaceholder;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    const activeTabs = this.tabs.filter(tab => tab.active);

    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  openTab(title: string, template, data, isCloseable = false) {
    // get a component factory for our TabComponent
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      Tab
    );

    // fetch the view container reference from our anchor directive
    const viewContainerRef = this.dynamicTabPlaceholder.viewContainer;

    // alternatively...
    // let viewContainerRef = this.dynamicTabPlaceholder;

    // create a component instance
    const componentRef = viewContainerRef.createComponent(componentFactory);

    // set the according properties on our component instance
    const instance: Tab = componentRef.instance as Tab;
    instance.title = title;
    instance.template = template;
    instance.dataContext = data;
    instance.isCloseable = isCloseable;

    // remember the dynamic component for rendering the
    // tab navigation headers
    this.dynamicTabs.push(componentRef.instance as Tab);

    // set it active
    this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);
  }

  selectTab(tab: Tab) {
    // deactivate all tabs
    this.tabs.toArray().forEach(tabSelected => (tabSelected.active = false));
    this.dynamicTabs.forEach(tabSelected => (tabSelected.active = false));

    // activate the tab the user has clicked on.
    tab.active = true;
  }

  closeTab(tab: Tab) {
    for (let i = 0; i < this.dynamicTabs.length; i++) {
      if (this.dynamicTabs[i] === tab) {
        // remove the tab from our array
        this.dynamicTabs.splice(i, 1);

        // destroy our dynamically created component again
        const viewContainerRef = this.dynamicTabPlaceholder.viewContainer;
        // let viewContainerRef = this.dynamicTabPlaceholder;
        viewContainerRef.remove(i);

        // set tab index to 1st one
        this.selectTab(this.tabs.first);
        break;
      }
    }
  }

  closeActiveTab() {
    const activeTabs = this.dynamicTabs.filter(tab => tab.active);
    if (activeTabs.length > 0) {
      // close the 1st active tab (should only be one at a time)
      this.closeTab(activeTabs[0]);
    }
  }
}
