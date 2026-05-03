import { Module } from '@nestjs/common';
import { AgentController } from './agent.controller';
import { AgentOrchestrationService } from './services/agent-orchestration.service';

/** Feature module for the postsale agent; register orchestration and HTTP entrypoints here. */
@Module({
  imports: [],
  controllers: [AgentController],
  providers: [AgentOrchestrationService],
  exports: [],
})
export class AgentModule {}
