import { builder } from "../builder";

export const Card = builder.objectRef<{
  id?: string;
  title?: string;
  description?: string;
  duration?: string;
  age?: string;
  keywords?: string;
  type?: string;
  icon?: string;
  url?: string;
  source?: string;
  content?: string;
  discussion?: boolean;
  show?: string;
}>("Card").implement({
  fields: (t) => ({
    id: t.string({ nullable: true, resolve: (p) => p.id ?? null }),
    title: t.string({ nullable: true, resolve: (p) => p.title ?? null }),
    description: t.string({
      nullable: true,
      resolve: (p) => p.description ?? null,
    }),
    duration: t.string({ nullable: true, resolve: (p) => p.duration ?? null }),
    age: t.string({ nullable: true, resolve: (p) => p.age ?? null }),
    keywords: t.string({ nullable: true, resolve: (p) => p.keywords ?? null }),
    type: t.string({ nullable: true, resolve: (p) => p.type ?? null }),
    icon: t.string({ nullable: true, resolve: (p) => p.icon ?? null }),
    url: t.string({ nullable: true, resolve: (p) => p.url ?? null }),
    source: t.string({ nullable: true, resolve: (p) => p.source ?? null }),
    content: t.string({ nullable: true, resolve: (p) => p.content ?? null }),
    discussion: t.boolean({
      nullable: true,
      resolve: (p) => p.discussion ?? null,
    }),
    show: t.string({ nullable: true, resolve: (p) => p.show ?? null }),
  }),
});

import { TeamType } from "./teams";

builder.queryField("cards", (t) =>
  t.field({
    type: [Card],
    nullable: true,
    args: {
      keywords: t.arg.string(),
      age: t.arg.string(),
      type: t.arg.string(),
    },
    resolve: async (_root, args, ctx, info) => {
      const { cards } = await import("../resolvers");
      return cards.cards(_root, args, ctx, info) as any;
    },
  })
);

builder.mutationField("setCards", (t) =>
  t.prismaField({
    type: "Team",
    authScopes: { teacher: true },
    args: {
      teamId: t.arg.string({ required: true }),
      cards: t.arg.string({ required: true }),
    },
    resolve: async (_query, _root, args, ctx, info) => {
      const { cards } = await import("../resolvers");
      return cards.setCards(_root, args, ctx, info) as any;
    },
  })
);
void TeamType;
