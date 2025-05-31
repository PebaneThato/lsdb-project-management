import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lsdb-registration-form';
  submittedData: any = null;

  userRoles = [
    { value: 'Accountant', label: 'Accountant' },
    { value: 'Administrator', label: 'Administrator' },
    { value: 'Human Resource', label: 'Human Resource' },
  ];
}
