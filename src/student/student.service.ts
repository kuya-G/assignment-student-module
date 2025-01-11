import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
    ) {}

    async createStudent(date: Partial<Student>): Promise<Student> {
        const student = this.studentRepository.create(date);
        return this.studentRepository.save(student);
    }
}
