import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-people-edit',
  templateUrl: './people-edit.component.html',
  styleUrls: ['./people-edit.component.scss']
})

export class PeopleEditComponent implements OnInit {
  personForm: FormGroup;

  @Input() person;
  @Output() savePerson = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.personForm = this.fb.group({
      id: '',
      name: '',
      lastname: '',
      twitter: ''
    });
  }

  // hello hi

  ngOnInit() {
    this.personForm.setValue({
      id: this.person.id || -1,
      name: this.person.name || '',
      lastname: this.person.lastname || '',
      twitter: this.person.twitter || ''
    });
  }

  onPersonFormSubmit() {
    const dataModel = this.personForm.value;
    this.savePerson.emit(dataModel);
  }

}
