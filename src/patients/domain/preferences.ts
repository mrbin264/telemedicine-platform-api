import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class Preferences {
  @Allow()
  @ApiProperty({ example: 'en' })
  preferredLanguage: string;

  @Allow()
  @ApiProperty({ example: 'email', enum: ['email', 'sms', 'phone'] })
  preferredContactMethod: string;

  @Allow()
  @ApiProperty({
    type: 'object',
    properties: {
      reminders: { type: 'boolean', example: true },
      testResults: { type: 'boolean', example: true },
      promotions: { type: 'boolean', example: true },
    },
  })
  notificationSettings: {
    reminders: boolean;
    testResults: boolean;
    promotions: boolean;
  };
}
