import { Module } from '@nestjs/common';
import { AgentModule } from './agent/agent.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CoreModule, CommonModule, AgentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
