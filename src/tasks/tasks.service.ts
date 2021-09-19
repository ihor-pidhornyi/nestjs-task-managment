import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '2146c9b9-9f05-4846-9d9e-2f1e7edbd7e3',
      title: 'Clean my room',
      description: 'Lots of cleaning has to be done',
      status: TaskStatus.OPEN,
    },
  ];

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  public createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  public deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
