import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { group } from 'src/models/group';
import 'firebase/compat/firestore';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-dialog-add-group',
  templateUrl: './dialog-add-group.component.html',
  styleUrls: ['./dialog-add-group.component.scss']
})
export class DialogAddGroupComponent {
  loading = false;
  group;
  groupsIds = [];
  isGuest;

  constructor(public use: UserService, private route: ActivatedRoute, private firestore: AngularFirestore, private dialogRef: MatDialogRef<DialogAddGroupComponent>) {
    this.group = group;
    if(this.use.currentUserId == 'TzlCRRHBcjQ30Oml2Tb8') {
      this.isGuest = true;
    } else {
      this.isGuest = false;
    }
  }

/**
 * adds new groups to database
 */
  saveGroup() {
    if (this.group.headline !== '') {
      this.loading = true;
      this.firestore.collection('groups').add(this.group).then((docRef) => {
        const newGroupId = docRef.id;
        this.pushNewGroupToArray(newGroupId);
      });
    }
    this.group.headline = '';
  }

/**
 * pushes new group into database
 * @param newGroupId the ID of the new group
 */

  pushNewGroupToArray(newGroupId) {
    this.firestore.collection('users').doc(this.use.currentUserId).get().toPromise().then((userDoc) => {
      const currentUser: any = userDoc.data();
      const currentGroups = currentUser.communicationSections.groups;
      currentGroups.push(newGroupId);
      this.updateGroup(newGroupId);
      this.updateUser(currentGroups);
    });
  }


/**
 * updates users in group
 * @param newGroupId the ID of the new group
 */
  updateGroup(newGroupId) {
    this.firestore.collection('groups').doc(newGroupId).update({
      'participants': [this.use.currentUserId]
    }).then(() => {
    })
  }

/**
 * adds/deletes users to/from groups
 * @param currentGroups already existing groups
 */

  updateUser(currentGroups) {
    this.firestore.collection('users').doc(this.use.currentUserId).update({
      'communicationSections.groups': currentGroups
    }).then(() => {
      this.loading = false;
      this.dialogRef.close();
    })
  }

/**
 * closes the dialog
 */
  closeDialogGroup() {
    this.dialogRef.close();
  }

}
