import type { z } from 'zod';

import type {
  CreateBotReqTransformer,
  GetBotResTransformer,
  ListBotsTransformer,
} from '../transformer/rabot.dto';

export type TCreateBotReqDto = z.infer<typeof CreateBotReqTransformer>;
export type TCreateBotResDto = z.infer<typeof CreateBotResTransformer>;

export type TListBotsResDto = z.infer<typeof ListBotsTransformer>;

export type TGetBotResDto = z.infer<typeof GetBotResTransformer>;