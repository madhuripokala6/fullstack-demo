import { Injectable, NotFoundException } from '@nestjs/common';

interface Registration {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  teamName?: string;
  idea: string;
}

@Injectable()
export class RegistrationService {
  private registrations: Registration[] = [];

  // Create a new registration
  createRegistration(registration: Omit<Registration, 'id'>): Registration {
    const newRegistration = { id: Date.now().toString(), ...registration };
    this.registrations.push(newRegistration);
    return newRegistration;
  }

  // Get all registrations
  getRegistrations(): Registration[] {
    return this.registrations;
  }

  // Get single registration by ID
  getRegistrationById(id: string): Registration {
    const registration = this.registrations.find((r) => r.id === id);
    if (!registration) {
      throw new NotFoundException('Registration not found');
    }
    return registration;
  }

  // Update a registration
  updateRegistration(id: string, updatedFields: Partial<Registration>): Registration {
    const registrationIndex = this.registrations.findIndex((r) => r.id === id);
    if (registrationIndex === -1) {
      throw new NotFoundException('Registration not found');
    }
    this.registrations[registrationIndex] = {
      ...this.registrations[registrationIndex],
      ...updatedFields,
    };
    return this.registrations[registrationIndex];
  }

  // Delete a registration
  deleteRegistration(id: string): void {
    const registrationIndex = this.registrations.findIndex((r) => r.id === id);
    if (registrationIndex === -1) {
      throw new NotFoundException('Registration not found');
    }
    this.registrations.splice(registrationIndex, 1);
  }
}
