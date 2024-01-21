import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { AES, enc } from 'crypto-js';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-password-list',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, NavbarComponent],
  templateUrl: './password-list.component.html',
  styleUrl: './password-list.component.css',
})
export class PasswordListComponent {
  siteId!: string;
  siteName!: string;
  siteURL!: string;
  siteImgURL!: string;

  passwordList!: Observable<Array<any>>;

  email!: string;
  username!: string;
  password!: string;
  passwordId!: string;

  formState: string = 'Add New';

  constructor(
    private toast: HotToastService,

    private route: ActivatedRoute,
    private passwordManagerService: PasswordManagerService
  ) {
    this.route.queryParams.subscribe((val: any) => {
      this.siteId = val.id;
      this.siteName = val.siteName;
      this.siteURL = val.siteURL;
      this.siteImgURL = val.siteImgURL;
    });

    this.loadPasswords();
  }

  resetForm() {
    this.email = '';
    this.username = '';
    this.password = '';
    this.passwordId = '';
    this.formState = 'Add New';
  }

  onSubmit(values: any) {
    const encryptedPassword = this.encryptPassword(values.password);
    values.password = encryptedPassword;
    if (this.formState === 'Add New') {
      this.passwordManagerService
        .addPassword(values, this.siteId)
        .then(() => {
          this.toast.success('Credentials Added Successfully');
          this.resetForm();
        })
        .catch((err) => {
          this.toast.error('Error Adding Credentials');
        });
    } else if (this.formState === 'Edit') {
      this.passwordManagerService
        .updatePassword(this.siteId, this.passwordId, values)
        .then(() => {
          this.toast.success('Credentials Updated Successfully');
          this.resetForm();
        })
        .catch((err) => {
          this.toast.error('Error Updating Credentials');
        });
    }
  }

  loadPasswords() {
    this.passwordList = this.passwordManagerService.loadPasswords(this.siteId);
  }

  onEdit(
    email: string,
    username: string,
    password: string,
    passwordId: string
  ) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.passwordId = passwordId;

    this.formState = 'Edit';
  }

  onDelete(passwordId: string) {
    this.passwordManagerService
      .deletePassword(this.siteId, passwordId)
      .then(() => {
        this.toast.success('Credentials Deleted Successfully');
      })
      .catch((err) => {
        this.toast.error('Error Deleting Credentials');
      });
  }

  encryptPassword(password: string) {
    const secretKey =
      '4b831992c5e3837668ff2e18846c9e476812f17956b1e0a9f210e7ecec2232d5';
    const encryptedPassword = AES.encrypt(password, secretKey).toString();
    return encryptedPassword;
  }

  decryptPassword(password: string) {
    const secretKey =
      '4b831992c5e3837668ff2e18846c9e476812f17956b1e0a9f210e7ecec2232d5';
    const decryptedPassword = AES.decrypt(password, secretKey).toString(
      enc.Utf8
    );
    return decryptedPassword;
  }

  onDecrypt(password: string) {
    const decryptedPassword = this.decryptPassword(password);
    this.toast.info(`Decrypted Password: ${decryptedPassword}`);
  }
}
