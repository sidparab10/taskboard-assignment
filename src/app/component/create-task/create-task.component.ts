import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResultDataModel, ResultTypeEnum } from './../../Model/task-main.models';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
  public resultData: ResultDataModel;
  public taskContent = '';
  public selectedPriority = 0;
  public attachCheck = false;
  public endDate;
  public username = '';
  public userList: string[] = [];
  public userControl = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<CreateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userList = data.userList;
  }

  public closePopup(): void {
    this.dialogRef.close();
  }

  public createTask() {
    this.resultData = new ResultDataModel();
    this.resultData.type = ResultTypeEnum.task;
    this.resultData.content = this.taskContent;
    this.resultData.priority = Number(this.selectedPriority);
    if (this.attachCheck) {
      this.resultData.extra.attachment = this.attachCheck;
    }
    if (this.endDate) {
      this.resultData.extra.endDate = this.endDate;
    }
    if (this.userControl.value && this.userControl.value.length) {
      this.resultData.extra.user = this.userControl.value;
    }
    this.dialogRef.close(this.resultData);
  }

  public createUser() {
    this.resultData = new ResultDataModel();
    this.resultData.type = ResultTypeEnum.user;
    this.resultData.extra.user = [this.username];
    this.dialogRef.close(this.resultData);
  }

}
