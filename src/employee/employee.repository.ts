import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './entities/employee.entity';
import { In, Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Service } from 'src/service/entities/service.entity';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeHour } from 'src/employee-hours/entities/employee-hour.entity';
import { Business } from 'src/business/entities/business.entity';
import { generateAvatarUrl } from 'src/utils/generate-avatar';

export class EmployeeRepository {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const { businessId, servicesIds, employeeHours, ...employeeData } =
      createEmployeeDto;

    const business = await this.businessRepository.findOneBy({
      id: businessId,
    });
    if (!business) throw new NotFoundException('Negocio no encontrado.');

    const existingEmployee = await this.employeeRepository.findOneBy({
      email: employeeData.email,
    });
    if (existingEmployee) {
      throw new ConflictException('Ya existe un empleado con ese email.');
    }

    const services = await this.serviceRepository.find({
      where: {
        id: In(servicesIds),
        business: { id: businessId },
      },
      relations: ['business'], // necesario si queremos verificar manualmente
    });

    if (services.length !== servicesIds.length) {
      throw new ConflictException(
        'Uno o más servicios no pertenecen a este negocio.',
      );
    }
    const profile_picture = generateAvatarUrl(employeeData.name);

    const employee = this.employeeRepository.create({
      ...employeeData,
      business,
      services,
      employeeHours,
      profile_picture,
    });

    return await this.employeeRepository.save(employee);
  }

  async findByBusinessId(businessId: string): Promise<Employee[]> {
    return await this.employeeRepository.find({
      where: { business: { id: businessId } },
      relations: ['services', 'employeeHours'],
    });
  }

  async findByUserId(userId: string): Promise<Employee[]> {
    return await this.employeeRepository.find({
      where: { business: { user: { id: userId } } },
      relations: ['services', 'employeeHours', 'business'],
    });
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOneBy({ id });

    if (!employee) {
      throw new NotFoundException(`Empleado con id ${id} no fue encontrado`);
    }
    return employee;
  }

  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: ['services', 'employeeHours'],
    });

    if (!employee) {
      throw new NotFoundException('Empleado no encontrado.');
    }

    if (updateEmployeeDto.serviceIds) {
      const services = await this.serviceRepository.findByIds(
        updateEmployeeDto.serviceIds,
      );
      employee.services = services;
    }

    if (updateEmployeeDto.employeeHours) {
      const employeeHoursEntities = updateEmployeeDto.employeeHours.map(
        (dto) => {
          const eh = new EmployeeHour();
          eh.day_of_week = dto.day_of_week;
          eh.opening_morning_time = dto.opening_morning_time;
          eh.closing_morning_time = dto.closing_morning_time;
          eh.opening_evening_time = dto.opening_evening_time ?? null;
          eh.closing_evening_time = dto.closing_evening_time ?? null;
          eh.employee = employee;
          return eh;
        },
      );

      employee.employeeHours = employeeHoursEntities;
    }
    Object.assign(employee, updateEmployeeDto);

    return await this.employeeRepository.save(employee);
  }

  async remove(id: string): Promise<string> {
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: ['services', 'employeeHours'],
    });

    if (!employee) {
      throw new NotFoundException('Empleado no encontrado.');
    }

    employee.services = [];
    await this.employeeRepository.save(employee);

    await this.employeeRepository.delete(id);

    return `Empleado con id ${id} ha sido eliminado.`;
  }
}
