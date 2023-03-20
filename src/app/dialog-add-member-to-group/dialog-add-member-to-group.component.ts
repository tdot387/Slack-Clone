import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-dialog-add-member-to-group',
  templateUrl: './dialog-add-member-to-group.component.html',
  styleUrls: ['./dialog-add-member-to-group.component.scss']
})
export class DialogAddMemberToGroupComponent {
  allUsers = [];
  memberId;
  whichContentShouldLoad;
  groupDoc;
  withWhoMakeGroup
  constructor(public use: UserService, private dialogRef: MatDialogRef<DialogAddMemberToGroupComponent>, private route: ActivatedRoute, private firestore: AngularFirestore) {
  }

  loading = false;


  /**
     * checks whether logged in user is already part of a group; hides user if true 
     */
  ngOnInit(): void {
    let self = this;
    this.firestore.collection('users').valueChanges({ idField: 'docId' }).subscribe((users: any) => {
      this.allUsers = users;
      this.allUsers.forEach(function (user, i) {
        let result = user.docId === self.use.currentUserId;
        if (result) {
          self.allUsers.splice(i, 1)
        }
        if (i === self.allUsers.length - 1) {
          self.checkIsItGuest();
        }
      })
    });
  }


  /**
   * check is it a guest, if yes splice him
   */
  checkIsItGuest() {
    let self = this;
    this.allUsers.forEach(function (user, i) {
      let result = user.docId === 'TzlCRRHBcjQ30Oml2Tb8';
      if (result) {
        self.allUsers.splice(i, 1)
        self.checkAllUsers();
      }
    });
  }


  /**
    * checks whether other users are already part of a group; hides them if true 
    */

  checkAllUsers() {
    let self = this;
    this.allUsers.forEach(function (user, i) {
      self.withWhoMakeGroup.forEach((id) => {
        let result = user.docId === id;
        if (result) {
          self.allUsers.splice(i, 1);
          self.checkAllUsers();
        }
      })
    });
  }

/**
 * pushes data of users and groups in database
 */

  save() {
    this.firestore.collection(this.whichContentShouldLoad[0]).doc(this.whichContentShouldLoad[1]).get().toPromise().then((doc: any) => {
      let docData = doc.data();
      docData.participants.push(this.memberId);
      this.updateCommunicationSections(docData);
    });
    this.firestore.collection('users').doc(this.memberId).get().toPromise().then((doc: any) => {
      const docData = doc.data();
      docData.communicationSections.groups.push(this.whichContentShouldLoad[1]);
      this.updateUserCommunicationSections(docData);
    });
    this.dialogRef.close();
  }

  /**
      * closes dialog 
      */

  closeDialogAddMember() {
    this.dialogRef.close();
  }

  /**
    * updates users in database 
    */
  updateCommunicationSections(docData) {
    this.firestore.collection(this.whichContentShouldLoad[0]).doc(this.whichContentShouldLoad[1]).update({
      "participants": docData.participants
    });
  }

  /**
     * updates groups in database 
     */
  updateUserCommunicationSections(docData) {
    this.firestore.collection('users').doc(this.memberId).update({
      "communicationSections.groups": docData.communicationSections.groups
    });
  }

}
