import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/services/user.service';
import { NavbarService } from '../../services/navbar.service';


@Component({
  selector: 'app-dialog-members',
  templateUrl: './dialog-members.component.html',
  styleUrls: ['./dialog-members.component.scss']
})
export class DialogMembersComponent {
  allUsers = [];
  whichContentShouldLoad;

  constructor(public use: UserService, public nav: NavbarService, private firestore: AngularFirestore, private dialogRef: MatDialogRef<DialogMembersComponent>) {
  }


  /**
   * downloads from the respective document the participant information 
   */
  ngOnInit() {
    this.allUsers = [];
    this.firestore.collection(this.whichContentShouldLoad[0]).doc(this.whichContentShouldLoad[1]).valueChanges({ idField: 'docId' }).subscribe((doc: any) => {
      doc.participants.forEach((participant: any) => {
        this.firestore.collection('users').doc(participant).get().toPromise().then((doc: any) => {
          const user = doc.data();
          user.docId = participant;
          this.allUsers.push(user);
        });
      });
    });
  }


  /**
   * opens navbar right and sets which user should be loaded
   * @param user user information
   */
  showMemberProfile(user) {
    this.nav.openRight();
    this.closeDialogMembers();
    this.nav.whichProfileShouldLoad.next(user.docId);
  }


  /**
   * close dialog
   */
  closeDialogMembers(){
    this.dialogRef.close();
  }
}