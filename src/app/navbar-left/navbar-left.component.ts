import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { NavbarService } from 'src/services/navbar.service';
import { UserService } from 'src/services/user.service';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { DialogAddGroupComponent } from '../dialog-add-group/dialog-add-group.component';
import { DialogAddTeamMemberComponent } from '../dialog-add-team-member/dialog-add-team-member.component';

@Component({
  selector: 'app-navbar-left',
  templateUrl: './navbar-left.component.html',
  styleUrls: ['./navbar-left.component.scss']
})

export class NavbarLeftComponent implements OnInit {
  @Input() groupId: string;
  public communicationSections;
  channels = [];
  groups = [];
  directMessages = [];
  headlinesOfDirectMessages = [];
  withWhoDirectMessages = [];
  @Output() whichContentShouldLoad = new EventEmitter<any>();

  constructor(public use: UserService, public nav: NavbarService, private firestore: AngularFirestore, public dialog: MatDialog) {
  }

  autoScrollOn() {
    this.nav.autoScroll = true;
    setTimeout(() => {
      this.nav.autoScroll = false;
    }, 300);
  }


  /**
   * load all chats and set the information to open the general channel by default
   */
  ngOnInit() {
    this.loadCommunicationSectionsFromFirestore();
    this.openMessageHistory('KlTnEdj7XuVLzYnB13Iw', 'channels', 'General', true);
  }


  /**
   * load the information for the user 
   */
  loadCommunicationSectionsFromFirestore() {
    this.firestore.collection('users').doc(this.use.currentUserId).valueChanges().subscribe((user: any) => {
      this.communicationSections = user.communicationSections;
      this.loadChannels();
      this.loadGroups();
      this.loadDirectMessages();
    });
  }


  /**
   * load the information for the channel
   */
  loadChannels() {
    let channels = [];
    let alreadyUsedIds = [];
    this.communicationSections.channels.forEach(channelId => {
      this.firestore.collection('channels').doc(channelId).valueChanges({ idField: 'docId' }).subscribe((channel: any) => {
        let result = alreadyUsedIds.filter(id => id.includes(channelId))
        if (result.length == 0 || alreadyUsedIds.length == 0) {
          alreadyUsedIds.push(channelId)
          channels.push(channel);
        }
      });
    });
    this.channels = channels;
  }


  /**
   * load the information for the groups
   */
  loadGroups() {
    let groups = [];
    let alreadyUsedIds = [];
    this.communicationSections.groups.forEach(groupId => {
      this.firestore.collection('groups').doc(groupId).valueChanges({ idField: 'docId' }).subscribe((group: any) => {
        let result = alreadyUsedIds.filter(id => id.includes(groupId))
        if (result.length == 0 || alreadyUsedIds.length == 0) {
          alreadyUsedIds.push(groupId)
          groups.push(group);
        }
      });
    });
    this.groups = groups;
  }


  /**
   * load the information for the direct messages
   */
  loadDirectMessages() {
    let directMessages = [];
    let alreadyUsedIds = [];
    this.withWhoDirectMessages = [];
    this.headlinesOfDirectMessages = [];
    this.communicationSections.directMessages.forEach(directMessageId => {
      this.firestore.collection('directMessages').doc(directMessageId).valueChanges({ idField: 'docId' }).subscribe((directMessage: any) => {
        let result = alreadyUsedIds.filter(id => id.includes(directMessageId))
        if (result.length == 0 || alreadyUsedIds.length == 0) {
          alreadyUsedIds.push(directMessageId)
          directMessages.push(directMessage);
          this.loadUserNameDown(directMessage.participants);
        }
      });
    });
    this.directMessages = directMessages;
  }


/**
 * loads the name for the heading from the other participant
 * @param participants participants from chat
 */
  loadUserNameDown(participants) {
    participants.forEach(id => {
      if (id !== this.use.currentUserId) {
        this.withWhoDirectMessages.push(id);
        this.firestore.collection('users').doc(id).get().toPromise().then((doc: any) => {
          const user = doc.data();
          let result = this.headlinesOfDirectMessages.filter(id => id.includes(`${user.userInfos.firstName} ${user.userInfos.lastName}`))
          if (result.length == 0) {
            this.headlinesOfDirectMessages.push(`${user.userInfos.firstName} ${user.userInfos.lastName}`);
          }
        })
      }
    });
  }


  /**
   * opens a dialog
   */
  openDialogChannel() {
    this.dialog.open(DialogAddChannelComponent);
  }
 

  /**
   * opens a dialog
   */
  openDialogGroups() {
    this.dialog.open(DialogAddGroupComponent);
  }


  /**
   * opens a dialog
   */
  openDialogMember() {
    const dialog = this.dialog.open(DialogAddTeamMemberComponent);
    dialog.componentInstance.withWhoDirectMessages = this.withWhoDirectMessages;
  }


  /**
   * sets what should be loaded
   * @param id id of document
   * @param collection name of collection
   * @param headline text for headline
   */
  openMessageHistory(id, collection, headline, boolean) {
    if (!boolean && window.innerWidth <= 620) {
      this.nav.showNavbarLeft = false;
      this.nav.showContent = true;
    }
    this.whichContentShouldLoad.emit([collection, id, headline]);
  }
}