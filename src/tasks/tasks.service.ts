import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  private readonly tasks: Task[] = [];

  public getAllTasks(): Task[] {
    return this.tasks;
  }
}
