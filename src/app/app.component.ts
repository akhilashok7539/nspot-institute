import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Nspot | Institute Application';

  constructor(private toastr: ToastrService) {}
  ngOnInit(): void {
    addEventListener('offline', (e) => {
      this.toastr.error('you are offline !');
      // alert('');
    });
    addEventListener('online', (e) => {
      // alert('you are online');
      this.toastr.success('you are online !');
    });
    // addEventListener('focus', (e) => {
    //   alert('you are focused');
    // });
  }
}
