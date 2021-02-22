import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import TestUtil from './../common/test/TestUtil';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, 
      {
        provide: getRepositoryToken(User),
        useValue: mockRepository
      }],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  beforeEach(() =>{
    mockRepository.find.mockReset()
    mockRepository.findOne.mockReset()
    mockRepository.create.mockReset()
    mockRepository.save.mockReset()
    mockRepository.update.mockReset()
    mockRepository.delete.mockReset()
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllUsers', () => {
    it('should be list all users', async () => {
      const user = TestUtil.giveAMeAValidUser();
      mockRepository.find.mockReturnValue([user, user])
      const users = await service.findAllUser();
      expect(users).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1)
    })
  })

  describe('findUserById', () => {
    it('should find a existing user', async () => {
      const user = TestUtil.giveAMeAValidUser();
      mockRepository.findOne.mockReturnValue(user);
      const userFound = await service.findUserById('1')
      expect(userFound).toMatchObject({name: user.name})
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1)
    })
    it('should return a exception when does not find a user', async () => {
      mockRepository.findOne.mockReturnValue(null);
      expect(service.findUserById('3')).rejects.toBeInstanceOf(NotFoundException)
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1)
    })
  })

    describe('create user', () => {
      it('should create a user', async () =>{
        const user = TestUtil.giveAMeAValidUser()
        mockRepository.save.mockReturnValue(user)
        mockRepository.create.mockReturnValue(user)
        const savedUser = await service.createUser(user)

        expect(savedUser).toMatchObject(user)
        expect(mockRepository.create).toHaveBeenCalledTimes(1)
        expect(mockRepository.save).toHaveBeenCalledTimes(1)
      })
      it('should return a exception when dosent create a user', async ()=>{
        const user = TestUtil.giveAMeAValidUser()
        mockRepository.create.mockReturnValue(user)
        mockRepository.save.mockReturnValue(null)

        await service.createUser(user).catch(e => {
          expect(e).toBeInstanceOf(InternalServerErrorException)
          expect(e).toMatchObject({
            message: 'Problema para criar um usuario.'
          })
        })
        expect(mockRepository.create).toHaveBeenCalledTimes(1)
        expect(mockRepository.save).toHaveBeenCalledTimes(1)
      })
    })
});
