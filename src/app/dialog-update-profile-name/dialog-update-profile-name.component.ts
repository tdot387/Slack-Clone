import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-dialog-update-profile-name',
  templateUrl: './dialog-update-profile-name.component.html',
  styleUrls: ['./dialog-update-profile-name.component.scss']
})
export class DialogUpdateProfileNameComponent {
  loading = false;
  isGuest;

  firstNameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-zA-Z]+$/),
  ]);
  lastNameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-zA-Z]+$/),
  ]);

  constructor(public use: UserService, private firestore: AngularFirestore, private dialogRef: MatDialogRef<DialogUpdateProfileNameComponent>) { 

    if (this.use.currentUserId == 'TzlCRRHBcjQ30Oml2Tb8') {
      this.isGuest = true;
    } else {
      this.isGuest = false;
    }

  }


  /**
   * load information from user
   */
  ngAfterViewInit(): void {
    this.firestore.collection('users').doc(this.use.currentUserId).valueChanges().subscribe((user: any) => {
      this.firstNameFormControl.setValue(user.userInfos.firstName);
      this.lastNameFormControl.setValue(user.userInfos.lastName);
    });
  }


  /**
   * Update changes and close the dialog
   */
  saveName() {
    if (this.firstNameFormControl.valid && this.lastNameFormControl.valid) {
      this.loading = true;
      this.firestore.collection('users').doc(this.use.currentUserId).update({
        'userInfos.firstName': this.firstNameFormControl.value,
        'userInfos.lastName': this.lastNameFormControl.value,
      }).then(() => {
        this.loading = false;
        this.dialogRef.close();
      });
    }
  }


  /**
   * close dialog
   */
  closeDialogName() {
    this.dialogRef.close();
  }
}
