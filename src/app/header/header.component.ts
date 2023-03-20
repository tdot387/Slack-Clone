import { Component, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ImprintDataprotectionComponent } from '../imprint-dataprotection/imprint-dataprotection.component';
import { MatDialog } from '@angular/material/dialog';
import { NavbarService } from '../../services/navbar.service';
import { UserService } from 'src/services/user.service';
import { SearchBarService } from 'src/services/searchBar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  public profileImgSrc = '';
  enteredSearchValue: string = '';

  constructor(public search: SearchBarService, public use: UserService, public nav: NavbarService, public elementRef: ElementRef, private firestore: AngularFirestore, public dialog: MatDialog) { }

  /**
   * load user information 
   */
  ngOnInit(): void {
    this.firestore.collection('users').doc(this.use.currentUserId).valueChanges().subscribe((user: any) => {
      this.profileImgSrc = user.userInfos.profileImg;
    });
  }


  /**
   *  
   *open dialog
   */
  openImprint() {
    this.dialog.open(ImprintDataprotectionComponent);
  }


  /**
   * ouput search text
   */
  onSearchTextChanged(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.search.enteredSearchValue = inputElement.value;
      this.nav.autoScroll = true;
      setTimeout(() => {
        this.nav.autoScroll = false;
      }, 300);
    }
  

  /**
   * open or close navbar left
   */
  toggleNavbarLeft() {
    this.nav.toggleLeft();
  }


  /**
   * open or close navbar right and whisch profile should load
   */
  openNavbarRight() {
    this.nav.toggleRight();
    this.nav.whichProfileShouldLoad.next(this.use.currentUserId);
  }
}

