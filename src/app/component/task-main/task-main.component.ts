import { Component, AfterViewInit } from '@angular/core';
import { TaskListsModel, PRIORITY_ENUM, TaskModel, ResultDataModel, ResultTypeEnum, UserModel } from './../../Model/task-main.models';
import { TaskConfigList } from './task-list-config';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';
// import * as $ from 'jquery';

declare var $: any;

@Component({
  selector: 'app-task-main',
  templateUrl: './task-main.component.html',
  styleUrls: ['./task-main.component.scss']
})
export class TaskMainComponent implements AfterViewInit {
  public taskLists: TaskListsModel[] = TaskConfigList;
  public userList: UserModel[] = [];

  constructor(
    private dialog: MatDialog
  ) { }

  ngAfterViewInit(): void {
    this.getSavedUsers();
    this.getSavedTaskList();
  }

  public drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.saveTasksInLocalStorage();
  }

  public deleteTask(event, listId) {
    this.taskLists[listId].list.splice(event.id, 1);
    this.saveTasksInLocalStorage();
  }

  public createNewTask() {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '500px',
      data: {
        userList: this.userList.map(e => e.username)
      }
    });

    dialogRef.afterClosed().subscribe((result: ResultDataModel) => {
      if (result) {
        if (result.type === ResultTypeEnum.task) {
          this.addTask(result);
        } else if (result.type === ResultTypeEnum.user) {
          this.addUser(result);
        }
      }
    });
  }

  private addTask(result: ResultDataModel) {
    if (result.content) {
      if (result.extra.endDate) {
        const date = new Date(result.extra.endDate);
        result.extra.endDate = date.toDateString();
      }
      this.taskLists[0].list.push(result);
      this.saveTasksInLocalStorage();
    }
  }

  private addUser(result: ResultDataModel) {
    if (result.extra.user) {
      this.userList.push({
        username: result.extra.user[0]
      });
      this.saveUsersInLocalStorage();
    }
  }

  private saveTasksInLocalStorage() {
    window.localStorage.tasks = JSON.stringify(this.taskLists);
  }

  private saveUsersInLocalStorage() {
    window.localStorage.users = JSON.stringify(this.userList);
  }

  private getSavedTaskList() {
    if (window.localStorage.tasks) {
      this.taskLists = JSON.parse(window.localStorage.tasks);
    }
  }

  private getSavedUsers() {
    if (window.localStorage.users) {
      this.userList = JSON.parse(window.localStorage.users);
    }
  }

}
