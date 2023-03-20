import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogAddGroupComponent } from '../dialog-add-group/dialog-add-group.component';

@Component({
  selector: 'app-imprint-dataprotection',
  templateUrl: './imprint-dataprotection.component.html',
  styleUrls: ['./imprint-dataprotection.component.scss']
})
export class ImprintDataprotectionComponent {

  constructor(private dialogRef: MatDialogRef<DialogAddGroupComponent>) { }


  /**
   * close dialog
   */
  closeImprint() {
    this.dialogRef.close();
  }
}
