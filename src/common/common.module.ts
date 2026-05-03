import { Global, Module } from '@nestjs/common';

/** Shared cross-cutting providers; register feature-specific shared code here. */
@Global()
@Module({
  exports: [],
})
export class CommonModule {}
