import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { directMessage } from 'src/models/directMessage';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-dialog-add-team-member',
  templateUrl: './dialog-add-team-member.component.html',
  styleUrls: ['./dialog-add-team-member.component.scss']
})
export class DialogAddTeamMemberComponent {
  memberId;
  loading = false;
  allUsers = [];
  withWhoDirectMessages;
  isGuest;

  constructor(public use: UserService, private firestore: AngularFirestore, private dialogRef: MatDialogRef<DialogAddTeamMemberComponent>) {
    if (this.use.currentUserId == 'TzlCRRHBcjQ30Oml2Tb8') {
      this.isGuest = true;
    } else {
      this.isGuest = false;
    }
  }


  /**
   * load user information
   */
  ngOnInit(): void {
    this.firestore.collection('users').valueChanges({ idField: 'docId' }).subscribe((users: any) => {
      this.loadAllUsers(users);
    });
  }


  /**
   * deletes my user information
   * @param users user information
   */
  loadAllUsers(users) {
    let self = this;
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
   * deletes the user with whom you already have a direct message
   */
  checkAllUsers() {
    let self = this;
    this.allUsers.forEach(function (user, i) {
      self.withWhoDirectMessages.forEach((menberOfDirectMessages) => {
        let result = user.docId === menberOfDirectMessages;
        if (result) {
          self.allUsers.splice(i, 1);
          self.checkAllUsers();
        }
      })
    });
  }


  /**
   * adds a new direct message
   */
  save() {
    if(this.memberId.length > 0) {
    this.loading = true;
    this.firestore.collection('directMessages').add(directMessage).then((docRef) => {
      const newDirectMessageId = docRef.id;
      this.pushNewDirectMessageToArray(newDirectMessageId);
      this.loadUser(newDirectMessageId);
    })
  }
  }


  /**
   * downloads the information from the other participant
   * @param newDirectMessageId id from document
   */
  loadUser(newDirectMessageId) {
    this.firestore.collection('users').doc(this.memberId).get().toPromise().then((doc: any) => {
      const docData = doc.data();
      docData.communicationSections.directMessages.push(newDirectMessageId);
      this.updateUserCommunicationSections(docData);
      this.updateParticipantsDirectMessages(newDirectMessageId);
    });
  }


  /**
   * loads the information from the user
   * @param newDirectMessageId id from document
   */
  pushNewDirectMessageToArray(newDirectMessageId) {
    this.firestore.collection('users').doc(this.use.currentUserId).get().toPromise().then((userDoc) => {
      const currentUser: any = userDoc.data();
      const currentDirectMessagesIds = currentUser.communicationSections.directMessages;
      currentDirectMessagesIds.push(newDirectMessageId);
      this.updateUser(currentDirectMessagesIds);
    });
  }


  /**
   * adds the new direct message to the user and close dialog
   * @param currentDirectMessagesIds id from document
   */
  updateUser(currentDirectMessagesIds) {
    this.firestore.collection('users').doc(this.use.currentUserId).update({
      'communicationSections.directMessages': currentDirectMessagesIds
    }).then(() => {
      this.loading = false;
      this.dialogRef.close();
    })
  }


  /**
   * adds the new direct message to the other participant
   * @param docData information of other participant
   */
  updateUserCommunicationSections(docData) {
    this.firestore.collection('users').doc(this.memberId).update({
      "communicationSections.directMessages": docData.communicationSections.directMessages
    });
  }


  /**
   * adds the participants to the new direct message document
   * @param newDirectMessageId id from document
   */
  updateParticipantsDirectMessages(newDirectMessageId) {
    this.firestore.collection('directMessages').doc(newDirectMessageId).update({
      "participants": [this.use.currentUserId, this.memberId]
    });
  }


  /**
   * close dialog
   */
  closeDialogMember() {
    this.dialogRef.close();
  }
}
