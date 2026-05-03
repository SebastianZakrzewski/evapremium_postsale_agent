import { Module } from '@nestjs/common';
import { AgentController } from './agent.controller';

/** Feature module for the postsale agent; register orchestration and HTTP entrypoints here. */
@Module({
  imports: [],
  controllers: [AgentController],
  providers: [],
  exports: [],
})
export class AgentModule {}
