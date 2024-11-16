import { RabotEnum } from "@/rabot.enum";
import { z } from "zod";

export const GetUserBotResTransformer = z
  .object({
    id: z.string(),
    botType: z.nativeEnum(RabotEnum),
    botWalletId: z.string(),
    botWalletAddress: z.string(),
    userWalletAddress: z.string(),
    smartWalletAddress: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .or(z.null());
