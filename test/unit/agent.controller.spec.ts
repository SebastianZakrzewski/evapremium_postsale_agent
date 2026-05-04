import { Test, TestingModule } from '@nestjs/testing';
import { AgentController } from '../../src/agent/agent.controller';
import { AgentOrchestrationService } from '../../src/agent/services/agent-orchestration.service';

describe('AgentController', () => {
  let agentController: AgentController;
  let agentOrchestrationService: jest.Mocked<{ runAgent: jest.Mock }>;

  beforeEach(async (): Promise<void> => {
    agentOrchestrationService = {
      runAgent: jest.fn(),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AgentController],
      providers: [
        {
          provide: AgentOrchestrationService,
          useValue: agentOrchestrationService,
        },
      ],
    }).compile();

    agentController = app.get<AgentController>(AgentController);
  });

  describe('runChat', () => {
    it('maps ChatRequestDto to RunAgentInput and returns service result', async (): Promise<void> => {
      const expectedChatResponse = { reply: 'hello', sessionId: 's1' };
      agentOrchestrationService.runAgent.mockResolvedValue(expectedChatResponse);

      const actual = await agentController.runChat({
        message: 'Hi',
        sessionId: 's1',
      });

      expect(actual).toStrictEqual(expectedChatResponse);
      expect(agentOrchestrationService.runAgent).toHaveBeenCalledWith({
        message: 'Hi',
        sessionId: 's1',
      });
    });
  });
});
