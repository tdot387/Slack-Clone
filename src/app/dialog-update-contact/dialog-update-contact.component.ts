import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-dialog-update-contact',
  templateUrl: './dialog-update-contact.component.html',
  styleUrls: ['./dialog-update-contact.component.scss']
})
export class DialogUpdateContactComponent {
  loading = false;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  phoneFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\d*$/),
  ]);

  constructor(public use: UserService, private firestore: AngularFirestore, private dialogRef: MatDialogRef<DialogUpdateContactComponent>) { }


  /**
   * load information from user
   */
  ngAfterViewInit(): void {
    this.firestore.collection('users').doc(this.use.currentUserId).valueChanges().subscribe((user: any) => {
      this.emailFormControl.setValue(user.userInfos.email);
      this.phoneFormControl.setValue(user.userInfos.phone);
    });
  }


  /**
   * Update changes and close the dialog
   */
  saveContact() {
    if (this.emailFormControl.valid && this.phoneFormControl.valid) {
      this.loading = true;
      this.firestore.collection('users').doc(this.use.currentUserId).update({
        'userInfos.email': this.emailFormControl.value,
        'userInfos.phone': this.phoneFormControl.value,
      }).then(() => {
        this.loading = false;
        this.dialogRef.close();
      });
    }
  }


  /**
   * close dialog
   */
  closeDialogContact() {
    this.dialogRef.close();
  }
}
