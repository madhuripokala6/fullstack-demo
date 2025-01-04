import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { RegistrationService } from './registration.service';

@Controller('api/registrations')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  createRegistration(@Body() registration: Omit<any, 'id'>): any {
    return this.registrationService.createRegistration(registration);
  }

  @Get()
  getAllRegistrations(): any {
    return this.registrationService.getRegistrations();
  }

  @Get(':id')
  getRegistrationById(@Param('id') id: string): any {
    return this.registrationService.getRegistrationById(id);
  }

  @Put(':id')
  updateRegistration(@Param('id') id: string, @Body() updatedFields: Partial<any>): any {
    return this.registrationService.updateRegistration(id, updatedFields);
  }

  @Delete(':id')
  deleteRegistration(@Param('id') id: string) {
    this.registrationService.deleteRegistration(id);
    return { message: 'Registration deleted successfully' };
  }
}
