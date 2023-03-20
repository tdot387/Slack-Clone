import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlackOverviewComponent } from './slack-overview/slack-overview.component';
import { HeaderComponent } from './header/header.component';
import { NavbarLeftComponent } from './navbar-left/navbar-left.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/'; 
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesHistoryComponent } from './messages-history/messages-history.component';
import { LoginComponent } from './login/login.component';
import { DialogUpdateProfileNameComponent } from './dialog-update-profile-name/dialog-update-profile-name.component';
import { DialogUpdateContactComponent } from './dialog-update-contact/dialog-update-contact.component';
import { NgxEditorModule } from 'ngx-editor';
import { DialogAddTeamMemberComponent } from './dialog-add-team-member/dialog-add-team-member.component';
import { DialogAddChannelComponent } from './dialog-add-channel/dialog-add-channel.component';
import { DialogAddGroupComponent } from './dialog-add-group/dialog-add-group.component';
import { DialogChangeImgComponent } from './dialog-change-img/dialog-change-img.component';
import { ImprintDataprotectionComponent } from './imprint-dataprotection/imprint-dataprotection.component';
import { DialogMembersComponent } from './dialog-members/dialog-members.component';
import { DialogAddMemberToGroupComponent } from './dialog-add-member-to-group/dialog-add-member-to-group.component';
import { NavbarRightComponent } from './navbar-right/navbar-right.component';
import { NavbarService } from '../services/navbar.service';
import { UserService } from 'src/services/user.service';
import { SearchBarService } from 'src/services/searchBar.service';

@NgModule({
  declarations: [
    AppComponent,
    SlackOverviewComponent,
    HeaderComponent,
    NavbarLeftComponent,
    MessagesHistoryComponent,
    LoginComponent,
    DialogUpdateProfileNameComponent,
    DialogUpdateContactComponent,
    DialogAddTeamMemberComponent,
    DialogAddChannelComponent,
    DialogAddGroupComponent,
    DialogChangeImgComponent,
    ImprintDataprotectionComponent,
    DialogMembersComponent,
    DialogAddMemberToGroupComponent,
    NavbarRightComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatTooltipModule,
    MatTreeModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
  ],
  providers: [NavbarService, UserService, SearchBarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
