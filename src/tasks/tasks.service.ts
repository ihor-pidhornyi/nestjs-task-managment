import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  // public getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  //
  // public getTasks(filterDto: GetTasksFilterDto): Task[] {
  //   const { search, status } = filterDto;
  //
  //   let tasks: Task[] = this.getAllTasks();
  //
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.toLowerCase().includes(search.toLowerCase()) ||
  //         task.description.toLowerCase().includes(search.toLowerCase()),
  //     );
  //   }
  //
  //   return tasks;
  // }
  //

  public async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  public createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  public async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} wasn't found`);
    }
  }

  // public updateTaskStatus(id: string, taskStatus: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = taskStatus;
  //   return task;
  // }
}
