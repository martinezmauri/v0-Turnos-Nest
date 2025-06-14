import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeRepository } from './employee.repository';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}
  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return await this.employeeRepository.create(createEmployeeDto);
  }

  async findByBusinessId(businessId: string): Promise<Employee[]> {
    return await this.employeeRepository.findByBusinessId(businessId);
  }

  async findByUserId(userId: string): Promise<Employee[]> {
    return await this.employeeRepository.findByUserId(userId);
  }

  async findOne(id: string): Promise<Employee> {
    return await this.employeeRepository.findOne(id);
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    return await this.employeeRepository.update(id, updateEmployeeDto);
  }

  async remove(id: string): Promise<string> {
    return await this.employeeRepository.remove(id);
  }
}
