import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HotToastService } from '@ngneat/hot-toast';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-site-list',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, NavbarComponent],
  templateUrl: './site-list.component.html',
  styleUrl: './site-list.component.css',
})
export class SiteListComponent {
  allSites!: Observable<Array<any>>;

  siteName!: string;
  siteURL!: string;
  siteImgURL!: string;
  siteId!: string;

  formState: string = 'Add New';

  constructor(
    private toast: HotToastService,
    private passwordManagerService: PasswordManagerService
  ) {
    this.loadSites();
  }

  onSubmit(values: object) {
    if (this.formState === 'Add New') {
      this.passwordManagerService
        .addSite(values)
        .then(() => {
          this.toast.success('Site Added Successfully');
        })
        .catch((err) => {
          this.toast.error('Error Adding Site');
        });
    } else if (this.formState === 'Edit') {
      this.passwordManagerService
        .updateSite(this.siteId, values)
        .then(() => {
          this.toast.success('Site Updated Successfully');
        })
        .catch((err) => {
          this.toast.error('Error Updating Site');
        });
    }
  }

  loadSites() {
    this.allSites = this.passwordManagerService.loadSites();
  }

  editSite(siteName: string, siteURL: string, siteImgURL: string, id: string) {
    this.siteName = siteName;
    this.siteURL = siteURL;
    this.siteImgURL = siteImgURL;
    this.siteId = id;

    this.formState = 'Edit';
  }

  deleteSite(id: string) {
    this.passwordManagerService
      .deleteSite(id)
      .then(() => {
        this.toast.success('Site Deleted Successfully');
      })
      .catch((err) => {
        this.toast.error('Error Deleting Site');
      });
  }
}
// Path: src/app/site-list/site-list.component.html
