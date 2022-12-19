import { SendNotification } from '@application/use-cases/send-notification';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

interface SendNotificationPayload {
  content: string;
  category: string;
  recipientId: string;
}

@Controller()
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @EventPattern('notificcations.send-notification')
  async handleSendNotification(
    @Payload() { category, content, recipientId }: SendNotificationPayload,
  ) {
    await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });
  }
}