import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/services/user.service';
import { DialogUpdateContactComponent } from '../dialog-update-contact/dialog-update-contact.component';

@Component({
  selector: 'app-dialog-change-img',
  templateUrl: './dialog-change-img.component.html',
  styleUrls: ['./dialog-change-img.component.scss']
})
export class DialogChangeImgComponent {
  loading = false;
  public selectedImageId;
  isGuest;
  public images = [
    {
      img: 'assets/img/blank-profile.png',
    },
    {
      img: 'assets/img/pingu.png',
    },
    {
      img: 'assets/img/female1.png',
    },
    {
      img: 'assets/img/female2.png',
    },
    {
      img: 'assets/img/male1.png',
    },
    {
      img: 'assets/img/male2.png',
    },
  ];


  constructor(public use: UserService, private dialogRef: MatDialogRef<DialogUpdateContactComponent>) {
    if (this.use.currentUserId == 'TzlCRRHBcjQ30Oml2Tb8') {
      this.isGuest = true;
    } else {
      this.isGuest = false;
    }
  }


  /**
   * sets which image was selected
   * @param imageId number in array
   */
  setSelectedImageId(imageId) {
    this.selectedImageId = imageId;
  }


  /**
   * save selected img and close dialog
   */
  saveImage() {
    this.dialogRef.close(this.selectedImageId);
  }


  /**
   * close dialog
   */
  closeDialogImage() {
    this.dialogRef.close();
  }
}
