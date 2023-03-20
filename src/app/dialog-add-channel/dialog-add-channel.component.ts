import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-dialog-add-channel',
  templateUrl: './dialog-add-channel.component.html',
  styleUrls: ['./dialog-add-channel.component.scss']
})
export class DialogAddChannelComponent {
  loading = false;

  constructor(public use: UserService, private route: ActivatedRoute, private firestore: AngularFirestore, private dialogRef: MatDialogRef<DialogAddChannelComponent>) { }

/**
 * closes the dialog
 */
  closeDialogChannel() {
    this.dialogRef.close();
  }

}
