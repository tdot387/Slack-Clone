import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogChangeImgComponent } from '../dialog-change-img/dialog-change-img.component';
import { DialogUpdateContactComponent } from '../dialog-update-contact/dialog-update-contact.component';
import { DialogUpdateProfileNameComponent } from '../dialog-update-profile-name/dialog-update-profile-name.component';
import { NavbarService } from '../../services/navbar.service';
import { UserService } from 'src/services/user.service';


@Component({
  selector: 'app-navbar-right',
  templateUrl: './navbar-right.component.html',
  styleUrls: ['./navbar-right.component.scss']
})
export class NavbarRightComponent {
  userId: string;
  public profileImgSrc = '';
  public firstName;
  public lastName;
  public email;
  public phone;
  isItMe = true;
  isGuest;

  constructor(public use: UserService, public nav: NavbarService, private firestore: AngularFirestore, public dialog: MatDialog) { 

    if(this.use.currentUserId == 'TzlCRRHBcjQ30Oml2Tb8') {
      this.isGuest = true;
    } else {
      this.isGuest = false;
    }
  }


  /**
   * which profile should be loaded
   */
  ngOnInit(): void {
    this.nav.whichProfileShouldLoad.subscribe((id) => {
      if (id == this.use.currentUserId) {
        this.isItMe = true;
        this.loadUserInfos(id);
      } else {
        this.isItMe = false;
        this.loadUserInfos(id);
      }
    })
  }


  /**
   * loads and sets the information from the profile
   */
  loadUserInfos(id){
    this.firestore.collection('users').doc(id).valueChanges(id).subscribe((user: any) => {
      this.firstName = user.userInfos.firstName;
      this.lastName = user.userInfos.lastName;
      this.email = user.userInfos.email;
      this.phone = user.userInfos.phone;
      this.profileImgSrc = user.userInfos.profileImg;
    });
  }


  /**
   * opens a dialog window
   */
  openDialog() {
    this.dialog.open(DialogUpdateProfileNameComponent);
  }


  /**
   * opens a dialog window
   */
  openDialogContact() {
    this.dialog.open(DialogUpdateContactComponent);
  }


  /**
   * opens a dialog window and updates the profile picture
   */
  openDialogChangeImg() {
    const dialogImage = this.dialog.open(DialogChangeImgComponent);
    dialogImage.afterClosed().subscribe(result => {
      if (result) {
        this.profileImgSrc = `../../${result}`;
        this.firestore.collection('users').doc(this.use.currentUserId).update({
          'userInfos.profileImg': this.profileImgSrc,
        })
      }
    });
  }


  /**
   * opens and closes the right navbar
   */
  closeNavbarRight() {
    this.nav.toggleRight();
  }
}
