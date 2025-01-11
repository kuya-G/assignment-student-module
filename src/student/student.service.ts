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

    async getStudents(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    async getStudentById(id: number): Promise<Student> {
        const student = await this.studentRepository.findOneBy({ id });
        if (!student) {
          throw new NotFoundException(`Student with ID ${id} not found`);
        }
        return student;
      }
}
