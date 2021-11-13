import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { User } from '../auth/user.entity';
import { Task } from './task.entity';
import { TaskStatus } from './task-status';
import { NotFoundException } from '@nestjs/common';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser: User = {
  username: 'Egor',
  id: 'interestingId',
  password: 'qwerty',
  tasks: [],
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TasksRepository,
          useFactory: mockTasksRepository,
        },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('should call TasksRepository.getTasks and returns the result', async () => {
      tasksRepository.getTasks.mockResolvedValue('tasks');

      const result = await tasksService.getTasks(null, mockUser);

      expect(result).toEqual('tasks');
    });
  });

  describe('getTaskById', () => {
    it('should call TasksRepository.findOne and return the result', async () => {
      const mockTask: Task = {
        id: 'test',
        user: mockUser,
        status: TaskStatus.OPEN,
        description: 'Test description',
        title: 'Test title',
      };
      tasksRepository.findOne.mockResolvedValue(mockTask);

      const result = await tasksService.getTaskById('testId', mockUser);

      expect(result).toEqual(mockTask);
    });
  });
});
