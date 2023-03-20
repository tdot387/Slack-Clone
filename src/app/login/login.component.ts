import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { user } from 'src/models/user';
import { Observable } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private router: Router, private firestore: AngularFirestore) {
    this.user = user;
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  allUser = [];

  matcher = new MyErrorStateMatcher();
  hide = true;
  newUser = false;
  reset = false;
  pushNewUser = false;
  pushResetPw = false;
  toggleReset = false;
  toggle = false;
  userId: string;
  user;

  // Var for create user
  @ViewChild('password') password: ElementRef;
  @ViewChild('passwordRepeat') passwordRepeat: ElementRef;
  @ViewChild('userFirstName') userFirstName: ElementRef;
  @ViewChild('userLastName') userLastName: ElementRef;
  @ViewChild('userMail') userMail: ElementRef;
  @ViewChild('phoneNumber') phoneNumber: ElementRef;

  // Var for Login
  @ViewChild('loginEmail') loginEmail: ElementRef;
  @ViewChild('loginPassword') loginPassword: ElementRef;

  // var for reset Password
  @ViewChild('resetPw') resetPw: ElementRef;
  @ViewChild('resetPwRepeat') resetPwRepeat: ElementRef;
  @ViewChild('resetEmail') resetEmail: ElementRef;

  // var for push text

  ngOnInit() {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'docId' })
      .subscribe((user: any) => {
        this.allUser = user;
      });
  }


  /**
   * Function to generate a new User
   */
  generateUserDoc() {
    if (
      this.password.nativeElement.value ==
      this.passwordRepeat.nativeElement.value
    ) {
      this.firestore
        .collection('users')
        .add(user)
        .then((user) => {
          this.userId = user.id;
          this.updateChannelParticipants();
        });
      this.showNewUserPushtext();
    } else {
      this.showWrongText();
    }
  }


  /**
   *  add new member to channels
   */
  updateChannelParticipants() {
    user.communicationSections.channels.forEach((channelId) => {
      this.firestore
        .collection('channels')
        .doc(channelId)
        .get()
        .toPromise()
        .then((channelDoc) => {
          const currentDoc: any = channelDoc.data();
          const currentParticipants = currentDoc.participants;
          currentParticipants.push(this.userId);
          this.firestore
            .collection('channels')
            .doc(channelId)
            .update({
              participants: currentParticipants,
            })
        });
    });
  }


  /**
   * shows text below input if input is wrong
   */
  showWrongText() {
    this.toggle = true;
      setTimeout(() => {
        this.toggle = false;
      }, 3000);
  }


  /**
   * shows the Push text if create a new User
   */
  showNewUserPushtext(){
    this.pushNewUser = true;
    this.newUser = false;
    setTimeout(() => {
      this.pushNewUser = false;
    }, 3000);
  }


  /**
   * Login for Guest
   */
  guestLogin() {
    this.router.navigateByUrl('/slack/TzlCRRHBcjQ30Oml2Tb8');
  }


  /**
   * Login for User
   */
  UserLogin() {
    let inputPassword = this.loginPassword.nativeElement.value;
    let inputEmail = this.loginEmail.nativeElement.value;

    for (let i = 0; i < this.allUser.length; i++) {
      const email = this.allUser[i]['userInfos']['email'];
      const password = this.allUser[i]['userInfos']['password'];
      const id = this.allUser[i]['docId'];

      if (email === inputEmail && password === inputPassword) {
        this.router.navigateByUrl(`/slack/${id}`);
      } else {
        this.showWrongText();
      }
    }
  }


  /**
   *  reset password for User 
   */
  resetPassword() {
    let inputEmail = this.resetEmail.nativeElement.value;

    for (let i = 0; i < this.allUser.length; i++) {
      const email = this.allUser[i]['userInfos']['email'];
      const id = this.allUser[i]['docId'];

      if (inputEmail === email) {
        this.changePassword(id);
        break;
      } else if (i === this.allUser.length - 1) {
        this.showWrongText();
      }
    }
  }


  /**
   *  change Password for User
   * @param id the id from the User
   */
  changePassword(id: string) {
    let password = this.resetPw.nativeElement.value;
    let repPassword = this.resetPwRepeat.nativeElement.value;

    if (password === repPassword) {
      this.firestore.collection('users').doc(id).update({
        'userInfos.password': this.resetPw.nativeElement.value,
      });
      this.reset = false;
      this.pushResetPw = true;
      setTimeout(() => {
        this.pushResetPw = false;
      }, 3000);
    } else {
      this.showWrongText();
    }
  }


  resetOverview() {
    this.reset = true;
  }


  NewUserOverview() {
    this.newUser = true;
  }
  

  showLogin() {
    this.newUser = false;
    this.reset = false;
  }
}
