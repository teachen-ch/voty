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

// TODO Step 7: queryField/mutationField for:
//   - cards (keywords/age/type args), setCards (teamId/cards args)
