import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskModel, PRIORITY_ENUM } from '../../Model/task-main.models';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {

  @Input()
  public taskData: TaskModel;
  @Input()
  public id: number;
  @Output()
  public deleteCurrTask = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  get isExtra() {
    return this.taskData.extra.endDate || this.taskData.extra.attachment || this.taskData.extra.user.length;
  }

  public getPriority(val: PRIORITY_ENUM) {
    switch (val) {
      case PRIORITY_ENUM.low: return 'low';
      case PRIORITY_ENUM.medium: return 'medium';
      case PRIORITY_ENUM.high: return 'high';
    }
  }

  public getUserList(userList: string[]) {
    if (userList.length === 1) {
      return userList[0];
    } else {
      return userList.join('\n');
    }
  }

  public deleteTask() {
    this.deleteCurrTask.emit({
      id: this.id
    });
  }
}
