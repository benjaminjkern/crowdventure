import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const AccountScalarFieldEnumSchema = z.enum(['id','screenName','createdAt','updatedAt','encryptedPassword','isAdmin','hidden','profilePicURL','profilePicUnsafe','bio','lastIP','totalNodeViews','totalSuggestionScore']);

export const NodeScalarFieldEnumSchema = z.enum(['id','slug','title','content','createdAt','updatedAt','storedViews','featured','pictureURL','pictureUnsafe','hidden','views','ownerId']);

export const ChoiceScalarFieldEnumSchema = z.enum(['id','slug','action','createdAt','updatedAt','hidden','isCanon','score','fromNodeId','toNodeId','suggestedByAccountId']);

export const FeedbackScalarFieldEnumSchema = z.enum(['id','IP','reportingType','reportingId','info','createdAt','submittedById']);

export const NotificationScalarFieldEnumSchema = z.enum(['id','content','createdAt','link','seen','accountId']);

export const ReactionScalarFieldEnumSchema = z.enum(['id','like','accountId','choiceId']);

export const ViewScalarFieldEnumSchema = z.enum(['id','IP','nodeId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.number().int(),
  screenName: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  encryptedPassword: z.string(),
  isAdmin: z.boolean(),
  hidden: z.boolean(),
  profilePicURL: z.string().nullable(),
  profilePicUnsafe: z.boolean(),
  bio: z.string().nullable(),
  lastIP: z.string(),
  totalNodeViews: z.number().int(),
  totalSuggestionScore: z.number().int(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// NODE SCHEMA
/////////////////////////////////////////

export const NodeSchema = z.object({
  id: z.number().int(),
  slug: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  storedViews: z.number().int(),
  featured: z.boolean(),
  pictureURL: z.string().nullable(),
  pictureUnsafe: z.boolean(),
  hidden: z.boolean(),
  views: z.number().int(),
  ownerId: z.number().int().nullable(),
})

export type Node = z.infer<typeof NodeSchema>

/////////////////////////////////////////
// CHOICE SCHEMA
/////////////////////////////////////////

export const ChoiceSchema = z.object({
  id: z.number().int(),
  slug: z.string(),
  action: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  hidden: z.boolean(),
  isCanon: z.boolean(),
  score: z.number().int(),
  fromNodeId: z.number().int(),
  toNodeId: z.number().int().nullable(),
  suggestedByAccountId: z.number().int().nullable(),
})

export type Choice = z.infer<typeof ChoiceSchema>

/////////////////////////////////////////
// FEEDBACK SCHEMA
/////////////////////////////////////////

export const FeedbackSchema = z.object({
  id: z.number().int(),
  IP: z.string(),
  reportingType: z.string().nullable(),
  reportingId: z.number().int().nullable(),
  info: z.string(),
  createdAt: z.coerce.date(),
  submittedById: z.number().int().nullable(),
})

export type Feedback = z.infer<typeof FeedbackSchema>

/////////////////////////////////////////
// NOTIFICATION SCHEMA
/////////////////////////////////////////

export const NotificationSchema = z.object({
  id: z.number().int(),
  content: z.string(),
  createdAt: z.coerce.date(),
  link: z.string().nullable(),
  seen: z.boolean(),
  accountId: z.number().int(),
})

export type Notification = z.infer<typeof NotificationSchema>

/////////////////////////////////////////
// REACTION SCHEMA
/////////////////////////////////////////

export const ReactionSchema = z.object({
  id: z.number().int(),
  like: z.boolean(),
  accountId: z.number().int(),
  choiceId: z.number().int(),
})

export type Reaction = z.infer<typeof ReactionSchema>

/////////////////////////////////////////
// VIEW SCHEMA
/////////////////////////////////////////

export const ViewSchema = z.object({
  id: z.number().int(),
  IP: z.string(),
  nodeId: z.number().int(),
})

export type View = z.infer<typeof ViewSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  suggestedChoices: z.union([z.boolean(),z.lazy(() => ChoiceFindManyArgsSchema)]).optional(),
  ownedNodes: z.union([z.boolean(),z.lazy(() => NodeFindManyArgsSchema)]).optional(),
  submittedFeedback: z.union([z.boolean(),z.lazy(() => FeedbackFindManyArgsSchema)]).optional(),
  notifications: z.union([z.boolean(),z.lazy(() => NotificationFindManyArgsSchema)]).optional(),
  Reaction: z.union([z.boolean(),z.lazy(() => ReactionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AccountCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountCountOutputTypeArgsSchema: z.ZodType<Prisma.AccountCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => AccountCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AccountCountOutputTypeSelectSchema: z.ZodType<Prisma.AccountCountOutputTypeSelect> = z.object({
  suggestedChoices: z.boolean().optional(),
  ownedNodes: z.boolean().optional(),
  submittedFeedback: z.boolean().optional(),
  notifications: z.boolean().optional(),
  Reaction: z.boolean().optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  screenName: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  encryptedPassword: z.boolean().optional(),
  isAdmin: z.boolean().optional(),
  hidden: z.boolean().optional(),
  profilePicURL: z.boolean().optional(),
  profilePicUnsafe: z.boolean().optional(),
  bio: z.boolean().optional(),
  lastIP: z.boolean().optional(),
  totalNodeViews: z.boolean().optional(),
  totalSuggestionScore: z.boolean().optional(),
  suggestedChoices: z.union([z.boolean(),z.lazy(() => ChoiceFindManyArgsSchema)]).optional(),
  ownedNodes: z.union([z.boolean(),z.lazy(() => NodeFindManyArgsSchema)]).optional(),
  submittedFeedback: z.union([z.boolean(),z.lazy(() => FeedbackFindManyArgsSchema)]).optional(),
  notifications: z.union([z.boolean(),z.lazy(() => NotificationFindManyArgsSchema)]).optional(),
  Reaction: z.union([z.boolean(),z.lazy(() => ReactionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AccountCountOutputTypeArgsSchema)]).optional(),
}).strict()

// NODE
//------------------------------------------------------

export const NodeIncludeSchema: z.ZodType<Prisma.NodeInclude> = z.object({
  owner: z.union([z.boolean(),z.lazy(() => AccountArgsSchema)]).optional(),
  childChoices: z.union([z.boolean(),z.lazy(() => ChoiceFindManyArgsSchema)]).optional(),
  parentChoices: z.union([z.boolean(),z.lazy(() => ChoiceFindManyArgsSchema)]).optional(),
  View: z.union([z.boolean(),z.lazy(() => ViewFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => NodeCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const NodeArgsSchema: z.ZodType<Prisma.NodeDefaultArgs> = z.object({
  select: z.lazy(() => NodeSelectSchema).optional(),
  include: z.lazy(() => NodeIncludeSchema).optional(),
}).strict();

export const NodeCountOutputTypeArgsSchema: z.ZodType<Prisma.NodeCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => NodeCountOutputTypeSelectSchema).nullish(),
}).strict();

export const NodeCountOutputTypeSelectSchema: z.ZodType<Prisma.NodeCountOutputTypeSelect> = z.object({
  childChoices: z.boolean().optional(),
  parentChoices: z.boolean().optional(),
  View: z.boolean().optional(),
}).strict();

export const NodeSelectSchema: z.ZodType<Prisma.NodeSelect> = z.object({
  id: z.boolean().optional(),
  slug: z.boolean().optional(),
  title: z.boolean().optional(),
  content: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  storedViews: z.boolean().optional(),
  featured: z.boolean().optional(),
  pictureURL: z.boolean().optional(),
  pictureUnsafe: z.boolean().optional(),
  hidden: z.boolean().optional(),
  views: z.boolean().optional(),
  ownerId: z.boolean().optional(),
  owner: z.union([z.boolean(),z.lazy(() => AccountArgsSchema)]).optional(),
  childChoices: z.union([z.boolean(),z.lazy(() => ChoiceFindManyArgsSchema)]).optional(),
  parentChoices: z.union([z.boolean(),z.lazy(() => ChoiceFindManyArgsSchema)]).optional(),
  View: z.union([z.boolean(),z.lazy(() => ViewFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => NodeCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CHOICE
//------------------------------------------------------

export const ChoiceIncludeSchema: z.ZodType<Prisma.ChoiceInclude> = z.object({
  fromNode: z.union([z.boolean(),z.lazy(() => NodeArgsSchema)]).optional(),
  toNode: z.union([z.boolean(),z.lazy(() => NodeArgsSchema)]).optional(),
  suggestedBy: z.union([z.boolean(),z.lazy(() => AccountArgsSchema)]).optional(),
  reactions: z.union([z.boolean(),z.lazy(() => ReactionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ChoiceCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ChoiceArgsSchema: z.ZodType<Prisma.ChoiceDefaultArgs> = z.object({
  select: z.lazy(() => ChoiceSelectSchema).optional(),
  include: z.lazy(() => ChoiceIncludeSchema).optional(),
}).strict();

export const ChoiceCountOutputTypeArgsSchema: z.ZodType<Prisma.ChoiceCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ChoiceCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ChoiceCountOutputTypeSelectSchema: z.ZodType<Prisma.ChoiceCountOutputTypeSelect> = z.object({
  reactions: z.boolean().optional(),
}).strict();

export const ChoiceSelectSchema: z.ZodType<Prisma.ChoiceSelect> = z.object({
  id: z.boolean().optional(),
  slug: z.boolean().optional(),
  action: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  hidden: z.boolean().optional(),
  isCanon: z.boolean().optional(),
  score: z.boolean().optional(),
  fromNodeId: z.boolean().optional(),
  toNodeId: z.boolean().optional(),
  suggestedByAccountId: z.boolean().optional(),
  fromNode: z.union([z.boolean(),z.lazy(() => NodeArgsSchema)]).optional(),
  toNode: z.union([z.boolean(),z.lazy(() => NodeArgsSchema)]).optional(),
  suggestedBy: z.union([z.boolean(),z.lazy(() => AccountArgsSchema)]).optional(),
  reactions: z.union([z.boolean(),z.lazy(() => ReactionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ChoiceCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FEEDBACK
//------------------------------------------------------

export const FeedbackIncludeSchema: z.ZodType<Prisma.FeedbackInclude> = z.object({
  submittedBy: z.union([z.boolean(),z.lazy(() => AccountArgsSchema)]).optional(),
}).strict()

export const FeedbackArgsSchema: z.ZodType<Prisma.FeedbackDefaultArgs> = z.object({
  select: z.lazy(() => FeedbackSelectSchema).optional(),
  include: z.lazy(() => FeedbackIncludeSchema).optional(),
}).strict();

export const FeedbackSelectSchema: z.ZodType<Prisma.FeedbackSelect> = z.object({
  id: z.boolean().optional(),
  IP: z.boolean().optional(),
  reportingType: z.boolean().optional(),
  reportingId: z.boolean().optional(),
  info: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  submittedById: z.boolean().optional(),
  submittedBy: z.union([z.boolean(),z.lazy(() => AccountArgsSchema)]).optional(),
}).strict()

// NOTIFICATION
//------------------------------------------------------

export const NotificationIncludeSchema: z.ZodType<Prisma.NotificationInclude> = z.object({
  account: z.union([z.boolean(),z.lazy(() => AccountArgsSchema)]).optional(),
}).strict()

export const NotificationArgsSchema: z.ZodType<Prisma.NotificationDefaultArgs> = z.object({
  select: z.lazy(() => NotificationSelectSchema).optional(),
  include: z.lazy(() => NotificationIncludeSchema).optional(),
}).strict();

export const NotificationSelectSchema: z.ZodType<Prisma.NotificationSelect> = z.object({
  id: z.boolean().optional(),
  content: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  link: z.boolean().optional(),
  seen: z.boolean().optional(),
  accountId: z.boolean().optional(),
  account: z.union([z.boolean(),z.lazy(() => AccountArgsSchema)]).optional(),
}).strict()

// REACTION
//------------------------------------------------------

export const ReactionIncludeSchema: z.ZodType<Prisma.ReactionInclude> = z.object({
  account: z.union([z.boolean(),z.lazy(() => AccountArgsSchema)]).optional(),
  choice: z.union([z.boolean(),z.lazy(() => ChoiceArgsSchema)]).optional(),
}).strict()

export const ReactionArgsSchema: z.ZodType<Prisma.ReactionDefaultArgs> = z.object({
  select: z.lazy(() => ReactionSelectSchema).optional(),
  include: z.lazy(() => ReactionIncludeSchema).optional(),
}).strict();

export const ReactionSelectSchema: z.ZodType<Prisma.ReactionSelect> = z.object({
  id: z.boolean().optional(),
  like: z.boolean().optional(),
  accountId: z.boolean().optional(),
  choiceId: z.boolean().optional(),
  account: z.union([z.boolean(),z.lazy(() => AccountArgsSchema)]).optional(),
  choice: z.union([z.boolean(),z.lazy(() => ChoiceArgsSchema)]).optional(),
}).strict()

// VIEW
//------------------------------------------------------

export const ViewIncludeSchema: z.ZodType<Prisma.ViewInclude> = z.object({
  node: z.union([z.boolean(),z.lazy(() => NodeArgsSchema)]).optional(),
}).strict()

export const ViewArgsSchema: z.ZodType<Prisma.ViewDefaultArgs> = z.object({
  select: z.lazy(() => ViewSelectSchema).optional(),
  include: z.lazy(() => ViewIncludeSchema).optional(),
}).strict();

export const ViewSelectSchema: z.ZodType<Prisma.ViewSelect> = z.object({
  id: z.boolean().optional(),
  IP: z.boolean().optional(),
  nodeId: z.boolean().optional(),
  node: z.union([z.boolean(),z.lazy(() => NodeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  screenName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  encryptedPassword: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isAdmin: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  hidden: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  profilePicURL: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  profilePicUnsafe: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  bio: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  lastIP: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  totalNodeViews: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  totalSuggestionScore: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  suggestedChoices: z.lazy(() => ChoiceListRelationFilterSchema).optional(),
  ownedNodes: z.lazy(() => NodeListRelationFilterSchema).optional(),
  submittedFeedback: z.lazy(() => FeedbackListRelationFilterSchema).optional(),
  notifications: z.lazy(() => NotificationListRelationFilterSchema).optional(),
  Reaction: z.lazy(() => ReactionListRelationFilterSchema).optional()
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  screenName: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  encryptedPassword: z.lazy(() => SortOrderSchema).optional(),
  isAdmin: z.lazy(() => SortOrderSchema).optional(),
  hidden: z.lazy(() => SortOrderSchema).optional(),
  profilePicURL: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  profilePicUnsafe: z.lazy(() => SortOrderSchema).optional(),
  bio: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  lastIP: z.lazy(() => SortOrderSchema).optional(),
  totalNodeViews: z.lazy(() => SortOrderSchema).optional(),
  totalSuggestionScore: z.lazy(() => SortOrderSchema).optional(),
  suggestedChoices: z.lazy(() => ChoiceOrderByRelationAggregateInputSchema).optional(),
  ownedNodes: z.lazy(() => NodeOrderByRelationAggregateInputSchema).optional(),
  submittedFeedback: z.lazy(() => FeedbackOrderByRelationAggregateInputSchema).optional(),
  notifications: z.lazy(() => NotificationOrderByRelationAggregateInputSchema).optional(),
  Reaction: z.lazy(() => ReactionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    screenName: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    screenName: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  screenName: z.string().optional(),
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  encryptedPassword: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isAdmin: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  hidden: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  profilePicURL: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  profilePicUnsafe: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  bio: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  lastIP: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  totalNodeViews: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  totalSuggestionScore: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  suggestedChoices: z.lazy(() => ChoiceListRelationFilterSchema).optional(),
  ownedNodes: z.lazy(() => NodeListRelationFilterSchema).optional(),
  submittedFeedback: z.lazy(() => FeedbackListRelationFilterSchema).optional(),
  notifications: z.lazy(() => NotificationListRelationFilterSchema).optional(),
  Reaction: z.lazy(() => ReactionListRelationFilterSchema).optional()
}).strict());

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  screenName: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  encryptedPassword: z.lazy(() => SortOrderSchema).optional(),
  isAdmin: z.lazy(() => SortOrderSchema).optional(),
  hidden: z.lazy(() => SortOrderSchema).optional(),
  profilePicURL: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  profilePicUnsafe: z.lazy(() => SortOrderSchema).optional(),
  bio: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  lastIP: z.lazy(() => SortOrderSchema).optional(),
  totalNodeViews: z.lazy(() => SortOrderSchema).optional(),
  totalSuggestionScore: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  screenName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  encryptedPassword: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isAdmin: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  hidden: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  profilePicURL: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  profilePicUnsafe: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  bio: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  lastIP: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  totalNodeViews: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  totalSuggestionScore: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const NodeWhereInputSchema: z.ZodType<Prisma.NodeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NodeWhereInputSchema),z.lazy(() => NodeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NodeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NodeWhereInputSchema),z.lazy(() => NodeWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  storedViews: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  featured: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  pictureURL: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  pictureUnsafe: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  hidden: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  views: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  ownerId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  owner: z.union([ z.lazy(() => AccountNullableRelationFilterSchema),z.lazy(() => AccountWhereInputSchema) ]).optional().nullable(),
  childChoices: z.lazy(() => ChoiceListRelationFilterSchema).optional(),
  parentChoices: z.lazy(() => ChoiceListRelationFilterSchema).optional(),
  View: z.lazy(() => ViewListRelationFilterSchema).optional()
}).strict();

export const NodeOrderByWithRelationInputSchema: z.ZodType<Prisma.NodeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  storedViews: z.lazy(() => SortOrderSchema).optional(),
  featured: z.lazy(() => SortOrderSchema).optional(),
  pictureURL: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  pictureUnsafe: z.lazy(() => SortOrderSchema).optional(),
  hidden: z.lazy(() => SortOrderSchema).optional(),
  views: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  owner: z.lazy(() => AccountOrderByWithRelationInputSchema).optional(),
  childChoices: z.lazy(() => ChoiceOrderByRelationAggregateInputSchema).optional(),
  parentChoices: z.lazy(() => ChoiceOrderByRelationAggregateInputSchema).optional(),
  View: z.lazy(() => ViewOrderByRelationAggregateInputSchema).optional()
}).strict();

export const NodeWhereUniqueInputSchema: z.ZodType<Prisma.NodeWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    slug: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    slug: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  slug: z.string().optional(),
  AND: z.union([ z.lazy(() => NodeWhereInputSchema),z.lazy(() => NodeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NodeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NodeWhereInputSchema),z.lazy(() => NodeWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  storedViews: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  featured: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  pictureURL: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  pictureUnsafe: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  hidden: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  views: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  ownerId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  owner: z.union([ z.lazy(() => AccountNullableRelationFilterSchema),z.lazy(() => AccountWhereInputSchema) ]).optional().nullable(),
  childChoices: z.lazy(() => ChoiceListRelationFilterSchema).optional(),
  parentChoices: z.lazy(() => ChoiceListRelationFilterSchema).optional(),
  View: z.lazy(() => ViewListRelationFilterSchema).optional()
}).strict());

export const NodeOrderByWithAggregationInputSchema: z.ZodType<Prisma.NodeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  storedViews: z.lazy(() => SortOrderSchema).optional(),
  featured: z.lazy(() => SortOrderSchema).optional(),
  pictureURL: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  pictureUnsafe: z.lazy(() => SortOrderSchema).optional(),
  hidden: z.lazy(() => SortOrderSchema).optional(),
  views: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => NodeCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => NodeAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => NodeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => NodeMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => NodeSumOrderByAggregateInputSchema).optional()
}).strict();

export const NodeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.NodeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => NodeScalarWhereWithAggregatesInputSchema),z.lazy(() => NodeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => NodeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NodeScalarWhereWithAggregatesInputSchema),z.lazy(() => NodeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  storedViews: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  featured: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  pictureURL: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  pictureUnsafe: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  hidden: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  views: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  ownerId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const ChoiceWhereInputSchema: z.ZodType<Prisma.ChoiceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ChoiceWhereInputSchema),z.lazy(() => ChoiceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChoiceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChoiceWhereInputSchema),z.lazy(() => ChoiceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  hidden: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isCanon: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  score: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  fromNodeId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  toNodeId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  suggestedByAccountId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  fromNode: z.union([ z.lazy(() => NodeRelationFilterSchema),z.lazy(() => NodeWhereInputSchema) ]).optional(),
  toNode: z.union([ z.lazy(() => NodeNullableRelationFilterSchema),z.lazy(() => NodeWhereInputSchema) ]).optional().nullable(),
  suggestedBy: z.union([ z.lazy(() => AccountNullableRelationFilterSchema),z.lazy(() => AccountWhereInputSchema) ]).optional().nullable(),
  reactions: z.lazy(() => ReactionListRelationFilterSchema).optional()
}).strict();

export const ChoiceOrderByWithRelationInputSchema: z.ZodType<Prisma.ChoiceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  hidden: z.lazy(() => SortOrderSchema).optional(),
  isCanon: z.lazy(() => SortOrderSchema).optional(),
  score: z.lazy(() => SortOrderSchema).optional(),
  fromNodeId: z.lazy(() => SortOrderSchema).optional(),
  toNodeId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  suggestedByAccountId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  fromNode: z.lazy(() => NodeOrderByWithRelationInputSchema).optional(),
  toNode: z.lazy(() => NodeOrderByWithRelationInputSchema).optional(),
  suggestedBy: z.lazy(() => AccountOrderByWithRelationInputSchema).optional(),
  reactions: z.lazy(() => ReactionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ChoiceWhereUniqueInputSchema: z.ZodType<Prisma.ChoiceWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    slug: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    slug: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  slug: z.string().optional(),
  AND: z.union([ z.lazy(() => ChoiceWhereInputSchema),z.lazy(() => ChoiceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChoiceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChoiceWhereInputSchema),z.lazy(() => ChoiceWhereInputSchema).array() ]).optional(),
  action: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  hidden: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isCanon: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  score: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  fromNodeId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  toNodeId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  suggestedByAccountId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  fromNode: z.union([ z.lazy(() => NodeRelationFilterSchema),z.lazy(() => NodeWhereInputSchema) ]).optional(),
  toNode: z.union([ z.lazy(() => NodeNullableRelationFilterSchema),z.lazy(() => NodeWhereInputSchema) ]).optional().nullable(),
  suggestedBy: z.union([ z.lazy(() => AccountNullableRelationFilterSchema),z.lazy(() => AccountWhereInputSchema) ]).optional().nullable(),
  reactions: z.lazy(() => ReactionListRelationFilterSchema).optional()
}).strict());

export const ChoiceOrderByWithAggregationInputSchema: z.ZodType<Prisma.ChoiceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  hidden: z.lazy(() => SortOrderSchema).optional(),
  isCanon: z.lazy(() => SortOrderSchema).optional(),
  score: z.lazy(() => SortOrderSchema).optional(),
  fromNodeId: z.lazy(() => SortOrderSchema).optional(),
  toNodeId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  suggestedByAccountId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ChoiceCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ChoiceAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ChoiceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ChoiceMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ChoiceSumOrderByAggregateInputSchema).optional()
}).strict();

export const ChoiceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ChoiceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ChoiceScalarWhereWithAggregatesInputSchema),z.lazy(() => ChoiceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChoiceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChoiceScalarWhereWithAggregatesInputSchema),z.lazy(() => ChoiceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  hidden: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isCanon: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  score: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  fromNodeId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  toNodeId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  suggestedByAccountId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const FeedbackWhereInputSchema: z.ZodType<Prisma.FeedbackWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FeedbackWhereInputSchema),z.lazy(() => FeedbackWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeedbackWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeedbackWhereInputSchema),z.lazy(() => FeedbackWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  IP: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reportingType: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  reportingId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  info: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  submittedById: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  submittedBy: z.union([ z.lazy(() => AccountNullableRelationFilterSchema),z.lazy(() => AccountWhereInputSchema) ]).optional().nullable(),
}).strict();

export const FeedbackOrderByWithRelationInputSchema: z.ZodType<Prisma.FeedbackOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  IP: z.lazy(() => SortOrderSchema).optional(),
  reportingType: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  reportingId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  info: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  submittedById: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  submittedBy: z.lazy(() => AccountOrderByWithRelationInputSchema).optional()
}).strict();

export const FeedbackWhereUniqueInputSchema: z.ZodType<Prisma.FeedbackWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => FeedbackWhereInputSchema),z.lazy(() => FeedbackWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeedbackWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeedbackWhereInputSchema),z.lazy(() => FeedbackWhereInputSchema).array() ]).optional(),
  IP: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reportingType: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  reportingId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  info: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  submittedById: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  submittedBy: z.union([ z.lazy(() => AccountNullableRelationFilterSchema),z.lazy(() => AccountWhereInputSchema) ]).optional().nullable(),
}).strict());

export const FeedbackOrderByWithAggregationInputSchema: z.ZodType<Prisma.FeedbackOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  IP: z.lazy(() => SortOrderSchema).optional(),
  reportingType: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  reportingId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  info: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  submittedById: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => FeedbackCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => FeedbackAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FeedbackMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FeedbackMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => FeedbackSumOrderByAggregateInputSchema).optional()
}).strict();

export const FeedbackScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FeedbackScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FeedbackScalarWhereWithAggregatesInputSchema),z.lazy(() => FeedbackScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeedbackScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeedbackScalarWhereWithAggregatesInputSchema),z.lazy(() => FeedbackScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  IP: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  reportingType: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  reportingId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  info: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  submittedById: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const NotificationWhereInputSchema: z.ZodType<Prisma.NotificationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NotificationWhereInputSchema),z.lazy(() => NotificationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NotificationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NotificationWhereInputSchema),z.lazy(() => NotificationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  link: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  seen: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  accountId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  account: z.union([ z.lazy(() => AccountRelationFilterSchema),z.lazy(() => AccountWhereInputSchema) ]).optional(),
}).strict();

export const NotificationOrderByWithRelationInputSchema: z.ZodType<Prisma.NotificationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  link: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  seen: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  account: z.lazy(() => AccountOrderByWithRelationInputSchema).optional()
}).strict();

export const NotificationWhereUniqueInputSchema: z.ZodType<Prisma.NotificationWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => NotificationWhereInputSchema),z.lazy(() => NotificationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NotificationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NotificationWhereInputSchema),z.lazy(() => NotificationWhereInputSchema).array() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  link: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  seen: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  accountId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  account: z.union([ z.lazy(() => AccountRelationFilterSchema),z.lazy(() => AccountWhereInputSchema) ]).optional(),
}).strict());

export const NotificationOrderByWithAggregationInputSchema: z.ZodType<Prisma.NotificationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  link: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  seen: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => NotificationCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => NotificationAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => NotificationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => NotificationMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => NotificationSumOrderByAggregateInputSchema).optional()
}).strict();

export const NotificationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.NotificationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema),z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema),z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  link: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  seen: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  accountId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const ReactionWhereInputSchema: z.ZodType<Prisma.ReactionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReactionWhereInputSchema),z.lazy(() => ReactionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReactionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReactionWhereInputSchema),z.lazy(() => ReactionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  like: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  accountId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  choiceId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  account: z.union([ z.lazy(() => AccountRelationFilterSchema),z.lazy(() => AccountWhereInputSchema) ]).optional(),
  choice: z.union([ z.lazy(() => ChoiceRelationFilterSchema),z.lazy(() => ChoiceWhereInputSchema) ]).optional(),
}).strict();

export const ReactionOrderByWithRelationInputSchema: z.ZodType<Prisma.ReactionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  like: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  choiceId: z.lazy(() => SortOrderSchema).optional(),
  account: z.lazy(() => AccountOrderByWithRelationInputSchema).optional(),
  choice: z.lazy(() => ChoiceOrderByWithRelationInputSchema).optional()
}).strict();

export const ReactionWhereUniqueInputSchema: z.ZodType<Prisma.ReactionWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    reactionIdentifier: z.lazy(() => ReactionReactionIdentifierCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    reactionIdentifier: z.lazy(() => ReactionReactionIdentifierCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  reactionIdentifier: z.lazy(() => ReactionReactionIdentifierCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ReactionWhereInputSchema),z.lazy(() => ReactionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReactionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReactionWhereInputSchema),z.lazy(() => ReactionWhereInputSchema).array() ]).optional(),
  like: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  accountId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  choiceId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  account: z.union([ z.lazy(() => AccountRelationFilterSchema),z.lazy(() => AccountWhereInputSchema) ]).optional(),
  choice: z.union([ z.lazy(() => ChoiceRelationFilterSchema),z.lazy(() => ChoiceWhereInputSchema) ]).optional(),
}).strict());

export const ReactionOrderByWithAggregationInputSchema: z.ZodType<Prisma.ReactionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  like: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  choiceId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ReactionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ReactionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ReactionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ReactionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ReactionSumOrderByAggregateInputSchema).optional()
}).strict();

export const ReactionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ReactionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ReactionScalarWhereWithAggregatesInputSchema),z.lazy(() => ReactionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReactionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReactionScalarWhereWithAggregatesInputSchema),z.lazy(() => ReactionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  like: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  accountId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  choiceId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const ViewWhereInputSchema: z.ZodType<Prisma.ViewWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ViewWhereInputSchema),z.lazy(() => ViewWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ViewWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ViewWhereInputSchema),z.lazy(() => ViewWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  IP: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  nodeId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  node: z.union([ z.lazy(() => NodeRelationFilterSchema),z.lazy(() => NodeWhereInputSchema) ]).optional(),
}).strict();

export const ViewOrderByWithRelationInputSchema: z.ZodType<Prisma.ViewOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  IP: z.lazy(() => SortOrderSchema).optional(),
  nodeId: z.lazy(() => SortOrderSchema).optional(),
  node: z.lazy(() => NodeOrderByWithRelationInputSchema).optional()
}).strict();

export const ViewWhereUniqueInputSchema: z.ZodType<Prisma.ViewWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => ViewWhereInputSchema),z.lazy(() => ViewWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ViewWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ViewWhereInputSchema),z.lazy(() => ViewWhereInputSchema).array() ]).optional(),
  IP: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  nodeId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  node: z.union([ z.lazy(() => NodeRelationFilterSchema),z.lazy(() => NodeWhereInputSchema) ]).optional(),
}).strict());

export const ViewOrderByWithAggregationInputSchema: z.ZodType<Prisma.ViewOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  IP: z.lazy(() => SortOrderSchema).optional(),
  nodeId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ViewCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ViewAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ViewMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ViewMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ViewSumOrderByAggregateInputSchema).optional()
}).strict();

export const ViewScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ViewScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ViewScalarWhereWithAggregatesInputSchema),z.lazy(() => ViewScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ViewScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ViewScalarWhereWithAggregatesInputSchema),z.lazy(() => ViewScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  IP: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  nodeId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  screenName: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  encryptedPassword: z.string(),
  isAdmin: z.boolean().optional(),
  hidden: z.boolean().optional(),
  profilePicURL: z.string().optional().nullable(),
  profilePicUnsafe: z.boolean().optional(),
  bio: z.string().optional().nullable(),
  lastIP: z.string(),
  totalNodeViews: z.number().int(),
  totalSuggestionScore: z.number().int(),
  suggestedChoices: z.lazy(() => ChoiceCreateNestedManyWithoutSuggestedByInputSchema).optional(),
  ownedNodes: z.lazy(() => NodeCreateNestedManyWithoutOwnerInputSchema).optional(),
  submittedFeedback: z.lazy(() => FeedbackCreateNestedManyWithoutSubmittedByInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutAccountInputSchema).optional(),
  Reaction: z.lazy(() => ReactionCreateNestedManyWithoutAccountInputSchema).optional()
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  screenName: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  encryptedPassword: z.string(),
  isAdmin: z.boolean().optional(),
  hidden: z.boolean().optional(),
  profilePicURL: z.string().optional().nullable(),
  profilePicUnsafe: z.boolean().optional(),
  bio: z.string().optional().nullable(),
  lastIP: z.string(),
  totalNodeViews: z.number().int(),
  totalSuggestionScore: z.number().int(),
  suggestedChoices: z.lazy(() => ChoiceUncheckedCreateNestedManyWithoutSuggestedByInputSchema).optional(),
  ownedNodes: z.lazy(() => NodeUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  submittedFeedback: z.lazy(() => FeedbackUncheckedCreateNestedManyWithoutSubmittedByInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutAccountInputSchema).optional(),
  Reaction: z.lazy(() => ReactionUncheckedCreateNestedManyWithoutAccountInputSchema).optional()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  screenName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  encryptedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isAdmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  profilePicURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profilePicUnsafe: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastIP: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalNodeViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalSuggestionScore: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suggestedChoices: z.lazy(() => ChoiceUpdateManyWithoutSuggestedByNestedInputSchema).optional(),
  ownedNodes: z.lazy(() => NodeUpdateManyWithoutOwnerNestedInputSchema).optional(),
  submittedFeedback: z.lazy(() => FeedbackUpdateManyWithoutSubmittedByNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutAccountNestedInputSchema).optional(),
  Reaction: z.lazy(() => ReactionUpdateManyWithoutAccountNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  screenName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  encryptedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isAdmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  profilePicURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profilePicUnsafe: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastIP: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalNodeViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalSuggestionScore: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suggestedChoices: z.lazy(() => ChoiceUncheckedUpdateManyWithoutSuggestedByNestedInputSchema).optional(),
  ownedNodes: z.lazy(() => NodeUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  submittedFeedback: z.lazy(() => FeedbackUncheckedUpdateManyWithoutSubmittedByNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutAccountNestedInputSchema).optional(),
  Reaction: z.lazy(() => ReactionUncheckedUpdateManyWithoutAccountNestedInputSchema).optional()
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  id: z.number().int().optional(),
  screenName: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  encryptedPassword: z.string(),
  isAdmin: z.boolean().optional(),
  hidden: z.boolean().optional(),
  profilePicURL: z.string().optional().nullable(),
  profilePicUnsafe: z.boolean().optional(),
  bio: z.string().optional().nullable(),
  lastIP: z.string(),
  totalNodeViews: z.number().int(),
  totalSuggestionScore: z.number().int()
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  screenName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  encryptedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isAdmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  profilePicURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profilePicUnsafe: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastIP: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalNodeViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalSuggestionScore: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  screenName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  encryptedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isAdmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  profilePicURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profilePicUnsafe: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastIP: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalNodeViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalSuggestionScore: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NodeCreateInputSchema: z.ZodType<Prisma.NodeCreateInput> = z.object({
  slug: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  storedViews: z.number().int(),
  featured: z.boolean().optional(),
  pictureURL: z.string().optional().nullable(),
  pictureUnsafe: z.boolean().optional(),
  hidden: z.boolean().optional(),
  views: z.number().int(),
  owner: z.lazy(() => AccountCreateNestedOneWithoutOwnedNodesInputSchema).optional(),
  childChoices: z.lazy(() => ChoiceCreateNestedManyWithoutFromNodeInputSchema).optional(),
  parentChoices: z.lazy(() => ChoiceCreateNestedManyWithoutToNodeInputSchema).optional(),
  View: z.lazy(() => ViewCreateNestedManyWithoutNodeInputSchema).optional()
}).strict();

export const NodeUncheckedCreateInputSchema: z.ZodType<Prisma.NodeUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  slug: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  storedViews: z.number().int(),
  featured: z.boolean().optional(),
  pictureURL: z.string().optional().nullable(),
  pictureUnsafe: z.boolean().optional(),
  hidden: z.boolean().optional(),
  views: z.number().int(),
  ownerId: z.number().int().optional().nullable(),
  childChoices: z.lazy(() => ChoiceUncheckedCreateNestedManyWithoutFromNodeInputSchema).optional(),
  parentChoices: z.lazy(() => ChoiceUncheckedCreateNestedManyWithoutToNodeInputSchema).optional(),
  View: z.lazy(() => ViewUncheckedCreateNestedManyWithoutNodeInputSchema).optional()
}).strict();

export const NodeUpdateInputSchema: z.ZodType<Prisma.NodeUpdateInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  storedViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  featured: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pictureURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pictureUnsafe: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => AccountUpdateOneWithoutOwnedNodesNestedInputSchema).optional(),
  childChoices: z.lazy(() => ChoiceUpdateManyWithoutFromNodeNestedInputSchema).optional(),
  parentChoices: z.lazy(() => ChoiceUpdateManyWithoutToNodeNestedInputSchema).optional(),
  View: z.lazy(() => ViewUpdateManyWithoutNodeNestedInputSchema).optional()
}).strict();

export const NodeUncheckedUpdateInputSchema: z.ZodType<Prisma.NodeUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  storedViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  featured: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pictureURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pictureUnsafe: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  childChoices: z.lazy(() => ChoiceUncheckedUpdateManyWithoutFromNodeNestedInputSchema).optional(),
  parentChoices: z.lazy(() => ChoiceUncheckedUpdateManyWithoutToNodeNestedInputSchema).optional(),
  View: z.lazy(() => ViewUncheckedUpdateManyWithoutNodeNestedInputSchema).optional()
}).strict();

export const NodeCreateManyInputSchema: z.ZodType<Prisma.NodeCreateManyInput> = z.object({
  id: z.number().int().optional(),
  slug: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  storedViews: z.number().int(),
  featured: z.boolean().optional(),
  pictureURL: z.string().optional().nullable(),
  pictureUnsafe: z.boolean().optional(),
  hidden: z.boolean().optional(),
  views: z.number().int(),
  ownerId: z.number().int().optional().nullable()
}).strict();

export const NodeUpdateManyMutationInputSchema: z.ZodType<Prisma.NodeUpdateManyMutationInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  storedViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  featured: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pictureURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pictureUnsafe: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NodeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.NodeUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  storedViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  featured: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pictureURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pictureUnsafe: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ChoiceCreateInputSchema: z.ZodType<Prisma.ChoiceCreateInput> = z.object({
  slug: z.string(),
  action: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  hidden: z.boolean().optional(),
  isCanon: z.boolean(),
  score: z.number().int(),
  fromNode: z.lazy(() => NodeCreateNestedOneWithoutChildChoicesInputSchema),
  toNode: z.lazy(() => NodeCreateNestedOneWithoutParentChoicesInputSchema).optional(),
  suggestedBy: z.lazy(() => AccountCreateNestedOneWithoutSuggestedChoicesInputSchema).optional(),
  reactions: z.lazy(() => ReactionCreateNestedManyWithoutChoiceInputSchema).optional()
}).strict();

export const ChoiceUncheckedCreateInputSchema: z.ZodType<Prisma.ChoiceUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  slug: z.string(),
  action: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  hidden: z.boolean().optional(),
  isCanon: z.boolean(),
  score: z.number().int(),
  fromNodeId: z.number().int(),
  toNodeId: z.number().int().optional().nullable(),
  suggestedByAccountId: z.number().int().optional().nullable(),
  reactions: z.lazy(() => ReactionUncheckedCreateNestedManyWithoutChoiceInputSchema).optional()
}).strict();

export const ChoiceUpdateInputSchema: z.ZodType<Prisma.ChoiceUpdateInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isCanon: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fromNode: z.lazy(() => NodeUpdateOneRequiredWithoutChildChoicesNestedInputSchema).optional(),
  toNode: z.lazy(() => NodeUpdateOneWithoutParentChoicesNestedInputSchema).optional(),
  suggestedBy: z.lazy(() => AccountUpdateOneWithoutSuggestedChoicesNestedInputSchema).optional(),
  reactions: z.lazy(() => ReactionUpdateManyWithoutChoiceNestedInputSchema).optional()
}).strict();

export const ChoiceUncheckedUpdateInputSchema: z.ZodType<Prisma.ChoiceUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isCanon: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fromNodeId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  toNodeId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  suggestedByAccountId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reactions: z.lazy(() => ReactionUncheckedUpdateManyWithoutChoiceNestedInputSchema).optional()
}).strict();

export const ChoiceCreateManyInputSchema: z.ZodType<Prisma.ChoiceCreateManyInput> = z.object({
  id: z.number().int().optional(),
  slug: z.string(),
  action: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  hidden: z.boolean().optional(),
  isCanon: z.boolean(),
  score: z.number().int(),
  fromNodeId: z.number().int(),
  toNodeId: z.number().int().optional().nullable(),
  suggestedByAccountId: z.number().int().optional().nullable()
}).strict();

export const ChoiceUpdateManyMutationInputSchema: z.ZodType<Prisma.ChoiceUpdateManyMutationInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isCanon: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChoiceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ChoiceUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isCanon: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fromNodeId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  toNodeId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  suggestedByAccountId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FeedbackCreateInputSchema: z.ZodType<Prisma.FeedbackCreateInput> = z.object({
  IP: z.string(),
  reportingType: z.string().optional().nullable(),
  reportingId: z.number().int().optional().nullable(),
  info: z.string(),
  createdAt: z.coerce.date().optional(),
  submittedBy: z.lazy(() => AccountCreateNestedOneWithoutSubmittedFeedbackInputSchema).optional()
}).strict();

export const FeedbackUncheckedCreateInputSchema: z.ZodType<Prisma.FeedbackUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  IP: z.string(),
  reportingType: z.string().optional().nullable(),
  reportingId: z.number().int().optional().nullable(),
  info: z.string(),
  createdAt: z.coerce.date().optional(),
  submittedById: z.number().int().optional().nullable()
}).strict();

export const FeedbackUpdateInputSchema: z.ZodType<Prisma.FeedbackUpdateInput> = z.object({
  IP: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportingType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reportingId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  info: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  submittedBy: z.lazy(() => AccountUpdateOneWithoutSubmittedFeedbackNestedInputSchema).optional()
}).strict();

export const FeedbackUncheckedUpdateInputSchema: z.ZodType<Prisma.FeedbackUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  IP: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportingType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reportingId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  info: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  submittedById: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FeedbackCreateManyInputSchema: z.ZodType<Prisma.FeedbackCreateManyInput> = z.object({
  id: z.number().int().optional(),
  IP: z.string(),
  reportingType: z.string().optional().nullable(),
  reportingId: z.number().int().optional().nullable(),
  info: z.string(),
  createdAt: z.coerce.date().optional(),
  submittedById: z.number().int().optional().nullable()
}).strict();

export const FeedbackUpdateManyMutationInputSchema: z.ZodType<Prisma.FeedbackUpdateManyMutationInput> = z.object({
  IP: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportingType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reportingId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  info: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FeedbackUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  IP: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportingType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reportingId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  info: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  submittedById: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const NotificationCreateInputSchema: z.ZodType<Prisma.NotificationCreateInput> = z.object({
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  link: z.string().optional().nullable(),
  seen: z.boolean().optional(),
  account: z.lazy(() => AccountCreateNestedOneWithoutNotificationsInputSchema)
}).strict();

export const NotificationUncheckedCreateInputSchema: z.ZodType<Prisma.NotificationUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  link: z.string().optional().nullable(),
  seen: z.boolean().optional(),
  accountId: z.number().int()
}).strict();

export const NotificationUpdateInputSchema: z.ZodType<Prisma.NotificationUpdateInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  account: z.lazy(() => AccountUpdateOneRequiredWithoutNotificationsNestedInputSchema).optional()
}).strict();

export const NotificationUncheckedUpdateInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NotificationCreateManyInputSchema: z.ZodType<Prisma.NotificationCreateManyInput> = z.object({
  id: z.number().int().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  link: z.string().optional().nullable(),
  seen: z.boolean().optional(),
  accountId: z.number().int()
}).strict();

export const NotificationUpdateManyMutationInputSchema: z.ZodType<Prisma.NotificationUpdateManyMutationInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NotificationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReactionCreateInputSchema: z.ZodType<Prisma.ReactionCreateInput> = z.object({
  like: z.boolean(),
  account: z.lazy(() => AccountCreateNestedOneWithoutReactionInputSchema),
  choice: z.lazy(() => ChoiceCreateNestedOneWithoutReactionsInputSchema)
}).strict();

export const ReactionUncheckedCreateInputSchema: z.ZodType<Prisma.ReactionUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  like: z.boolean(),
  accountId: z.number().int(),
  choiceId: z.number().int()
}).strict();

export const ReactionUpdateInputSchema: z.ZodType<Prisma.ReactionUpdateInput> = z.object({
  like: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  account: z.lazy(() => AccountUpdateOneRequiredWithoutReactionNestedInputSchema).optional(),
  choice: z.lazy(() => ChoiceUpdateOneRequiredWithoutReactionsNestedInputSchema).optional()
}).strict();

export const ReactionUncheckedUpdateInputSchema: z.ZodType<Prisma.ReactionUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  like: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  choiceId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReactionCreateManyInputSchema: z.ZodType<Prisma.ReactionCreateManyInput> = z.object({
  id: z.number().int().optional(),
  like: z.boolean(),
  accountId: z.number().int(),
  choiceId: z.number().int()
}).strict();

export const ReactionUpdateManyMutationInputSchema: z.ZodType<Prisma.ReactionUpdateManyMutationInput> = z.object({
  like: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReactionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ReactionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  like: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  choiceId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ViewCreateInputSchema: z.ZodType<Prisma.ViewCreateInput> = z.object({
  IP: z.string(),
  node: z.lazy(() => NodeCreateNestedOneWithoutViewInputSchema)
}).strict();

export const ViewUncheckedCreateInputSchema: z.ZodType<Prisma.ViewUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  IP: z.string(),
  nodeId: z.number().int()
}).strict();

export const ViewUpdateInputSchema: z.ZodType<Prisma.ViewUpdateInput> = z.object({
  IP: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  node: z.lazy(() => NodeUpdateOneRequiredWithoutViewNestedInputSchema).optional()
}).strict();

export const ViewUncheckedUpdateInputSchema: z.ZodType<Prisma.ViewUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  IP: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nodeId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ViewCreateManyInputSchema: z.ZodType<Prisma.ViewCreateManyInput> = z.object({
  id: z.number().int().optional(),
  IP: z.string(),
  nodeId: z.number().int()
}).strict();

export const ViewUpdateManyMutationInputSchema: z.ZodType<Prisma.ViewUpdateManyMutationInput> = z.object({
  IP: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ViewUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ViewUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  IP: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nodeId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const ChoiceListRelationFilterSchema: z.ZodType<Prisma.ChoiceListRelationFilter> = z.object({
  every: z.lazy(() => ChoiceWhereInputSchema).optional(),
  some: z.lazy(() => ChoiceWhereInputSchema).optional(),
  none: z.lazy(() => ChoiceWhereInputSchema).optional()
}).strict();

export const NodeListRelationFilterSchema: z.ZodType<Prisma.NodeListRelationFilter> = z.object({
  every: z.lazy(() => NodeWhereInputSchema).optional(),
  some: z.lazy(() => NodeWhereInputSchema).optional(),
  none: z.lazy(() => NodeWhereInputSchema).optional()
}).strict();

export const FeedbackListRelationFilterSchema: z.ZodType<Prisma.FeedbackListRelationFilter> = z.object({
  every: z.lazy(() => FeedbackWhereInputSchema).optional(),
  some: z.lazy(() => FeedbackWhereInputSchema).optional(),
  none: z.lazy(() => FeedbackWhereInputSchema).optional()
}).strict();

export const NotificationListRelationFilterSchema: z.ZodType<Prisma.NotificationListRelationFilter> = z.object({
  every: z.lazy(() => NotificationWhereInputSchema).optional(),
  some: z.lazy(() => NotificationWhereInputSchema).optional(),
  none: z.lazy(() => NotificationWhereInputSchema).optional()
}).strict();

export const ReactionListRelationFilterSchema: z.ZodType<Prisma.ReactionListRelationFilter> = z.object({
  every: z.lazy(() => ReactionWhereInputSchema).optional(),
  some: z.lazy(() => ReactionWhereInputSchema).optional(),
  none: z.lazy(() => ReactionWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const ChoiceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ChoiceOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NodeOrderByRelationAggregateInputSchema: z.ZodType<Prisma.NodeOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FeedbackOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NotificationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.NotificationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReactionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ReactionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  screenName: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  encryptedPassword: z.lazy(() => SortOrderSchema).optional(),
  isAdmin: z.lazy(() => SortOrderSchema).optional(),
  hidden: z.lazy(() => SortOrderSchema).optional(),
  profilePicURL: z.lazy(() => SortOrderSchema).optional(),
  profilePicUnsafe: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  lastIP: z.lazy(() => SortOrderSchema).optional(),
  totalNodeViews: z.lazy(() => SortOrderSchema).optional(),
  totalSuggestionScore: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  totalNodeViews: z.lazy(() => SortOrderSchema).optional(),
  totalSuggestionScore: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  screenName: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  encryptedPassword: z.lazy(() => SortOrderSchema).optional(),
  isAdmin: z.lazy(() => SortOrderSchema).optional(),
  hidden: z.lazy(() => SortOrderSchema).optional(),
  profilePicURL: z.lazy(() => SortOrderSchema).optional(),
  profilePicUnsafe: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  lastIP: z.lazy(() => SortOrderSchema).optional(),
  totalNodeViews: z.lazy(() => SortOrderSchema).optional(),
  totalSuggestionScore: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  screenName: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  encryptedPassword: z.lazy(() => SortOrderSchema).optional(),
  isAdmin: z.lazy(() => SortOrderSchema).optional(),
  hidden: z.lazy(() => SortOrderSchema).optional(),
  profilePicURL: z.lazy(() => SortOrderSchema).optional(),
  profilePicUnsafe: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  lastIP: z.lazy(() => SortOrderSchema).optional(),
  totalNodeViews: z.lazy(() => SortOrderSchema).optional(),
  totalSuggestionScore: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  totalNodeViews: z.lazy(() => SortOrderSchema).optional(),
  totalSuggestionScore: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const AccountNullableRelationFilterSchema: z.ZodType<Prisma.AccountNullableRelationFilter> = z.object({
  is: z.lazy(() => AccountWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => AccountWhereInputSchema).optional().nullable()
}).strict();

export const ViewListRelationFilterSchema: z.ZodType<Prisma.ViewListRelationFilter> = z.object({
  every: z.lazy(() => ViewWhereInputSchema).optional(),
  some: z.lazy(() => ViewWhereInputSchema).optional(),
  none: z.lazy(() => ViewWhereInputSchema).optional()
}).strict();

export const ViewOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ViewOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NodeCountOrderByAggregateInputSchema: z.ZodType<Prisma.NodeCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  storedViews: z.lazy(() => SortOrderSchema).optional(),
  featured: z.lazy(() => SortOrderSchema).optional(),
  pictureURL: z.lazy(() => SortOrderSchema).optional(),
  pictureUnsafe: z.lazy(() => SortOrderSchema).optional(),
  hidden: z.lazy(() => SortOrderSchema).optional(),
  views: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NodeAvgOrderByAggregateInputSchema: z.ZodType<Prisma.NodeAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  storedViews: z.lazy(() => SortOrderSchema).optional(),
  views: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NodeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.NodeMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  storedViews: z.lazy(() => SortOrderSchema).optional(),
  featured: z.lazy(() => SortOrderSchema).optional(),
  pictureURL: z.lazy(() => SortOrderSchema).optional(),
  pictureUnsafe: z.lazy(() => SortOrderSchema).optional(),
  hidden: z.lazy(() => SortOrderSchema).optional(),
  views: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NodeMinOrderByAggregateInputSchema: z.ZodType<Prisma.NodeMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  storedViews: z.lazy(() => SortOrderSchema).optional(),
  featured: z.lazy(() => SortOrderSchema).optional(),
  pictureURL: z.lazy(() => SortOrderSchema).optional(),
  pictureUnsafe: z.lazy(() => SortOrderSchema).optional(),
  hidden: z.lazy(() => SortOrderSchema).optional(),
  views: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NodeSumOrderByAggregateInputSchema: z.ZodType<Prisma.NodeSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  storedViews: z.lazy(() => SortOrderSchema).optional(),
  views: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NodeRelationFilterSchema: z.ZodType<Prisma.NodeRelationFilter> = z.object({
  is: z.lazy(() => NodeWhereInputSchema).optional(),
  isNot: z.lazy(() => NodeWhereInputSchema).optional()
}).strict();

export const NodeNullableRelationFilterSchema: z.ZodType<Prisma.NodeNullableRelationFilter> = z.object({
  is: z.lazy(() => NodeWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => NodeWhereInputSchema).optional().nullable()
}).strict();

export const ChoiceCountOrderByAggregateInputSchema: z.ZodType<Prisma.ChoiceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  hidden: z.lazy(() => SortOrderSchema).optional(),
  isCanon: z.lazy(() => SortOrderSchema).optional(),
  score: z.lazy(() => SortOrderSchema).optional(),
  fromNodeId: z.lazy(() => SortOrderSchema).optional(),
  toNodeId: z.lazy(() => SortOrderSchema).optional(),
  suggestedByAccountId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChoiceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ChoiceAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  score: z.lazy(() => SortOrderSchema).optional(),
  fromNodeId: z.lazy(() => SortOrderSchema).optional(),
  toNodeId: z.lazy(() => SortOrderSchema).optional(),
  suggestedByAccountId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChoiceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ChoiceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  hidden: z.lazy(() => SortOrderSchema).optional(),
  isCanon: z.lazy(() => SortOrderSchema).optional(),
  score: z.lazy(() => SortOrderSchema).optional(),
  fromNodeId: z.lazy(() => SortOrderSchema).optional(),
  toNodeId: z.lazy(() => SortOrderSchema).optional(),
  suggestedByAccountId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChoiceMinOrderByAggregateInputSchema: z.ZodType<Prisma.ChoiceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  hidden: z.lazy(() => SortOrderSchema).optional(),
  isCanon: z.lazy(() => SortOrderSchema).optional(),
  score: z.lazy(() => SortOrderSchema).optional(),
  fromNodeId: z.lazy(() => SortOrderSchema).optional(),
  toNodeId: z.lazy(() => SortOrderSchema).optional(),
  suggestedByAccountId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChoiceSumOrderByAggregateInputSchema: z.ZodType<Prisma.ChoiceSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  score: z.lazy(() => SortOrderSchema).optional(),
  fromNodeId: z.lazy(() => SortOrderSchema).optional(),
  toNodeId: z.lazy(() => SortOrderSchema).optional(),
  suggestedByAccountId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackCountOrderByAggregateInputSchema: z.ZodType<Prisma.FeedbackCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  IP: z.lazy(() => SortOrderSchema).optional(),
  reportingType: z.lazy(() => SortOrderSchema).optional(),
  reportingId: z.lazy(() => SortOrderSchema).optional(),
  info: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  submittedById: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FeedbackAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reportingId: z.lazy(() => SortOrderSchema).optional(),
  submittedById: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FeedbackMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  IP: z.lazy(() => SortOrderSchema).optional(),
  reportingType: z.lazy(() => SortOrderSchema).optional(),
  reportingId: z.lazy(() => SortOrderSchema).optional(),
  info: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  submittedById: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackMinOrderByAggregateInputSchema: z.ZodType<Prisma.FeedbackMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  IP: z.lazy(() => SortOrderSchema).optional(),
  reportingType: z.lazy(() => SortOrderSchema).optional(),
  reportingId: z.lazy(() => SortOrderSchema).optional(),
  info: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  submittedById: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FeedbackSumOrderByAggregateInputSchema: z.ZodType<Prisma.FeedbackSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reportingId: z.lazy(() => SortOrderSchema).optional(),
  submittedById: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountRelationFilterSchema: z.ZodType<Prisma.AccountRelationFilter> = z.object({
  is: z.lazy(() => AccountWhereInputSchema).optional(),
  isNot: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const NotificationCountOrderByAggregateInputSchema: z.ZodType<Prisma.NotificationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  link: z.lazy(() => SortOrderSchema).optional(),
  seen: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NotificationAvgOrderByAggregateInputSchema: z.ZodType<Prisma.NotificationAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NotificationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.NotificationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  link: z.lazy(() => SortOrderSchema).optional(),
  seen: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NotificationMinOrderByAggregateInputSchema: z.ZodType<Prisma.NotificationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  link: z.lazy(() => SortOrderSchema).optional(),
  seen: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NotificationSumOrderByAggregateInputSchema: z.ZodType<Prisma.NotificationSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChoiceRelationFilterSchema: z.ZodType<Prisma.ChoiceRelationFilter> = z.object({
  is: z.lazy(() => ChoiceWhereInputSchema).optional(),
  isNot: z.lazy(() => ChoiceWhereInputSchema).optional()
}).strict();

export const ReactionReactionIdentifierCompoundUniqueInputSchema: z.ZodType<Prisma.ReactionReactionIdentifierCompoundUniqueInput> = z.object({
  accountId: z.number(),
  choiceId: z.number()
}).strict();

export const ReactionCountOrderByAggregateInputSchema: z.ZodType<Prisma.ReactionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  like: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  choiceId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReactionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ReactionAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  choiceId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReactionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReactionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  like: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  choiceId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReactionMinOrderByAggregateInputSchema: z.ZodType<Prisma.ReactionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  like: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  choiceId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReactionSumOrderByAggregateInputSchema: z.ZodType<Prisma.ReactionSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  choiceId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ViewCountOrderByAggregateInputSchema: z.ZodType<Prisma.ViewCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  IP: z.lazy(() => SortOrderSchema).optional(),
  nodeId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ViewAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ViewAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nodeId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ViewMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ViewMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  IP: z.lazy(() => SortOrderSchema).optional(),
  nodeId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ViewMinOrderByAggregateInputSchema: z.ZodType<Prisma.ViewMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  IP: z.lazy(() => SortOrderSchema).optional(),
  nodeId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ViewSumOrderByAggregateInputSchema: z.ZodType<Prisma.ViewSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nodeId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChoiceCreateNestedManyWithoutSuggestedByInputSchema: z.ZodType<Prisma.ChoiceCreateNestedManyWithoutSuggestedByInput> = z.object({
  create: z.union([ z.lazy(() => ChoiceCreateWithoutSuggestedByInputSchema),z.lazy(() => ChoiceCreateWithoutSuggestedByInputSchema).array(),z.lazy(() => ChoiceUncheckedCreateWithoutSuggestedByInputSchema),z.lazy(() => ChoiceUncheckedCreateWithoutSuggestedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChoiceCreateOrConnectWithoutSuggestedByInputSchema),z.lazy(() => ChoiceCreateOrConnectWithoutSuggestedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChoiceCreateManySuggestedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChoiceWhereUniqueInputSchema),z.lazy(() => ChoiceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NodeCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.NodeCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutOwnerInputSchema),z.lazy(() => NodeCreateWithoutOwnerInputSchema).array(),z.lazy(() => NodeUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => NodeUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NodeCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => NodeCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NodeCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NodeWhereUniqueInputSchema),z.lazy(() => NodeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FeedbackCreateNestedManyWithoutSubmittedByInputSchema: z.ZodType<Prisma.FeedbackCreateNestedManyWithoutSubmittedByInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCreateWithoutSubmittedByInputSchema),z.lazy(() => FeedbackCreateWithoutSubmittedByInputSchema).array(),z.lazy(() => FeedbackUncheckedCreateWithoutSubmittedByInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutSubmittedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackCreateOrConnectWithoutSubmittedByInputSchema),z.lazy(() => FeedbackCreateOrConnectWithoutSubmittedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackCreateManySubmittedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NotificationCreateNestedManyWithoutAccountInputSchema: z.ZodType<Prisma.NotificationCreateNestedManyWithoutAccountInput> = z.object({
  create: z.union([ z.lazy(() => NotificationCreateWithoutAccountInputSchema),z.lazy(() => NotificationCreateWithoutAccountInputSchema).array(),z.lazy(() => NotificationUncheckedCreateWithoutAccountInputSchema),z.lazy(() => NotificationUncheckedCreateWithoutAccountInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutAccountInputSchema),z.lazy(() => NotificationCreateOrConnectWithoutAccountInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManyAccountInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReactionCreateNestedManyWithoutAccountInputSchema: z.ZodType<Prisma.ReactionCreateNestedManyWithoutAccountInput> = z.object({
  create: z.union([ z.lazy(() => ReactionCreateWithoutAccountInputSchema),z.lazy(() => ReactionCreateWithoutAccountInputSchema).array(),z.lazy(() => ReactionUncheckedCreateWithoutAccountInputSchema),z.lazy(() => ReactionUncheckedCreateWithoutAccountInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReactionCreateOrConnectWithoutAccountInputSchema),z.lazy(() => ReactionCreateOrConnectWithoutAccountInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReactionCreateManyAccountInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ChoiceUncheckedCreateNestedManyWithoutSuggestedByInputSchema: z.ZodType<Prisma.ChoiceUncheckedCreateNestedManyWithoutSuggestedByInput> = z.object({
  create: z.union([ z.lazy(() => ChoiceCreateWithoutSuggestedByInputSchema),z.lazy(() => ChoiceCreateWithoutSuggestedByInputSchema).array(),z.lazy(() => ChoiceUncheckedCreateWithoutSuggestedByInputSchema),z.lazy(() => ChoiceUncheckedCreateWithoutSuggestedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChoiceCreateOrConnectWithoutSuggestedByInputSchema),z.lazy(() => ChoiceCreateOrConnectWithoutSuggestedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChoiceCreateManySuggestedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChoiceWhereUniqueInputSchema),z.lazy(() => ChoiceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NodeUncheckedCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.NodeUncheckedCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutOwnerInputSchema),z.lazy(() => NodeCreateWithoutOwnerInputSchema).array(),z.lazy(() => NodeUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => NodeUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NodeCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => NodeCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NodeCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NodeWhereUniqueInputSchema),z.lazy(() => NodeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FeedbackUncheckedCreateNestedManyWithoutSubmittedByInputSchema: z.ZodType<Prisma.FeedbackUncheckedCreateNestedManyWithoutSubmittedByInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCreateWithoutSubmittedByInputSchema),z.lazy(() => FeedbackCreateWithoutSubmittedByInputSchema).array(),z.lazy(() => FeedbackUncheckedCreateWithoutSubmittedByInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutSubmittedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackCreateOrConnectWithoutSubmittedByInputSchema),z.lazy(() => FeedbackCreateOrConnectWithoutSubmittedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackCreateManySubmittedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NotificationUncheckedCreateNestedManyWithoutAccountInputSchema: z.ZodType<Prisma.NotificationUncheckedCreateNestedManyWithoutAccountInput> = z.object({
  create: z.union([ z.lazy(() => NotificationCreateWithoutAccountInputSchema),z.lazy(() => NotificationCreateWithoutAccountInputSchema).array(),z.lazy(() => NotificationUncheckedCreateWithoutAccountInputSchema),z.lazy(() => NotificationUncheckedCreateWithoutAccountInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutAccountInputSchema),z.lazy(() => NotificationCreateOrConnectWithoutAccountInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManyAccountInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReactionUncheckedCreateNestedManyWithoutAccountInputSchema: z.ZodType<Prisma.ReactionUncheckedCreateNestedManyWithoutAccountInput> = z.object({
  create: z.union([ z.lazy(() => ReactionCreateWithoutAccountInputSchema),z.lazy(() => ReactionCreateWithoutAccountInputSchema).array(),z.lazy(() => ReactionUncheckedCreateWithoutAccountInputSchema),z.lazy(() => ReactionUncheckedCreateWithoutAccountInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReactionCreateOrConnectWithoutAccountInputSchema),z.lazy(() => ReactionCreateOrConnectWithoutAccountInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReactionCreateManyAccountInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const ChoiceUpdateManyWithoutSuggestedByNestedInputSchema: z.ZodType<Prisma.ChoiceUpdateManyWithoutSuggestedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChoiceCreateWithoutSuggestedByInputSchema),z.lazy(() => ChoiceCreateWithoutSuggestedByInputSchema).array(),z.lazy(() => ChoiceUncheckedCreateWithoutSuggestedByInputSchema),z.lazy(() => ChoiceUncheckedCreateWithoutSuggestedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChoiceCreateOrConnectWithoutSuggestedByInputSchema),z.lazy(() => ChoiceCreateOrConnectWithoutSuggestedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChoiceUpsertWithWhereUniqueWithoutSuggestedByInputSchema),z.lazy(() => ChoiceUpsertWithWhereUniqueWithoutSuggestedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChoiceCreateManySuggestedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChoiceWhereUniqueInputSchema),z.lazy(() => ChoiceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChoiceWhereUniqueInputSchema),z.lazy(() => ChoiceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChoiceWhereUniqueInputSchema),z.lazy(() => ChoiceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChoiceWhereUniqueInputSchema),z.lazy(() => ChoiceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChoiceUpdateWithWhereUniqueWithoutSuggestedByInputSchema),z.lazy(() => ChoiceUpdateWithWhereUniqueWithoutSuggestedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChoiceUpdateManyWithWhereWithoutSuggestedByInputSchema),z.lazy(() => ChoiceUpdateManyWithWhereWithoutSuggestedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChoiceScalarWhereInputSchema),z.lazy(() => ChoiceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NodeUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.NodeUpdateManyWithoutOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutOwnerInputSchema),z.lazy(() => NodeCreateWithoutOwnerInputSchema).array(),z.lazy(() => NodeUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => NodeUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NodeCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => NodeCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NodeUpsertWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => NodeUpsertWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NodeCreateManyOwnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NodeWhereUniqueInputSchema),z.lazy(() => NodeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NodeWhereUniqueInputSchema),z.lazy(() => NodeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NodeWhereUniqueInputSchema),z.lazy(() => NodeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NodeWhereUniqueInputSchema),z.lazy(() => NodeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NodeUpdateWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => NodeUpdateWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NodeUpdateManyWithWhereWithoutOwnerInputSchema),z.lazy(() => NodeUpdateManyWithWhereWithoutOwnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NodeScalarWhereInputSchema),z.lazy(() => NodeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FeedbackUpdateManyWithoutSubmittedByNestedInputSchema: z.ZodType<Prisma.FeedbackUpdateManyWithoutSubmittedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCreateWithoutSubmittedByInputSchema),z.lazy(() => FeedbackCreateWithoutSubmittedByInputSchema).array(),z.lazy(() => FeedbackUncheckedCreateWithoutSubmittedByInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutSubmittedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackCreateOrConnectWithoutSubmittedByInputSchema),z.lazy(() => FeedbackCreateOrConnectWithoutSubmittedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FeedbackUpsertWithWhereUniqueWithoutSubmittedByInputSchema),z.lazy(() => FeedbackUpsertWithWhereUniqueWithoutSubmittedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackCreateManySubmittedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FeedbackUpdateWithWhereUniqueWithoutSubmittedByInputSchema),z.lazy(() => FeedbackUpdateWithWhereUniqueWithoutSubmittedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FeedbackUpdateManyWithWhereWithoutSubmittedByInputSchema),z.lazy(() => FeedbackUpdateManyWithWhereWithoutSubmittedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FeedbackScalarWhereInputSchema),z.lazy(() => FeedbackScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NotificationUpdateManyWithoutAccountNestedInputSchema: z.ZodType<Prisma.NotificationUpdateManyWithoutAccountNestedInput> = z.object({
  create: z.union([ z.lazy(() => NotificationCreateWithoutAccountInputSchema),z.lazy(() => NotificationCreateWithoutAccountInputSchema).array(),z.lazy(() => NotificationUncheckedCreateWithoutAccountInputSchema),z.lazy(() => NotificationUncheckedCreateWithoutAccountInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutAccountInputSchema),z.lazy(() => NotificationCreateOrConnectWithoutAccountInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NotificationUpsertWithWhereUniqueWithoutAccountInputSchema),z.lazy(() => NotificationUpsertWithWhereUniqueWithoutAccountInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManyAccountInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NotificationUpdateWithWhereUniqueWithoutAccountInputSchema),z.lazy(() => NotificationUpdateWithWhereUniqueWithoutAccountInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NotificationUpdateManyWithWhereWithoutAccountInputSchema),z.lazy(() => NotificationUpdateManyWithWhereWithoutAccountInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NotificationScalarWhereInputSchema),z.lazy(() => NotificationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReactionUpdateManyWithoutAccountNestedInputSchema: z.ZodType<Prisma.ReactionUpdateManyWithoutAccountNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReactionCreateWithoutAccountInputSchema),z.lazy(() => ReactionCreateWithoutAccountInputSchema).array(),z.lazy(() => ReactionUncheckedCreateWithoutAccountInputSchema),z.lazy(() => ReactionUncheckedCreateWithoutAccountInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReactionCreateOrConnectWithoutAccountInputSchema),z.lazy(() => ReactionCreateOrConnectWithoutAccountInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReactionUpsertWithWhereUniqueWithoutAccountInputSchema),z.lazy(() => ReactionUpsertWithWhereUniqueWithoutAccountInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReactionCreateManyAccountInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReactionUpdateWithWhereUniqueWithoutAccountInputSchema),z.lazy(() => ReactionUpdateWithWhereUniqueWithoutAccountInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReactionUpdateManyWithWhereWithoutAccountInputSchema),z.lazy(() => ReactionUpdateManyWithWhereWithoutAccountInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReactionScalarWhereInputSchema),z.lazy(() => ReactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ChoiceUncheckedUpdateManyWithoutSuggestedByNestedInputSchema: z.ZodType<Prisma.ChoiceUncheckedUpdateManyWithoutSuggestedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChoiceCreateWithoutSuggestedByInputSchema),z.lazy(() => ChoiceCreateWithoutSuggestedByInputSchema).array(),z.lazy(() => ChoiceUncheckedCreateWithoutSuggestedByInputSchema),z.lazy(() => ChoiceUncheckedCreateWithoutSuggestedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChoiceCreateOrConnectWithoutSuggestedByInputSchema),z.lazy(() => ChoiceCreateOrConnectWithoutSuggestedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChoiceUpsertWithWhereUniqueWithoutSuggestedByInputSchema),z.lazy(() => ChoiceUpsertWithWhereUniqueWithoutSuggestedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChoiceCreateManySuggestedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChoiceWhereUniqueInputSchema),z.lazy(() => ChoiceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChoiceWhereUniqueInputSchema),z.lazy(() => ChoiceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChoiceWhereUniqueInputSchema),z.lazy(() => ChoiceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChoiceWhereUniqueInputSchema),z.lazy(() => ChoiceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChoiceUpdateWithWhereUniqueWithoutSuggestedByInputSchema),z.lazy(() => ChoiceUpdateWithWhereUniqueWithoutSuggestedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChoiceUpdateManyWithWhereWithoutSuggestedByInputSchema),z.lazy(() => ChoiceUpdateManyWithWhereWithoutSuggestedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChoiceScalarWhereInputSchema),z.lazy(() => ChoiceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NodeUncheckedUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.NodeUncheckedUpdateManyWithoutOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutOwnerInputSchema),z.lazy(() => NodeCreateWithoutOwnerInputSchema).array(),z.lazy(() => NodeUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => NodeUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NodeCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => NodeCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NodeUpsertWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => NodeUpsertWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NodeCreateManyOwnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NodeWhereUniqueInputSchema),z.lazy(() => NodeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NodeWhereUniqueInputSchema),z.lazy(() => NodeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NodeWhereUniqueInputSchema),z.lazy(() => NodeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NodeWhereUniqueInputSchema),z.lazy(() => NodeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NodeUpdateWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => NodeUpdateWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NodeUpdateManyWithWhereWithoutOwnerInputSchema),z.lazy(() => NodeUpdateManyWithWhereWithoutOwnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NodeScalarWhereInputSchema),z.lazy(() => NodeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FeedbackUncheckedUpdateManyWithoutSubmittedByNestedInputSchema: z.ZodType<Prisma.FeedbackUncheckedUpdateManyWithoutSubmittedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => FeedbackCreateWithoutSubmittedByInputSchema),z.lazy(() => FeedbackCreateWithoutSubmittedByInputSchema).array(),z.lazy(() => FeedbackUncheckedCreateWithoutSubmittedByInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutSubmittedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FeedbackCreateOrConnectWithoutSubmittedByInputSchema),z.lazy(() => FeedbackCreateOrConnectWithoutSubmittedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FeedbackUpsertWithWhereUniqueWithoutSubmittedByInputSchema),z.lazy(() => FeedbackUpsertWithWhereUniqueWithoutSubmittedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FeedbackCreateManySubmittedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FeedbackWhereUniqueInputSchema),z.lazy(() => FeedbackWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FeedbackUpdateWithWhereUniqueWithoutSubmittedByInputSchema),z.lazy(() => FeedbackUpdateWithWhereUniqueWithoutSubmittedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FeedbackUpdateManyWithWhereWithoutSubmittedByInputSchema),z.lazy(() => FeedbackUpdateManyWithWhereWithoutSubmittedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FeedbackScalarWhereInputSchema),z.lazy(() => FeedbackScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NotificationUncheckedUpdateManyWithoutAccountNestedInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateManyWithoutAccountNestedInput> = z.object({
  create: z.union([ z.lazy(() => NotificationCreateWithoutAccountInputSchema),z.lazy(() => NotificationCreateWithoutAccountInputSchema).array(),z.lazy(() => NotificationUncheckedCreateWithoutAccountInputSchema),z.lazy(() => NotificationUncheckedCreateWithoutAccountInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutAccountInputSchema),z.lazy(() => NotificationCreateOrConnectWithoutAccountInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NotificationUpsertWithWhereUniqueWithoutAccountInputSchema),z.lazy(() => NotificationUpsertWithWhereUniqueWithoutAccountInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManyAccountInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NotificationUpdateWithWhereUniqueWithoutAccountInputSchema),z.lazy(() => NotificationUpdateWithWhereUniqueWithoutAccountInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NotificationUpdateManyWithWhereWithoutAccountInputSchema),z.lazy(() => NotificationUpdateManyWithWhereWithoutAccountInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NotificationScalarWhereInputSchema),z.lazy(() => NotificationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReactionUncheckedUpdateManyWithoutAccountNestedInputSchema: z.ZodType<Prisma.ReactionUncheckedUpdateManyWithoutAccountNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReactionCreateWithoutAccountInputSchema),z.lazy(() => ReactionCreateWithoutAccountInputSchema).array(),z.lazy(() => ReactionUncheckedCreateWithoutAccountInputSchema),z.lazy(() => ReactionUncheckedCreateWithoutAccountInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReactionCreateOrConnectWithoutAccountInputSchema),z.lazy(() => ReactionCreateOrConnectWithoutAccountInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReactionUpsertWithWhereUniqueWithoutAccountInputSchema),z.lazy(() => ReactionUpsertWithWhereUniqueWithoutAccountInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReactionCreateManyAccountInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReactionUpdateWithWhereUniqueWithoutAccountInputSchema),z.lazy(() => ReactionUpdateWithWhereUniqueWithoutAccountInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReactionUpdateManyWithWhereWithoutAccountInputSchema),z.lazy(() => ReactionUpdateManyWithWhereWithoutAccountInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReactionScalarWhereInputSchema),z.lazy(() => ReactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountCreateNestedOneWithoutOwnedNodesInputSchema: z.ZodType<Prisma.AccountCreateNestedOneWithoutOwnedNodesInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutOwnedNodesInputSchema),z.lazy(() => AccountUncheckedCreateWithoutOwnedNodesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountCreateOrConnectWithoutOwnedNodesInputSchema).optional(),
  connect: z.lazy(() => AccountWhereUniqueInputSchema).optional()
}).strict();

export const ChoiceCreateNestedManyWithoutFromNodeInputSchema: z.ZodType<Prisma.ChoiceCreateNestedManyWithoutFromNodeInput> = z.object({
  create: z.union([ z.lazy(() => ChoiceCreateWithoutFromNodeInputSchema),z.lazy(() => ChoiceCreateWithoutFromNodeInputSchema).array(),z.lazy(() => ChoiceUncheckedCreateWithoutFromNodeInputSchema),z.lazy(() => ChoiceUncheckedCreateWithoutFromNodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChoiceCreateOrConnectWithoutFromNodeInputSchema),z.lazy(() => ChoiceCreateOrConnectWithoutFromNodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChoiceCreateManyFromNodeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChoiceWhereUniqueInputSchema),z.lazy(() => ChoiceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ChoiceCreateNestedManyWithoutToNodeInputSchema: z.ZodType<Prisma.ChoiceCreateNestedManyWithoutToNodeInput> = z.object({
  create: z.union([ z.lazy(() => ChoiceCreateWithoutToNodeInputSchema),z.lazy(() => ChoiceCreateWithoutToNodeInputSchema).array(),z.lazy(() => ChoiceUncheckedCreateWithoutToNodeInputSchema),z.lazy(() => ChoiceUncheckedCreateWithoutToNodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChoiceCreateOrConnectWithoutToNodeInputSchema),z.lazy(() => ChoiceCreateOrConnectWithoutToNodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChoiceCreateManyToNodeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChoiceWhereUniqueInputSchema),z.lazy(() => ChoiceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ViewCreateNestedManyWithoutNodeInputSchema: z.ZodType<Prisma.ViewCreateNestedManyWithoutNodeInput> = z.object({
  create: z.union([ z.lazy(() => ViewCreateWithoutNodeInputSchema),z.lazy(() => ViewCreateWithoutNodeInputSchema).array(),z.lazy(() => ViewUncheckedCreateWithoutNodeInputSchema),z.lazy(() => ViewUncheckedCreateWithoutNodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ViewCreateOrConnectWithoutNodeInputSchema),z.lazy(() => ViewCreateOrConnectWithoutNodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ViewCreateManyNodeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ViewWhereUniqueInputSchema),z.lazy(() => ViewWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ChoiceUncheckedCreateNestedManyWithoutFromNodeInputSchema: z.ZodType<Prisma.ChoiceUncheckedCreateNestedManyWithoutFromNodeInput> = z.object({
  create: z.union([ z.lazy(() => ChoiceCreateWithoutFromNodeInputSchema),z.lazy(() => ChoiceCreateWithoutFromNodeInputSchema).array(),z.lazy(() => ChoiceUncheckedCreateWithoutFromNodeInputSchema),z.lazy(() => ChoiceUncheckedCreateWithoutFromNodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChoiceCreateOrConnectWithoutFromNodeInputSchema),z.lazy(() => ChoiceCreateOrConnectWithoutFromNodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChoiceCreateManyFromNodeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChoiceWhereUniqueInputSchema),z.lazy(() => ChoiceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ChoiceUncheckedCreateNestedManyWithoutToNodeInputSchema: z.ZodType<Prisma.ChoiceUncheckedCreateNestedManyWithoutToNodeInput> = z.object({
  create: z.union([ z.lazy(() => ChoiceCreateWithoutToNodeInputSchema),z.lazy(() => ChoiceCreateWithoutToNodeInputSchema).array(),z.lazy(() => ChoiceUncheckedCreateWithoutToNodeInputSchema),z.lazy(() => ChoiceUncheckedCreateWithoutToNodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChoiceCreateOrConnectWithoutToNodeInputSchema),z.lazy(() => ChoiceCreateOrConnectWithoutToNodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChoiceCreateManyToNodeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChoiceWhereUniqueInputSchema),z.lazy(() => ChoiceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ViewUncheckedCreateNestedManyWithoutNodeInputSchema: z.ZodType<Prisma.ViewUncheckedCreateNestedManyWithoutNodeInput> = z.object({
  create: z.union([ z.lazy(() => ViewCreateWithoutNodeInputSchema),z.lazy(() => ViewCreateWithoutNodeInputSchema).array(),z.lazy(() => ViewUncheckedCreateWithoutNodeInputSchema),z.lazy(() => ViewUncheckedCreateWithoutNodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ViewCreateOrConnectWithoutNodeInputSchema),z.lazy(() => ViewCreateOrConnectWithoutNodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ViewCreateManyNodeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ViewWhereUniqueInputSchema),z.lazy(() => ViewWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUpdateOneWithoutOwnedNodesNestedInputSchema: z.ZodType<Prisma.AccountUpdateOneWithoutOwnedNodesNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutOwnedNodesInputSchema),z.lazy(() => AccountUncheckedCreateWithoutOwnedNodesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountCreateOrConnectWithoutOwnedNodesInputSchema).optional(),
  upsert: z.lazy(() => AccountUpsertWithoutOwnedNodesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AccountWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AccountWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AccountWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AccountUpdateToOneWithWhereWithoutOwnedNodesInputSchema),z.lazy(() => AccountUpdateWithoutOwnedNodesInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutOwnedNodesInputSchema) ]).optional(),
}).strict();

export const ChoiceUpdateManyWithoutFromNodeNestedInputSchema: z.ZodType<Prisma.ChoiceUpdateManyWithoutFromNodeNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChoiceCreateWithoutFromNodeInputSchema),z.lazy(() => ChoiceCreateWithoutFromNodeInputSchema).array(),z.lazy(() => ChoiceUncheckedCreateWithoutFromNodeInputSchema),z.lazy(() => ChoiceUncheckedCreateWithoutFromNodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChoiceCreateOrConnectWithoutFromNodeInputSchema),z.lazy(() => ChoiceCreateOrConnectWithoutFromNodeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChoiceUpsertWithWhereUniqueWithoutFromNodeInputSchema),z.lazy(() => ChoiceUpsertWithWhereUniqueWithoutFromNodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChoiceCreateManyFromNodeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChoiceWhereUniqueInputSchema),z.lazy(() => ChoiceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChoiceWhereUniqueInputSchema),z.lazy(() => ChoiceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChoiceWhereUniqueInputSchema),z.lazy(() => ChoiceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChoiceWhereUniqueInputSchema),z.lazy(() => ChoiceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChoiceUpdateWithWhereUniqueWithoutFromNodeInputSchema),z.lazy(() => ChoiceUpdateWithWhereUniqueWithoutFromNodeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChoiceUpdateManyWithWhereWithoutFromNodeInputSchema),z.lazy(() => ChoiceUpdateManyWithWhereWithoutFromNodeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChoiceScalarWhereInputSchema),z.lazy(() => ChoiceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ChoiceUpdateManyWithoutToNodeNestedInputSchema: z.ZodType<Prisma.ChoiceUpdateManyWithoutToNodeNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChoiceCreateWithoutToNodeInputSchema),z.lazy(() => ChoiceCreateWithoutToNodeInputSchema).array(),z.lazy(() => ChoiceUncheckedCreateWithoutToNodeInputSchema),z.lazy(() => ChoiceUncheckedCreateWithoutToNodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChoiceCreateOrConnectWithoutToNodeInputSchema),z.lazy(() => ChoiceCreateOrConnectWithoutToNodeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChoiceUpsertWithWhereUniqueWithoutToNodeInputSchema),z.lazy(() => ChoiceUpsertWithWhereUniqueWithoutToNodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChoiceCreateManyToNodeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChoiceWhereUniqueInputSchema),z.lazy(() => ChoiceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChoiceWhereUniqueInputSchema),z.lazy(() => ChoiceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChoiceWhereUniqueInputSchema),z.lazy(() => ChoiceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChoiceWhereUniqueInputSchema),z.lazy(() => ChoiceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChoiceUpdateWithWhereUniqueWithoutToNodeInputSchema),z.lazy(() => ChoiceUpdateWithWhereUniqueWithoutToNodeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChoiceUpdateManyWithWhereWithoutToNodeInputSchema),z.lazy(() => ChoiceUpdateManyWithWhereWithoutToNodeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChoiceScalarWhereInputSchema),z.lazy(() => ChoiceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ViewUpdateManyWithoutNodeNestedInputSchema: z.ZodType<Prisma.ViewUpdateManyWithoutNodeNestedInput> = z.object({
  create: z.union([ z.lazy(() => ViewCreateWithoutNodeInputSchema),z.lazy(() => ViewCreateWithoutNodeInputSchema).array(),z.lazy(() => ViewUncheckedCreateWithoutNodeInputSchema),z.lazy(() => ViewUncheckedCreateWithoutNodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ViewCreateOrConnectWithoutNodeInputSchema),z.lazy(() => ViewCreateOrConnectWithoutNodeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ViewUpsertWithWhereUniqueWithoutNodeInputSchema),z.lazy(() => ViewUpsertWithWhereUniqueWithoutNodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ViewCreateManyNodeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ViewWhereUniqueInputSchema),z.lazy(() => ViewWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ViewWhereUniqueInputSchema),z.lazy(() => ViewWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ViewWhereUniqueInputSchema),z.lazy(() => ViewWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ViewWhereUniqueInputSchema),z.lazy(() => ViewWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ViewUpdateWithWhereUniqueWithoutNodeInputSchema),z.lazy(() => ViewUpdateWithWhereUniqueWithoutNodeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ViewUpdateManyWithWhereWithoutNodeInputSchema),z.lazy(() => ViewUpdateManyWithWhereWithoutNodeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ViewScalarWhereInputSchema),z.lazy(() => ViewScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const ChoiceUncheckedUpdateManyWithoutFromNodeNestedInputSchema: z.ZodType<Prisma.ChoiceUncheckedUpdateManyWithoutFromNodeNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChoiceCreateWithoutFromNodeInputSchema),z.lazy(() => ChoiceCreateWithoutFromNodeInputSchema).array(),z.lazy(() => ChoiceUncheckedCreateWithoutFromNodeInputSchema),z.lazy(() => ChoiceUncheckedCreateWithoutFromNodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChoiceCreateOrConnectWithoutFromNodeInputSchema),z.lazy(() => ChoiceCreateOrConnectWithoutFromNodeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChoiceUpsertWithWhereUniqueWithoutFromNodeInputSchema),z.lazy(() => ChoiceUpsertWithWhereUniqueWithoutFromNodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChoiceCreateManyFromNodeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChoiceWhereUniqueInputSchema),z.lazy(() => ChoiceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChoiceWhereUniqueInputSchema),z.lazy(() => ChoiceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChoiceWhereUniqueInputSchema),z.lazy(() => ChoiceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChoiceWhereUniqueInputSchema),z.lazy(() => ChoiceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChoiceUpdateWithWhereUniqueWithoutFromNodeInputSchema),z.lazy(() => ChoiceUpdateWithWhereUniqueWithoutFromNodeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChoiceUpdateManyWithWhereWithoutFromNodeInputSchema),z.lazy(() => ChoiceUpdateManyWithWhereWithoutFromNodeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChoiceScalarWhereInputSchema),z.lazy(() => ChoiceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ChoiceUncheckedUpdateManyWithoutToNodeNestedInputSchema: z.ZodType<Prisma.ChoiceUncheckedUpdateManyWithoutToNodeNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChoiceCreateWithoutToNodeInputSchema),z.lazy(() => ChoiceCreateWithoutToNodeInputSchema).array(),z.lazy(() => ChoiceUncheckedCreateWithoutToNodeInputSchema),z.lazy(() => ChoiceUncheckedCreateWithoutToNodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChoiceCreateOrConnectWithoutToNodeInputSchema),z.lazy(() => ChoiceCreateOrConnectWithoutToNodeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChoiceUpsertWithWhereUniqueWithoutToNodeInputSchema),z.lazy(() => ChoiceUpsertWithWhereUniqueWithoutToNodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChoiceCreateManyToNodeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChoiceWhereUniqueInputSchema),z.lazy(() => ChoiceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChoiceWhereUniqueInputSchema),z.lazy(() => ChoiceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChoiceWhereUniqueInputSchema),z.lazy(() => ChoiceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChoiceWhereUniqueInputSchema),z.lazy(() => ChoiceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChoiceUpdateWithWhereUniqueWithoutToNodeInputSchema),z.lazy(() => ChoiceUpdateWithWhereUniqueWithoutToNodeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChoiceUpdateManyWithWhereWithoutToNodeInputSchema),z.lazy(() => ChoiceUpdateManyWithWhereWithoutToNodeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChoiceScalarWhereInputSchema),z.lazy(() => ChoiceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ViewUncheckedUpdateManyWithoutNodeNestedInputSchema: z.ZodType<Prisma.ViewUncheckedUpdateManyWithoutNodeNestedInput> = z.object({
  create: z.union([ z.lazy(() => ViewCreateWithoutNodeInputSchema),z.lazy(() => ViewCreateWithoutNodeInputSchema).array(),z.lazy(() => ViewUncheckedCreateWithoutNodeInputSchema),z.lazy(() => ViewUncheckedCreateWithoutNodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ViewCreateOrConnectWithoutNodeInputSchema),z.lazy(() => ViewCreateOrConnectWithoutNodeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ViewUpsertWithWhereUniqueWithoutNodeInputSchema),z.lazy(() => ViewUpsertWithWhereUniqueWithoutNodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ViewCreateManyNodeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ViewWhereUniqueInputSchema),z.lazy(() => ViewWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ViewWhereUniqueInputSchema),z.lazy(() => ViewWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ViewWhereUniqueInputSchema),z.lazy(() => ViewWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ViewWhereUniqueInputSchema),z.lazy(() => ViewWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ViewUpdateWithWhereUniqueWithoutNodeInputSchema),z.lazy(() => ViewUpdateWithWhereUniqueWithoutNodeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ViewUpdateManyWithWhereWithoutNodeInputSchema),z.lazy(() => ViewUpdateManyWithWhereWithoutNodeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ViewScalarWhereInputSchema),z.lazy(() => ViewScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NodeCreateNestedOneWithoutChildChoicesInputSchema: z.ZodType<Prisma.NodeCreateNestedOneWithoutChildChoicesInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutChildChoicesInputSchema),z.lazy(() => NodeUncheckedCreateWithoutChildChoicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NodeCreateOrConnectWithoutChildChoicesInputSchema).optional(),
  connect: z.lazy(() => NodeWhereUniqueInputSchema).optional()
}).strict();

export const NodeCreateNestedOneWithoutParentChoicesInputSchema: z.ZodType<Prisma.NodeCreateNestedOneWithoutParentChoicesInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutParentChoicesInputSchema),z.lazy(() => NodeUncheckedCreateWithoutParentChoicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NodeCreateOrConnectWithoutParentChoicesInputSchema).optional(),
  connect: z.lazy(() => NodeWhereUniqueInputSchema).optional()
}).strict();

export const AccountCreateNestedOneWithoutSuggestedChoicesInputSchema: z.ZodType<Prisma.AccountCreateNestedOneWithoutSuggestedChoicesInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutSuggestedChoicesInputSchema),z.lazy(() => AccountUncheckedCreateWithoutSuggestedChoicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountCreateOrConnectWithoutSuggestedChoicesInputSchema).optional(),
  connect: z.lazy(() => AccountWhereUniqueInputSchema).optional()
}).strict();

export const ReactionCreateNestedManyWithoutChoiceInputSchema: z.ZodType<Prisma.ReactionCreateNestedManyWithoutChoiceInput> = z.object({
  create: z.union([ z.lazy(() => ReactionCreateWithoutChoiceInputSchema),z.lazy(() => ReactionCreateWithoutChoiceInputSchema).array(),z.lazy(() => ReactionUncheckedCreateWithoutChoiceInputSchema),z.lazy(() => ReactionUncheckedCreateWithoutChoiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReactionCreateOrConnectWithoutChoiceInputSchema),z.lazy(() => ReactionCreateOrConnectWithoutChoiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReactionCreateManyChoiceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReactionUncheckedCreateNestedManyWithoutChoiceInputSchema: z.ZodType<Prisma.ReactionUncheckedCreateNestedManyWithoutChoiceInput> = z.object({
  create: z.union([ z.lazy(() => ReactionCreateWithoutChoiceInputSchema),z.lazy(() => ReactionCreateWithoutChoiceInputSchema).array(),z.lazy(() => ReactionUncheckedCreateWithoutChoiceInputSchema),z.lazy(() => ReactionUncheckedCreateWithoutChoiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReactionCreateOrConnectWithoutChoiceInputSchema),z.lazy(() => ReactionCreateOrConnectWithoutChoiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReactionCreateManyChoiceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NodeUpdateOneRequiredWithoutChildChoicesNestedInputSchema: z.ZodType<Prisma.NodeUpdateOneRequiredWithoutChildChoicesNestedInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutChildChoicesInputSchema),z.lazy(() => NodeUncheckedCreateWithoutChildChoicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NodeCreateOrConnectWithoutChildChoicesInputSchema).optional(),
  upsert: z.lazy(() => NodeUpsertWithoutChildChoicesInputSchema).optional(),
  connect: z.lazy(() => NodeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => NodeUpdateToOneWithWhereWithoutChildChoicesInputSchema),z.lazy(() => NodeUpdateWithoutChildChoicesInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutChildChoicesInputSchema) ]).optional(),
}).strict();

export const NodeUpdateOneWithoutParentChoicesNestedInputSchema: z.ZodType<Prisma.NodeUpdateOneWithoutParentChoicesNestedInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutParentChoicesInputSchema),z.lazy(() => NodeUncheckedCreateWithoutParentChoicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NodeCreateOrConnectWithoutParentChoicesInputSchema).optional(),
  upsert: z.lazy(() => NodeUpsertWithoutParentChoicesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => NodeWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => NodeWhereInputSchema) ]).optional(),
  connect: z.lazy(() => NodeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => NodeUpdateToOneWithWhereWithoutParentChoicesInputSchema),z.lazy(() => NodeUpdateWithoutParentChoicesInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutParentChoicesInputSchema) ]).optional(),
}).strict();

export const AccountUpdateOneWithoutSuggestedChoicesNestedInputSchema: z.ZodType<Prisma.AccountUpdateOneWithoutSuggestedChoicesNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutSuggestedChoicesInputSchema),z.lazy(() => AccountUncheckedCreateWithoutSuggestedChoicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountCreateOrConnectWithoutSuggestedChoicesInputSchema).optional(),
  upsert: z.lazy(() => AccountUpsertWithoutSuggestedChoicesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AccountWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AccountWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AccountWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AccountUpdateToOneWithWhereWithoutSuggestedChoicesInputSchema),z.lazy(() => AccountUpdateWithoutSuggestedChoicesInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutSuggestedChoicesInputSchema) ]).optional(),
}).strict();

export const ReactionUpdateManyWithoutChoiceNestedInputSchema: z.ZodType<Prisma.ReactionUpdateManyWithoutChoiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReactionCreateWithoutChoiceInputSchema),z.lazy(() => ReactionCreateWithoutChoiceInputSchema).array(),z.lazy(() => ReactionUncheckedCreateWithoutChoiceInputSchema),z.lazy(() => ReactionUncheckedCreateWithoutChoiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReactionCreateOrConnectWithoutChoiceInputSchema),z.lazy(() => ReactionCreateOrConnectWithoutChoiceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReactionUpsertWithWhereUniqueWithoutChoiceInputSchema),z.lazy(() => ReactionUpsertWithWhereUniqueWithoutChoiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReactionCreateManyChoiceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReactionUpdateWithWhereUniqueWithoutChoiceInputSchema),z.lazy(() => ReactionUpdateWithWhereUniqueWithoutChoiceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReactionUpdateManyWithWhereWithoutChoiceInputSchema),z.lazy(() => ReactionUpdateManyWithWhereWithoutChoiceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReactionScalarWhereInputSchema),z.lazy(() => ReactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReactionUncheckedUpdateManyWithoutChoiceNestedInputSchema: z.ZodType<Prisma.ReactionUncheckedUpdateManyWithoutChoiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReactionCreateWithoutChoiceInputSchema),z.lazy(() => ReactionCreateWithoutChoiceInputSchema).array(),z.lazy(() => ReactionUncheckedCreateWithoutChoiceInputSchema),z.lazy(() => ReactionUncheckedCreateWithoutChoiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReactionCreateOrConnectWithoutChoiceInputSchema),z.lazy(() => ReactionCreateOrConnectWithoutChoiceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReactionUpsertWithWhereUniqueWithoutChoiceInputSchema),z.lazy(() => ReactionUpsertWithWhereUniqueWithoutChoiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReactionCreateManyChoiceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReactionWhereUniqueInputSchema),z.lazy(() => ReactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReactionUpdateWithWhereUniqueWithoutChoiceInputSchema),z.lazy(() => ReactionUpdateWithWhereUniqueWithoutChoiceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReactionUpdateManyWithWhereWithoutChoiceInputSchema),z.lazy(() => ReactionUpdateManyWithWhereWithoutChoiceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReactionScalarWhereInputSchema),z.lazy(() => ReactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountCreateNestedOneWithoutSubmittedFeedbackInputSchema: z.ZodType<Prisma.AccountCreateNestedOneWithoutSubmittedFeedbackInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutSubmittedFeedbackInputSchema),z.lazy(() => AccountUncheckedCreateWithoutSubmittedFeedbackInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountCreateOrConnectWithoutSubmittedFeedbackInputSchema).optional(),
  connect: z.lazy(() => AccountWhereUniqueInputSchema).optional()
}).strict();

export const AccountUpdateOneWithoutSubmittedFeedbackNestedInputSchema: z.ZodType<Prisma.AccountUpdateOneWithoutSubmittedFeedbackNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutSubmittedFeedbackInputSchema),z.lazy(() => AccountUncheckedCreateWithoutSubmittedFeedbackInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountCreateOrConnectWithoutSubmittedFeedbackInputSchema).optional(),
  upsert: z.lazy(() => AccountUpsertWithoutSubmittedFeedbackInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AccountWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AccountWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AccountWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AccountUpdateToOneWithWhereWithoutSubmittedFeedbackInputSchema),z.lazy(() => AccountUpdateWithoutSubmittedFeedbackInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutSubmittedFeedbackInputSchema) ]).optional(),
}).strict();

export const AccountCreateNestedOneWithoutNotificationsInputSchema: z.ZodType<Prisma.AccountCreateNestedOneWithoutNotificationsInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutNotificationsInputSchema),z.lazy(() => AccountUncheckedCreateWithoutNotificationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountCreateOrConnectWithoutNotificationsInputSchema).optional(),
  connect: z.lazy(() => AccountWhereUniqueInputSchema).optional()
}).strict();

export const AccountUpdateOneRequiredWithoutNotificationsNestedInputSchema: z.ZodType<Prisma.AccountUpdateOneRequiredWithoutNotificationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutNotificationsInputSchema),z.lazy(() => AccountUncheckedCreateWithoutNotificationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountCreateOrConnectWithoutNotificationsInputSchema).optional(),
  upsert: z.lazy(() => AccountUpsertWithoutNotificationsInputSchema).optional(),
  connect: z.lazy(() => AccountWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AccountUpdateToOneWithWhereWithoutNotificationsInputSchema),z.lazy(() => AccountUpdateWithoutNotificationsInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutNotificationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateNestedOneWithoutReactionInputSchema: z.ZodType<Prisma.AccountCreateNestedOneWithoutReactionInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutReactionInputSchema),z.lazy(() => AccountUncheckedCreateWithoutReactionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountCreateOrConnectWithoutReactionInputSchema).optional(),
  connect: z.lazy(() => AccountWhereUniqueInputSchema).optional()
}).strict();

export const ChoiceCreateNestedOneWithoutReactionsInputSchema: z.ZodType<Prisma.ChoiceCreateNestedOneWithoutReactionsInput> = z.object({
  create: z.union([ z.lazy(() => ChoiceCreateWithoutReactionsInputSchema),z.lazy(() => ChoiceUncheckedCreateWithoutReactionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ChoiceCreateOrConnectWithoutReactionsInputSchema).optional(),
  connect: z.lazy(() => ChoiceWhereUniqueInputSchema).optional()
}).strict();

export const AccountUpdateOneRequiredWithoutReactionNestedInputSchema: z.ZodType<Prisma.AccountUpdateOneRequiredWithoutReactionNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutReactionInputSchema),z.lazy(() => AccountUncheckedCreateWithoutReactionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountCreateOrConnectWithoutReactionInputSchema).optional(),
  upsert: z.lazy(() => AccountUpsertWithoutReactionInputSchema).optional(),
  connect: z.lazy(() => AccountWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AccountUpdateToOneWithWhereWithoutReactionInputSchema),z.lazy(() => AccountUpdateWithoutReactionInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutReactionInputSchema) ]).optional(),
}).strict();

export const ChoiceUpdateOneRequiredWithoutReactionsNestedInputSchema: z.ZodType<Prisma.ChoiceUpdateOneRequiredWithoutReactionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChoiceCreateWithoutReactionsInputSchema),z.lazy(() => ChoiceUncheckedCreateWithoutReactionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ChoiceCreateOrConnectWithoutReactionsInputSchema).optional(),
  upsert: z.lazy(() => ChoiceUpsertWithoutReactionsInputSchema).optional(),
  connect: z.lazy(() => ChoiceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ChoiceUpdateToOneWithWhereWithoutReactionsInputSchema),z.lazy(() => ChoiceUpdateWithoutReactionsInputSchema),z.lazy(() => ChoiceUncheckedUpdateWithoutReactionsInputSchema) ]).optional(),
}).strict();

export const NodeCreateNestedOneWithoutViewInputSchema: z.ZodType<Prisma.NodeCreateNestedOneWithoutViewInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutViewInputSchema),z.lazy(() => NodeUncheckedCreateWithoutViewInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NodeCreateOrConnectWithoutViewInputSchema).optional(),
  connect: z.lazy(() => NodeWhereUniqueInputSchema).optional()
}).strict();

export const NodeUpdateOneRequiredWithoutViewNestedInputSchema: z.ZodType<Prisma.NodeUpdateOneRequiredWithoutViewNestedInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutViewInputSchema),z.lazy(() => NodeUncheckedCreateWithoutViewInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NodeCreateOrConnectWithoutViewInputSchema).optional(),
  upsert: z.lazy(() => NodeUpsertWithoutViewInputSchema).optional(),
  connect: z.lazy(() => NodeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => NodeUpdateToOneWithWhereWithoutViewInputSchema),z.lazy(() => NodeUpdateWithoutViewInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutViewInputSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const ChoiceCreateWithoutSuggestedByInputSchema: z.ZodType<Prisma.ChoiceCreateWithoutSuggestedByInput> = z.object({
  slug: z.string(),
  action: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  hidden: z.boolean().optional(),
  isCanon: z.boolean(),
  score: z.number().int(),
  fromNode: z.lazy(() => NodeCreateNestedOneWithoutChildChoicesInputSchema),
  toNode: z.lazy(() => NodeCreateNestedOneWithoutParentChoicesInputSchema).optional(),
  reactions: z.lazy(() => ReactionCreateNestedManyWithoutChoiceInputSchema).optional()
}).strict();

export const ChoiceUncheckedCreateWithoutSuggestedByInputSchema: z.ZodType<Prisma.ChoiceUncheckedCreateWithoutSuggestedByInput> = z.object({
  id: z.number().int().optional(),
  slug: z.string(),
  action: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  hidden: z.boolean().optional(),
  isCanon: z.boolean(),
  score: z.number().int(),
  fromNodeId: z.number().int(),
  toNodeId: z.number().int().optional().nullable(),
  reactions: z.lazy(() => ReactionUncheckedCreateNestedManyWithoutChoiceInputSchema).optional()
}).strict();

export const ChoiceCreateOrConnectWithoutSuggestedByInputSchema: z.ZodType<Prisma.ChoiceCreateOrConnectWithoutSuggestedByInput> = z.object({
  where: z.lazy(() => ChoiceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ChoiceCreateWithoutSuggestedByInputSchema),z.lazy(() => ChoiceUncheckedCreateWithoutSuggestedByInputSchema) ]),
}).strict();

export const ChoiceCreateManySuggestedByInputEnvelopeSchema: z.ZodType<Prisma.ChoiceCreateManySuggestedByInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ChoiceCreateManySuggestedByInputSchema),z.lazy(() => ChoiceCreateManySuggestedByInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const NodeCreateWithoutOwnerInputSchema: z.ZodType<Prisma.NodeCreateWithoutOwnerInput> = z.object({
  slug: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  storedViews: z.number().int(),
  featured: z.boolean().optional(),
  pictureURL: z.string().optional().nullable(),
  pictureUnsafe: z.boolean().optional(),
  hidden: z.boolean().optional(),
  views: z.number().int(),
  childChoices: z.lazy(() => ChoiceCreateNestedManyWithoutFromNodeInputSchema).optional(),
  parentChoices: z.lazy(() => ChoiceCreateNestedManyWithoutToNodeInputSchema).optional(),
  View: z.lazy(() => ViewCreateNestedManyWithoutNodeInputSchema).optional()
}).strict();

export const NodeUncheckedCreateWithoutOwnerInputSchema: z.ZodType<Prisma.NodeUncheckedCreateWithoutOwnerInput> = z.object({
  id: z.number().int().optional(),
  slug: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  storedViews: z.number().int(),
  featured: z.boolean().optional(),
  pictureURL: z.string().optional().nullable(),
  pictureUnsafe: z.boolean().optional(),
  hidden: z.boolean().optional(),
  views: z.number().int(),
  childChoices: z.lazy(() => ChoiceUncheckedCreateNestedManyWithoutFromNodeInputSchema).optional(),
  parentChoices: z.lazy(() => ChoiceUncheckedCreateNestedManyWithoutToNodeInputSchema).optional(),
  View: z.lazy(() => ViewUncheckedCreateNestedManyWithoutNodeInputSchema).optional()
}).strict();

export const NodeCreateOrConnectWithoutOwnerInputSchema: z.ZodType<Prisma.NodeCreateOrConnectWithoutOwnerInput> = z.object({
  where: z.lazy(() => NodeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NodeCreateWithoutOwnerInputSchema),z.lazy(() => NodeUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict();

export const NodeCreateManyOwnerInputEnvelopeSchema: z.ZodType<Prisma.NodeCreateManyOwnerInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => NodeCreateManyOwnerInputSchema),z.lazy(() => NodeCreateManyOwnerInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FeedbackCreateWithoutSubmittedByInputSchema: z.ZodType<Prisma.FeedbackCreateWithoutSubmittedByInput> = z.object({
  IP: z.string(),
  reportingType: z.string().optional().nullable(),
  reportingId: z.number().int().optional().nullable(),
  info: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const FeedbackUncheckedCreateWithoutSubmittedByInputSchema: z.ZodType<Prisma.FeedbackUncheckedCreateWithoutSubmittedByInput> = z.object({
  id: z.number().int().optional(),
  IP: z.string(),
  reportingType: z.string().optional().nullable(),
  reportingId: z.number().int().optional().nullable(),
  info: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const FeedbackCreateOrConnectWithoutSubmittedByInputSchema: z.ZodType<Prisma.FeedbackCreateOrConnectWithoutSubmittedByInput> = z.object({
  where: z.lazy(() => FeedbackWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FeedbackCreateWithoutSubmittedByInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutSubmittedByInputSchema) ]),
}).strict();

export const FeedbackCreateManySubmittedByInputEnvelopeSchema: z.ZodType<Prisma.FeedbackCreateManySubmittedByInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FeedbackCreateManySubmittedByInputSchema),z.lazy(() => FeedbackCreateManySubmittedByInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const NotificationCreateWithoutAccountInputSchema: z.ZodType<Prisma.NotificationCreateWithoutAccountInput> = z.object({
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  link: z.string().optional().nullable(),
  seen: z.boolean().optional()
}).strict();

export const NotificationUncheckedCreateWithoutAccountInputSchema: z.ZodType<Prisma.NotificationUncheckedCreateWithoutAccountInput> = z.object({
  id: z.number().int().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  link: z.string().optional().nullable(),
  seen: z.boolean().optional()
}).strict();

export const NotificationCreateOrConnectWithoutAccountInputSchema: z.ZodType<Prisma.NotificationCreateOrConnectWithoutAccountInput> = z.object({
  where: z.lazy(() => NotificationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NotificationCreateWithoutAccountInputSchema),z.lazy(() => NotificationUncheckedCreateWithoutAccountInputSchema) ]),
}).strict();

export const NotificationCreateManyAccountInputEnvelopeSchema: z.ZodType<Prisma.NotificationCreateManyAccountInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => NotificationCreateManyAccountInputSchema),z.lazy(() => NotificationCreateManyAccountInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ReactionCreateWithoutAccountInputSchema: z.ZodType<Prisma.ReactionCreateWithoutAccountInput> = z.object({
  like: z.boolean(),
  choice: z.lazy(() => ChoiceCreateNestedOneWithoutReactionsInputSchema)
}).strict();

export const ReactionUncheckedCreateWithoutAccountInputSchema: z.ZodType<Prisma.ReactionUncheckedCreateWithoutAccountInput> = z.object({
  id: z.number().int().optional(),
  like: z.boolean(),
  choiceId: z.number().int()
}).strict();

export const ReactionCreateOrConnectWithoutAccountInputSchema: z.ZodType<Prisma.ReactionCreateOrConnectWithoutAccountInput> = z.object({
  where: z.lazy(() => ReactionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReactionCreateWithoutAccountInputSchema),z.lazy(() => ReactionUncheckedCreateWithoutAccountInputSchema) ]),
}).strict();

export const ReactionCreateManyAccountInputEnvelopeSchema: z.ZodType<Prisma.ReactionCreateManyAccountInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReactionCreateManyAccountInputSchema),z.lazy(() => ReactionCreateManyAccountInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ChoiceUpsertWithWhereUniqueWithoutSuggestedByInputSchema: z.ZodType<Prisma.ChoiceUpsertWithWhereUniqueWithoutSuggestedByInput> = z.object({
  where: z.lazy(() => ChoiceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ChoiceUpdateWithoutSuggestedByInputSchema),z.lazy(() => ChoiceUncheckedUpdateWithoutSuggestedByInputSchema) ]),
  create: z.union([ z.lazy(() => ChoiceCreateWithoutSuggestedByInputSchema),z.lazy(() => ChoiceUncheckedCreateWithoutSuggestedByInputSchema) ]),
}).strict();

export const ChoiceUpdateWithWhereUniqueWithoutSuggestedByInputSchema: z.ZodType<Prisma.ChoiceUpdateWithWhereUniqueWithoutSuggestedByInput> = z.object({
  where: z.lazy(() => ChoiceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ChoiceUpdateWithoutSuggestedByInputSchema),z.lazy(() => ChoiceUncheckedUpdateWithoutSuggestedByInputSchema) ]),
}).strict();

export const ChoiceUpdateManyWithWhereWithoutSuggestedByInputSchema: z.ZodType<Prisma.ChoiceUpdateManyWithWhereWithoutSuggestedByInput> = z.object({
  where: z.lazy(() => ChoiceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ChoiceUpdateManyMutationInputSchema),z.lazy(() => ChoiceUncheckedUpdateManyWithoutSuggestedByInputSchema) ]),
}).strict();

export const ChoiceScalarWhereInputSchema: z.ZodType<Prisma.ChoiceScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ChoiceScalarWhereInputSchema),z.lazy(() => ChoiceScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChoiceScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChoiceScalarWhereInputSchema),z.lazy(() => ChoiceScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  hidden: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isCanon: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  score: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  fromNodeId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  toNodeId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  suggestedByAccountId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const NodeUpsertWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.NodeUpsertWithWhereUniqueWithoutOwnerInput> = z.object({
  where: z.lazy(() => NodeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => NodeUpdateWithoutOwnerInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutOwnerInputSchema) ]),
  create: z.union([ z.lazy(() => NodeCreateWithoutOwnerInputSchema),z.lazy(() => NodeUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict();

export const NodeUpdateWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.NodeUpdateWithWhereUniqueWithoutOwnerInput> = z.object({
  where: z.lazy(() => NodeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => NodeUpdateWithoutOwnerInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutOwnerInputSchema) ]),
}).strict();

export const NodeUpdateManyWithWhereWithoutOwnerInputSchema: z.ZodType<Prisma.NodeUpdateManyWithWhereWithoutOwnerInput> = z.object({
  where: z.lazy(() => NodeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => NodeUpdateManyMutationInputSchema),z.lazy(() => NodeUncheckedUpdateManyWithoutOwnerInputSchema) ]),
}).strict();

export const NodeScalarWhereInputSchema: z.ZodType<Prisma.NodeScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NodeScalarWhereInputSchema),z.lazy(() => NodeScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NodeScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NodeScalarWhereInputSchema),z.lazy(() => NodeScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  storedViews: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  featured: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  pictureURL: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  pictureUnsafe: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  hidden: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  views: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  ownerId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const FeedbackUpsertWithWhereUniqueWithoutSubmittedByInputSchema: z.ZodType<Prisma.FeedbackUpsertWithWhereUniqueWithoutSubmittedByInput> = z.object({
  where: z.lazy(() => FeedbackWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FeedbackUpdateWithoutSubmittedByInputSchema),z.lazy(() => FeedbackUncheckedUpdateWithoutSubmittedByInputSchema) ]),
  create: z.union([ z.lazy(() => FeedbackCreateWithoutSubmittedByInputSchema),z.lazy(() => FeedbackUncheckedCreateWithoutSubmittedByInputSchema) ]),
}).strict();

export const FeedbackUpdateWithWhereUniqueWithoutSubmittedByInputSchema: z.ZodType<Prisma.FeedbackUpdateWithWhereUniqueWithoutSubmittedByInput> = z.object({
  where: z.lazy(() => FeedbackWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FeedbackUpdateWithoutSubmittedByInputSchema),z.lazy(() => FeedbackUncheckedUpdateWithoutSubmittedByInputSchema) ]),
}).strict();

export const FeedbackUpdateManyWithWhereWithoutSubmittedByInputSchema: z.ZodType<Prisma.FeedbackUpdateManyWithWhereWithoutSubmittedByInput> = z.object({
  where: z.lazy(() => FeedbackScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FeedbackUpdateManyMutationInputSchema),z.lazy(() => FeedbackUncheckedUpdateManyWithoutSubmittedByInputSchema) ]),
}).strict();

export const FeedbackScalarWhereInputSchema: z.ZodType<Prisma.FeedbackScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FeedbackScalarWhereInputSchema),z.lazy(() => FeedbackScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FeedbackScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FeedbackScalarWhereInputSchema),z.lazy(() => FeedbackScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  IP: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reportingType: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  reportingId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  info: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  submittedById: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const NotificationUpsertWithWhereUniqueWithoutAccountInputSchema: z.ZodType<Prisma.NotificationUpsertWithWhereUniqueWithoutAccountInput> = z.object({
  where: z.lazy(() => NotificationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => NotificationUpdateWithoutAccountInputSchema),z.lazy(() => NotificationUncheckedUpdateWithoutAccountInputSchema) ]),
  create: z.union([ z.lazy(() => NotificationCreateWithoutAccountInputSchema),z.lazy(() => NotificationUncheckedCreateWithoutAccountInputSchema) ]),
}).strict();

export const NotificationUpdateWithWhereUniqueWithoutAccountInputSchema: z.ZodType<Prisma.NotificationUpdateWithWhereUniqueWithoutAccountInput> = z.object({
  where: z.lazy(() => NotificationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => NotificationUpdateWithoutAccountInputSchema),z.lazy(() => NotificationUncheckedUpdateWithoutAccountInputSchema) ]),
}).strict();

export const NotificationUpdateManyWithWhereWithoutAccountInputSchema: z.ZodType<Prisma.NotificationUpdateManyWithWhereWithoutAccountInput> = z.object({
  where: z.lazy(() => NotificationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => NotificationUpdateManyMutationInputSchema),z.lazy(() => NotificationUncheckedUpdateManyWithoutAccountInputSchema) ]),
}).strict();

export const NotificationScalarWhereInputSchema: z.ZodType<Prisma.NotificationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NotificationScalarWhereInputSchema),z.lazy(() => NotificationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NotificationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NotificationScalarWhereInputSchema),z.lazy(() => NotificationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  link: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  seen: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  accountId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const ReactionUpsertWithWhereUniqueWithoutAccountInputSchema: z.ZodType<Prisma.ReactionUpsertWithWhereUniqueWithoutAccountInput> = z.object({
  where: z.lazy(() => ReactionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReactionUpdateWithoutAccountInputSchema),z.lazy(() => ReactionUncheckedUpdateWithoutAccountInputSchema) ]),
  create: z.union([ z.lazy(() => ReactionCreateWithoutAccountInputSchema),z.lazy(() => ReactionUncheckedCreateWithoutAccountInputSchema) ]),
}).strict();

export const ReactionUpdateWithWhereUniqueWithoutAccountInputSchema: z.ZodType<Prisma.ReactionUpdateWithWhereUniqueWithoutAccountInput> = z.object({
  where: z.lazy(() => ReactionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReactionUpdateWithoutAccountInputSchema),z.lazy(() => ReactionUncheckedUpdateWithoutAccountInputSchema) ]),
}).strict();

export const ReactionUpdateManyWithWhereWithoutAccountInputSchema: z.ZodType<Prisma.ReactionUpdateManyWithWhereWithoutAccountInput> = z.object({
  where: z.lazy(() => ReactionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReactionUpdateManyMutationInputSchema),z.lazy(() => ReactionUncheckedUpdateManyWithoutAccountInputSchema) ]),
}).strict();

export const ReactionScalarWhereInputSchema: z.ZodType<Prisma.ReactionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReactionScalarWhereInputSchema),z.lazy(() => ReactionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReactionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReactionScalarWhereInputSchema),z.lazy(() => ReactionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  like: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  accountId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  choiceId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const AccountCreateWithoutOwnedNodesInputSchema: z.ZodType<Prisma.AccountCreateWithoutOwnedNodesInput> = z.object({
  screenName: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  encryptedPassword: z.string(),
  isAdmin: z.boolean().optional(),
  hidden: z.boolean().optional(),
  profilePicURL: z.string().optional().nullable(),
  profilePicUnsafe: z.boolean().optional(),
  bio: z.string().optional().nullable(),
  lastIP: z.string(),
  totalNodeViews: z.number().int(),
  totalSuggestionScore: z.number().int(),
  suggestedChoices: z.lazy(() => ChoiceCreateNestedManyWithoutSuggestedByInputSchema).optional(),
  submittedFeedback: z.lazy(() => FeedbackCreateNestedManyWithoutSubmittedByInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutAccountInputSchema).optional(),
  Reaction: z.lazy(() => ReactionCreateNestedManyWithoutAccountInputSchema).optional()
}).strict();

export const AccountUncheckedCreateWithoutOwnedNodesInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutOwnedNodesInput> = z.object({
  id: z.number().int().optional(),
  screenName: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  encryptedPassword: z.string(),
  isAdmin: z.boolean().optional(),
  hidden: z.boolean().optional(),
  profilePicURL: z.string().optional().nullable(),
  profilePicUnsafe: z.boolean().optional(),
  bio: z.string().optional().nullable(),
  lastIP: z.string(),
  totalNodeViews: z.number().int(),
  totalSuggestionScore: z.number().int(),
  suggestedChoices: z.lazy(() => ChoiceUncheckedCreateNestedManyWithoutSuggestedByInputSchema).optional(),
  submittedFeedback: z.lazy(() => FeedbackUncheckedCreateNestedManyWithoutSubmittedByInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutAccountInputSchema).optional(),
  Reaction: z.lazy(() => ReactionUncheckedCreateNestedManyWithoutAccountInputSchema).optional()
}).strict();

export const AccountCreateOrConnectWithoutOwnedNodesInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutOwnedNodesInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutOwnedNodesInputSchema),z.lazy(() => AccountUncheckedCreateWithoutOwnedNodesInputSchema) ]),
}).strict();

export const ChoiceCreateWithoutFromNodeInputSchema: z.ZodType<Prisma.ChoiceCreateWithoutFromNodeInput> = z.object({
  slug: z.string(),
  action: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  hidden: z.boolean().optional(),
  isCanon: z.boolean(),
  score: z.number().int(),
  toNode: z.lazy(() => NodeCreateNestedOneWithoutParentChoicesInputSchema).optional(),
  suggestedBy: z.lazy(() => AccountCreateNestedOneWithoutSuggestedChoicesInputSchema).optional(),
  reactions: z.lazy(() => ReactionCreateNestedManyWithoutChoiceInputSchema).optional()
}).strict();

export const ChoiceUncheckedCreateWithoutFromNodeInputSchema: z.ZodType<Prisma.ChoiceUncheckedCreateWithoutFromNodeInput> = z.object({
  id: z.number().int().optional(),
  slug: z.string(),
  action: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  hidden: z.boolean().optional(),
  isCanon: z.boolean(),
  score: z.number().int(),
  toNodeId: z.number().int().optional().nullable(),
  suggestedByAccountId: z.number().int().optional().nullable(),
  reactions: z.lazy(() => ReactionUncheckedCreateNestedManyWithoutChoiceInputSchema).optional()
}).strict();

export const ChoiceCreateOrConnectWithoutFromNodeInputSchema: z.ZodType<Prisma.ChoiceCreateOrConnectWithoutFromNodeInput> = z.object({
  where: z.lazy(() => ChoiceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ChoiceCreateWithoutFromNodeInputSchema),z.lazy(() => ChoiceUncheckedCreateWithoutFromNodeInputSchema) ]),
}).strict();

export const ChoiceCreateManyFromNodeInputEnvelopeSchema: z.ZodType<Prisma.ChoiceCreateManyFromNodeInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ChoiceCreateManyFromNodeInputSchema),z.lazy(() => ChoiceCreateManyFromNodeInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ChoiceCreateWithoutToNodeInputSchema: z.ZodType<Prisma.ChoiceCreateWithoutToNodeInput> = z.object({
  slug: z.string(),
  action: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  hidden: z.boolean().optional(),
  isCanon: z.boolean(),
  score: z.number().int(),
  fromNode: z.lazy(() => NodeCreateNestedOneWithoutChildChoicesInputSchema),
  suggestedBy: z.lazy(() => AccountCreateNestedOneWithoutSuggestedChoicesInputSchema).optional(),
  reactions: z.lazy(() => ReactionCreateNestedManyWithoutChoiceInputSchema).optional()
}).strict();

export const ChoiceUncheckedCreateWithoutToNodeInputSchema: z.ZodType<Prisma.ChoiceUncheckedCreateWithoutToNodeInput> = z.object({
  id: z.number().int().optional(),
  slug: z.string(),
  action: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  hidden: z.boolean().optional(),
  isCanon: z.boolean(),
  score: z.number().int(),
  fromNodeId: z.number().int(),
  suggestedByAccountId: z.number().int().optional().nullable(),
  reactions: z.lazy(() => ReactionUncheckedCreateNestedManyWithoutChoiceInputSchema).optional()
}).strict();

export const ChoiceCreateOrConnectWithoutToNodeInputSchema: z.ZodType<Prisma.ChoiceCreateOrConnectWithoutToNodeInput> = z.object({
  where: z.lazy(() => ChoiceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ChoiceCreateWithoutToNodeInputSchema),z.lazy(() => ChoiceUncheckedCreateWithoutToNodeInputSchema) ]),
}).strict();

export const ChoiceCreateManyToNodeInputEnvelopeSchema: z.ZodType<Prisma.ChoiceCreateManyToNodeInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ChoiceCreateManyToNodeInputSchema),z.lazy(() => ChoiceCreateManyToNodeInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ViewCreateWithoutNodeInputSchema: z.ZodType<Prisma.ViewCreateWithoutNodeInput> = z.object({
  IP: z.string()
}).strict();

export const ViewUncheckedCreateWithoutNodeInputSchema: z.ZodType<Prisma.ViewUncheckedCreateWithoutNodeInput> = z.object({
  id: z.number().int().optional(),
  IP: z.string()
}).strict();

export const ViewCreateOrConnectWithoutNodeInputSchema: z.ZodType<Prisma.ViewCreateOrConnectWithoutNodeInput> = z.object({
  where: z.lazy(() => ViewWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ViewCreateWithoutNodeInputSchema),z.lazy(() => ViewUncheckedCreateWithoutNodeInputSchema) ]),
}).strict();

export const ViewCreateManyNodeInputEnvelopeSchema: z.ZodType<Prisma.ViewCreateManyNodeInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ViewCreateManyNodeInputSchema),z.lazy(() => ViewCreateManyNodeInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AccountUpsertWithoutOwnedNodesInputSchema: z.ZodType<Prisma.AccountUpsertWithoutOwnedNodesInput> = z.object({
  update: z.union([ z.lazy(() => AccountUpdateWithoutOwnedNodesInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutOwnedNodesInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutOwnedNodesInputSchema),z.lazy(() => AccountUncheckedCreateWithoutOwnedNodesInputSchema) ]),
  where: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const AccountUpdateToOneWithWhereWithoutOwnedNodesInputSchema: z.ZodType<Prisma.AccountUpdateToOneWithWhereWithoutOwnedNodesInput> = z.object({
  where: z.lazy(() => AccountWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AccountUpdateWithoutOwnedNodesInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutOwnedNodesInputSchema) ]),
}).strict();

export const AccountUpdateWithoutOwnedNodesInputSchema: z.ZodType<Prisma.AccountUpdateWithoutOwnedNodesInput> = z.object({
  screenName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  encryptedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isAdmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  profilePicURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profilePicUnsafe: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastIP: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalNodeViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalSuggestionScore: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suggestedChoices: z.lazy(() => ChoiceUpdateManyWithoutSuggestedByNestedInputSchema).optional(),
  submittedFeedback: z.lazy(() => FeedbackUpdateManyWithoutSubmittedByNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutAccountNestedInputSchema).optional(),
  Reaction: z.lazy(() => ReactionUpdateManyWithoutAccountNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateWithoutOwnedNodesInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutOwnedNodesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  screenName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  encryptedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isAdmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  profilePicURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profilePicUnsafe: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastIP: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalNodeViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalSuggestionScore: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suggestedChoices: z.lazy(() => ChoiceUncheckedUpdateManyWithoutSuggestedByNestedInputSchema).optional(),
  submittedFeedback: z.lazy(() => FeedbackUncheckedUpdateManyWithoutSubmittedByNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutAccountNestedInputSchema).optional(),
  Reaction: z.lazy(() => ReactionUncheckedUpdateManyWithoutAccountNestedInputSchema).optional()
}).strict();

export const ChoiceUpsertWithWhereUniqueWithoutFromNodeInputSchema: z.ZodType<Prisma.ChoiceUpsertWithWhereUniqueWithoutFromNodeInput> = z.object({
  where: z.lazy(() => ChoiceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ChoiceUpdateWithoutFromNodeInputSchema),z.lazy(() => ChoiceUncheckedUpdateWithoutFromNodeInputSchema) ]),
  create: z.union([ z.lazy(() => ChoiceCreateWithoutFromNodeInputSchema),z.lazy(() => ChoiceUncheckedCreateWithoutFromNodeInputSchema) ]),
}).strict();

export const ChoiceUpdateWithWhereUniqueWithoutFromNodeInputSchema: z.ZodType<Prisma.ChoiceUpdateWithWhereUniqueWithoutFromNodeInput> = z.object({
  where: z.lazy(() => ChoiceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ChoiceUpdateWithoutFromNodeInputSchema),z.lazy(() => ChoiceUncheckedUpdateWithoutFromNodeInputSchema) ]),
}).strict();

export const ChoiceUpdateManyWithWhereWithoutFromNodeInputSchema: z.ZodType<Prisma.ChoiceUpdateManyWithWhereWithoutFromNodeInput> = z.object({
  where: z.lazy(() => ChoiceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ChoiceUpdateManyMutationInputSchema),z.lazy(() => ChoiceUncheckedUpdateManyWithoutFromNodeInputSchema) ]),
}).strict();

export const ChoiceUpsertWithWhereUniqueWithoutToNodeInputSchema: z.ZodType<Prisma.ChoiceUpsertWithWhereUniqueWithoutToNodeInput> = z.object({
  where: z.lazy(() => ChoiceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ChoiceUpdateWithoutToNodeInputSchema),z.lazy(() => ChoiceUncheckedUpdateWithoutToNodeInputSchema) ]),
  create: z.union([ z.lazy(() => ChoiceCreateWithoutToNodeInputSchema),z.lazy(() => ChoiceUncheckedCreateWithoutToNodeInputSchema) ]),
}).strict();

export const ChoiceUpdateWithWhereUniqueWithoutToNodeInputSchema: z.ZodType<Prisma.ChoiceUpdateWithWhereUniqueWithoutToNodeInput> = z.object({
  where: z.lazy(() => ChoiceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ChoiceUpdateWithoutToNodeInputSchema),z.lazy(() => ChoiceUncheckedUpdateWithoutToNodeInputSchema) ]),
}).strict();

export const ChoiceUpdateManyWithWhereWithoutToNodeInputSchema: z.ZodType<Prisma.ChoiceUpdateManyWithWhereWithoutToNodeInput> = z.object({
  where: z.lazy(() => ChoiceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ChoiceUpdateManyMutationInputSchema),z.lazy(() => ChoiceUncheckedUpdateManyWithoutToNodeInputSchema) ]),
}).strict();

export const ViewUpsertWithWhereUniqueWithoutNodeInputSchema: z.ZodType<Prisma.ViewUpsertWithWhereUniqueWithoutNodeInput> = z.object({
  where: z.lazy(() => ViewWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ViewUpdateWithoutNodeInputSchema),z.lazy(() => ViewUncheckedUpdateWithoutNodeInputSchema) ]),
  create: z.union([ z.lazy(() => ViewCreateWithoutNodeInputSchema),z.lazy(() => ViewUncheckedCreateWithoutNodeInputSchema) ]),
}).strict();

export const ViewUpdateWithWhereUniqueWithoutNodeInputSchema: z.ZodType<Prisma.ViewUpdateWithWhereUniqueWithoutNodeInput> = z.object({
  where: z.lazy(() => ViewWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ViewUpdateWithoutNodeInputSchema),z.lazy(() => ViewUncheckedUpdateWithoutNodeInputSchema) ]),
}).strict();

export const ViewUpdateManyWithWhereWithoutNodeInputSchema: z.ZodType<Prisma.ViewUpdateManyWithWhereWithoutNodeInput> = z.object({
  where: z.lazy(() => ViewScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ViewUpdateManyMutationInputSchema),z.lazy(() => ViewUncheckedUpdateManyWithoutNodeInputSchema) ]),
}).strict();

export const ViewScalarWhereInputSchema: z.ZodType<Prisma.ViewScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ViewScalarWhereInputSchema),z.lazy(() => ViewScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ViewScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ViewScalarWhereInputSchema),z.lazy(() => ViewScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  IP: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  nodeId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const NodeCreateWithoutChildChoicesInputSchema: z.ZodType<Prisma.NodeCreateWithoutChildChoicesInput> = z.object({
  slug: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  storedViews: z.number().int(),
  featured: z.boolean().optional(),
  pictureURL: z.string().optional().nullable(),
  pictureUnsafe: z.boolean().optional(),
  hidden: z.boolean().optional(),
  views: z.number().int(),
  owner: z.lazy(() => AccountCreateNestedOneWithoutOwnedNodesInputSchema).optional(),
  parentChoices: z.lazy(() => ChoiceCreateNestedManyWithoutToNodeInputSchema).optional(),
  View: z.lazy(() => ViewCreateNestedManyWithoutNodeInputSchema).optional()
}).strict();

export const NodeUncheckedCreateWithoutChildChoicesInputSchema: z.ZodType<Prisma.NodeUncheckedCreateWithoutChildChoicesInput> = z.object({
  id: z.number().int().optional(),
  slug: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  storedViews: z.number().int(),
  featured: z.boolean().optional(),
  pictureURL: z.string().optional().nullable(),
  pictureUnsafe: z.boolean().optional(),
  hidden: z.boolean().optional(),
  views: z.number().int(),
  ownerId: z.number().int().optional().nullable(),
  parentChoices: z.lazy(() => ChoiceUncheckedCreateNestedManyWithoutToNodeInputSchema).optional(),
  View: z.lazy(() => ViewUncheckedCreateNestedManyWithoutNodeInputSchema).optional()
}).strict();

export const NodeCreateOrConnectWithoutChildChoicesInputSchema: z.ZodType<Prisma.NodeCreateOrConnectWithoutChildChoicesInput> = z.object({
  where: z.lazy(() => NodeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NodeCreateWithoutChildChoicesInputSchema),z.lazy(() => NodeUncheckedCreateWithoutChildChoicesInputSchema) ]),
}).strict();

export const NodeCreateWithoutParentChoicesInputSchema: z.ZodType<Prisma.NodeCreateWithoutParentChoicesInput> = z.object({
  slug: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  storedViews: z.number().int(),
  featured: z.boolean().optional(),
  pictureURL: z.string().optional().nullable(),
  pictureUnsafe: z.boolean().optional(),
  hidden: z.boolean().optional(),
  views: z.number().int(),
  owner: z.lazy(() => AccountCreateNestedOneWithoutOwnedNodesInputSchema).optional(),
  childChoices: z.lazy(() => ChoiceCreateNestedManyWithoutFromNodeInputSchema).optional(),
  View: z.lazy(() => ViewCreateNestedManyWithoutNodeInputSchema).optional()
}).strict();

export const NodeUncheckedCreateWithoutParentChoicesInputSchema: z.ZodType<Prisma.NodeUncheckedCreateWithoutParentChoicesInput> = z.object({
  id: z.number().int().optional(),
  slug: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  storedViews: z.number().int(),
  featured: z.boolean().optional(),
  pictureURL: z.string().optional().nullable(),
  pictureUnsafe: z.boolean().optional(),
  hidden: z.boolean().optional(),
  views: z.number().int(),
  ownerId: z.number().int().optional().nullable(),
  childChoices: z.lazy(() => ChoiceUncheckedCreateNestedManyWithoutFromNodeInputSchema).optional(),
  View: z.lazy(() => ViewUncheckedCreateNestedManyWithoutNodeInputSchema).optional()
}).strict();

export const NodeCreateOrConnectWithoutParentChoicesInputSchema: z.ZodType<Prisma.NodeCreateOrConnectWithoutParentChoicesInput> = z.object({
  where: z.lazy(() => NodeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NodeCreateWithoutParentChoicesInputSchema),z.lazy(() => NodeUncheckedCreateWithoutParentChoicesInputSchema) ]),
}).strict();

export const AccountCreateWithoutSuggestedChoicesInputSchema: z.ZodType<Prisma.AccountCreateWithoutSuggestedChoicesInput> = z.object({
  screenName: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  encryptedPassword: z.string(),
  isAdmin: z.boolean().optional(),
  hidden: z.boolean().optional(),
  profilePicURL: z.string().optional().nullable(),
  profilePicUnsafe: z.boolean().optional(),
  bio: z.string().optional().nullable(),
  lastIP: z.string(),
  totalNodeViews: z.number().int(),
  totalSuggestionScore: z.number().int(),
  ownedNodes: z.lazy(() => NodeCreateNestedManyWithoutOwnerInputSchema).optional(),
  submittedFeedback: z.lazy(() => FeedbackCreateNestedManyWithoutSubmittedByInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutAccountInputSchema).optional(),
  Reaction: z.lazy(() => ReactionCreateNestedManyWithoutAccountInputSchema).optional()
}).strict();

export const AccountUncheckedCreateWithoutSuggestedChoicesInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutSuggestedChoicesInput> = z.object({
  id: z.number().int().optional(),
  screenName: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  encryptedPassword: z.string(),
  isAdmin: z.boolean().optional(),
  hidden: z.boolean().optional(),
  profilePicURL: z.string().optional().nullable(),
  profilePicUnsafe: z.boolean().optional(),
  bio: z.string().optional().nullable(),
  lastIP: z.string(),
  totalNodeViews: z.number().int(),
  totalSuggestionScore: z.number().int(),
  ownedNodes: z.lazy(() => NodeUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  submittedFeedback: z.lazy(() => FeedbackUncheckedCreateNestedManyWithoutSubmittedByInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutAccountInputSchema).optional(),
  Reaction: z.lazy(() => ReactionUncheckedCreateNestedManyWithoutAccountInputSchema).optional()
}).strict();

export const AccountCreateOrConnectWithoutSuggestedChoicesInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutSuggestedChoicesInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutSuggestedChoicesInputSchema),z.lazy(() => AccountUncheckedCreateWithoutSuggestedChoicesInputSchema) ]),
}).strict();

export const ReactionCreateWithoutChoiceInputSchema: z.ZodType<Prisma.ReactionCreateWithoutChoiceInput> = z.object({
  like: z.boolean(),
  account: z.lazy(() => AccountCreateNestedOneWithoutReactionInputSchema)
}).strict();

export const ReactionUncheckedCreateWithoutChoiceInputSchema: z.ZodType<Prisma.ReactionUncheckedCreateWithoutChoiceInput> = z.object({
  id: z.number().int().optional(),
  like: z.boolean(),
  accountId: z.number().int()
}).strict();

export const ReactionCreateOrConnectWithoutChoiceInputSchema: z.ZodType<Prisma.ReactionCreateOrConnectWithoutChoiceInput> = z.object({
  where: z.lazy(() => ReactionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReactionCreateWithoutChoiceInputSchema),z.lazy(() => ReactionUncheckedCreateWithoutChoiceInputSchema) ]),
}).strict();

export const ReactionCreateManyChoiceInputEnvelopeSchema: z.ZodType<Prisma.ReactionCreateManyChoiceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReactionCreateManyChoiceInputSchema),z.lazy(() => ReactionCreateManyChoiceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const NodeUpsertWithoutChildChoicesInputSchema: z.ZodType<Prisma.NodeUpsertWithoutChildChoicesInput> = z.object({
  update: z.union([ z.lazy(() => NodeUpdateWithoutChildChoicesInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutChildChoicesInputSchema) ]),
  create: z.union([ z.lazy(() => NodeCreateWithoutChildChoicesInputSchema),z.lazy(() => NodeUncheckedCreateWithoutChildChoicesInputSchema) ]),
  where: z.lazy(() => NodeWhereInputSchema).optional()
}).strict();

export const NodeUpdateToOneWithWhereWithoutChildChoicesInputSchema: z.ZodType<Prisma.NodeUpdateToOneWithWhereWithoutChildChoicesInput> = z.object({
  where: z.lazy(() => NodeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => NodeUpdateWithoutChildChoicesInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutChildChoicesInputSchema) ]),
}).strict();

export const NodeUpdateWithoutChildChoicesInputSchema: z.ZodType<Prisma.NodeUpdateWithoutChildChoicesInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  storedViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  featured: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pictureURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pictureUnsafe: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => AccountUpdateOneWithoutOwnedNodesNestedInputSchema).optional(),
  parentChoices: z.lazy(() => ChoiceUpdateManyWithoutToNodeNestedInputSchema).optional(),
  View: z.lazy(() => ViewUpdateManyWithoutNodeNestedInputSchema).optional()
}).strict();

export const NodeUncheckedUpdateWithoutChildChoicesInputSchema: z.ZodType<Prisma.NodeUncheckedUpdateWithoutChildChoicesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  storedViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  featured: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pictureURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pictureUnsafe: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parentChoices: z.lazy(() => ChoiceUncheckedUpdateManyWithoutToNodeNestedInputSchema).optional(),
  View: z.lazy(() => ViewUncheckedUpdateManyWithoutNodeNestedInputSchema).optional()
}).strict();

export const NodeUpsertWithoutParentChoicesInputSchema: z.ZodType<Prisma.NodeUpsertWithoutParentChoicesInput> = z.object({
  update: z.union([ z.lazy(() => NodeUpdateWithoutParentChoicesInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutParentChoicesInputSchema) ]),
  create: z.union([ z.lazy(() => NodeCreateWithoutParentChoicesInputSchema),z.lazy(() => NodeUncheckedCreateWithoutParentChoicesInputSchema) ]),
  where: z.lazy(() => NodeWhereInputSchema).optional()
}).strict();

export const NodeUpdateToOneWithWhereWithoutParentChoicesInputSchema: z.ZodType<Prisma.NodeUpdateToOneWithWhereWithoutParentChoicesInput> = z.object({
  where: z.lazy(() => NodeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => NodeUpdateWithoutParentChoicesInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutParentChoicesInputSchema) ]),
}).strict();

export const NodeUpdateWithoutParentChoicesInputSchema: z.ZodType<Prisma.NodeUpdateWithoutParentChoicesInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  storedViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  featured: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pictureURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pictureUnsafe: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => AccountUpdateOneWithoutOwnedNodesNestedInputSchema).optional(),
  childChoices: z.lazy(() => ChoiceUpdateManyWithoutFromNodeNestedInputSchema).optional(),
  View: z.lazy(() => ViewUpdateManyWithoutNodeNestedInputSchema).optional()
}).strict();

export const NodeUncheckedUpdateWithoutParentChoicesInputSchema: z.ZodType<Prisma.NodeUncheckedUpdateWithoutParentChoicesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  storedViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  featured: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pictureURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pictureUnsafe: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  childChoices: z.lazy(() => ChoiceUncheckedUpdateManyWithoutFromNodeNestedInputSchema).optional(),
  View: z.lazy(() => ViewUncheckedUpdateManyWithoutNodeNestedInputSchema).optional()
}).strict();

export const AccountUpsertWithoutSuggestedChoicesInputSchema: z.ZodType<Prisma.AccountUpsertWithoutSuggestedChoicesInput> = z.object({
  update: z.union([ z.lazy(() => AccountUpdateWithoutSuggestedChoicesInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutSuggestedChoicesInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutSuggestedChoicesInputSchema),z.lazy(() => AccountUncheckedCreateWithoutSuggestedChoicesInputSchema) ]),
  where: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const AccountUpdateToOneWithWhereWithoutSuggestedChoicesInputSchema: z.ZodType<Prisma.AccountUpdateToOneWithWhereWithoutSuggestedChoicesInput> = z.object({
  where: z.lazy(() => AccountWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AccountUpdateWithoutSuggestedChoicesInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutSuggestedChoicesInputSchema) ]),
}).strict();

export const AccountUpdateWithoutSuggestedChoicesInputSchema: z.ZodType<Prisma.AccountUpdateWithoutSuggestedChoicesInput> = z.object({
  screenName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  encryptedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isAdmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  profilePicURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profilePicUnsafe: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastIP: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalNodeViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalSuggestionScore: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ownedNodes: z.lazy(() => NodeUpdateManyWithoutOwnerNestedInputSchema).optional(),
  submittedFeedback: z.lazy(() => FeedbackUpdateManyWithoutSubmittedByNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutAccountNestedInputSchema).optional(),
  Reaction: z.lazy(() => ReactionUpdateManyWithoutAccountNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateWithoutSuggestedChoicesInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutSuggestedChoicesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  screenName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  encryptedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isAdmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  profilePicURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profilePicUnsafe: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastIP: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalNodeViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalSuggestionScore: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ownedNodes: z.lazy(() => NodeUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  submittedFeedback: z.lazy(() => FeedbackUncheckedUpdateManyWithoutSubmittedByNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutAccountNestedInputSchema).optional(),
  Reaction: z.lazy(() => ReactionUncheckedUpdateManyWithoutAccountNestedInputSchema).optional()
}).strict();

export const ReactionUpsertWithWhereUniqueWithoutChoiceInputSchema: z.ZodType<Prisma.ReactionUpsertWithWhereUniqueWithoutChoiceInput> = z.object({
  where: z.lazy(() => ReactionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReactionUpdateWithoutChoiceInputSchema),z.lazy(() => ReactionUncheckedUpdateWithoutChoiceInputSchema) ]),
  create: z.union([ z.lazy(() => ReactionCreateWithoutChoiceInputSchema),z.lazy(() => ReactionUncheckedCreateWithoutChoiceInputSchema) ]),
}).strict();

export const ReactionUpdateWithWhereUniqueWithoutChoiceInputSchema: z.ZodType<Prisma.ReactionUpdateWithWhereUniqueWithoutChoiceInput> = z.object({
  where: z.lazy(() => ReactionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReactionUpdateWithoutChoiceInputSchema),z.lazy(() => ReactionUncheckedUpdateWithoutChoiceInputSchema) ]),
}).strict();

export const ReactionUpdateManyWithWhereWithoutChoiceInputSchema: z.ZodType<Prisma.ReactionUpdateManyWithWhereWithoutChoiceInput> = z.object({
  where: z.lazy(() => ReactionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReactionUpdateManyMutationInputSchema),z.lazy(() => ReactionUncheckedUpdateManyWithoutChoiceInputSchema) ]),
}).strict();

export const AccountCreateWithoutSubmittedFeedbackInputSchema: z.ZodType<Prisma.AccountCreateWithoutSubmittedFeedbackInput> = z.object({
  screenName: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  encryptedPassword: z.string(),
  isAdmin: z.boolean().optional(),
  hidden: z.boolean().optional(),
  profilePicURL: z.string().optional().nullable(),
  profilePicUnsafe: z.boolean().optional(),
  bio: z.string().optional().nullable(),
  lastIP: z.string(),
  totalNodeViews: z.number().int(),
  totalSuggestionScore: z.number().int(),
  suggestedChoices: z.lazy(() => ChoiceCreateNestedManyWithoutSuggestedByInputSchema).optional(),
  ownedNodes: z.lazy(() => NodeCreateNestedManyWithoutOwnerInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutAccountInputSchema).optional(),
  Reaction: z.lazy(() => ReactionCreateNestedManyWithoutAccountInputSchema).optional()
}).strict();

export const AccountUncheckedCreateWithoutSubmittedFeedbackInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutSubmittedFeedbackInput> = z.object({
  id: z.number().int().optional(),
  screenName: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  encryptedPassword: z.string(),
  isAdmin: z.boolean().optional(),
  hidden: z.boolean().optional(),
  profilePicURL: z.string().optional().nullable(),
  profilePicUnsafe: z.boolean().optional(),
  bio: z.string().optional().nullable(),
  lastIP: z.string(),
  totalNodeViews: z.number().int(),
  totalSuggestionScore: z.number().int(),
  suggestedChoices: z.lazy(() => ChoiceUncheckedCreateNestedManyWithoutSuggestedByInputSchema).optional(),
  ownedNodes: z.lazy(() => NodeUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutAccountInputSchema).optional(),
  Reaction: z.lazy(() => ReactionUncheckedCreateNestedManyWithoutAccountInputSchema).optional()
}).strict();

export const AccountCreateOrConnectWithoutSubmittedFeedbackInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutSubmittedFeedbackInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutSubmittedFeedbackInputSchema),z.lazy(() => AccountUncheckedCreateWithoutSubmittedFeedbackInputSchema) ]),
}).strict();

export const AccountUpsertWithoutSubmittedFeedbackInputSchema: z.ZodType<Prisma.AccountUpsertWithoutSubmittedFeedbackInput> = z.object({
  update: z.union([ z.lazy(() => AccountUpdateWithoutSubmittedFeedbackInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutSubmittedFeedbackInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutSubmittedFeedbackInputSchema),z.lazy(() => AccountUncheckedCreateWithoutSubmittedFeedbackInputSchema) ]),
  where: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const AccountUpdateToOneWithWhereWithoutSubmittedFeedbackInputSchema: z.ZodType<Prisma.AccountUpdateToOneWithWhereWithoutSubmittedFeedbackInput> = z.object({
  where: z.lazy(() => AccountWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AccountUpdateWithoutSubmittedFeedbackInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutSubmittedFeedbackInputSchema) ]),
}).strict();

export const AccountUpdateWithoutSubmittedFeedbackInputSchema: z.ZodType<Prisma.AccountUpdateWithoutSubmittedFeedbackInput> = z.object({
  screenName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  encryptedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isAdmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  profilePicURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profilePicUnsafe: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastIP: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalNodeViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalSuggestionScore: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suggestedChoices: z.lazy(() => ChoiceUpdateManyWithoutSuggestedByNestedInputSchema).optional(),
  ownedNodes: z.lazy(() => NodeUpdateManyWithoutOwnerNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutAccountNestedInputSchema).optional(),
  Reaction: z.lazy(() => ReactionUpdateManyWithoutAccountNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateWithoutSubmittedFeedbackInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutSubmittedFeedbackInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  screenName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  encryptedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isAdmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  profilePicURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profilePicUnsafe: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastIP: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalNodeViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalSuggestionScore: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suggestedChoices: z.lazy(() => ChoiceUncheckedUpdateManyWithoutSuggestedByNestedInputSchema).optional(),
  ownedNodes: z.lazy(() => NodeUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutAccountNestedInputSchema).optional(),
  Reaction: z.lazy(() => ReactionUncheckedUpdateManyWithoutAccountNestedInputSchema).optional()
}).strict();

export const AccountCreateWithoutNotificationsInputSchema: z.ZodType<Prisma.AccountCreateWithoutNotificationsInput> = z.object({
  screenName: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  encryptedPassword: z.string(),
  isAdmin: z.boolean().optional(),
  hidden: z.boolean().optional(),
  profilePicURL: z.string().optional().nullable(),
  profilePicUnsafe: z.boolean().optional(),
  bio: z.string().optional().nullable(),
  lastIP: z.string(),
  totalNodeViews: z.number().int(),
  totalSuggestionScore: z.number().int(),
  suggestedChoices: z.lazy(() => ChoiceCreateNestedManyWithoutSuggestedByInputSchema).optional(),
  ownedNodes: z.lazy(() => NodeCreateNestedManyWithoutOwnerInputSchema).optional(),
  submittedFeedback: z.lazy(() => FeedbackCreateNestedManyWithoutSubmittedByInputSchema).optional(),
  Reaction: z.lazy(() => ReactionCreateNestedManyWithoutAccountInputSchema).optional()
}).strict();

export const AccountUncheckedCreateWithoutNotificationsInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutNotificationsInput> = z.object({
  id: z.number().int().optional(),
  screenName: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  encryptedPassword: z.string(),
  isAdmin: z.boolean().optional(),
  hidden: z.boolean().optional(),
  profilePicURL: z.string().optional().nullable(),
  profilePicUnsafe: z.boolean().optional(),
  bio: z.string().optional().nullable(),
  lastIP: z.string(),
  totalNodeViews: z.number().int(),
  totalSuggestionScore: z.number().int(),
  suggestedChoices: z.lazy(() => ChoiceUncheckedCreateNestedManyWithoutSuggestedByInputSchema).optional(),
  ownedNodes: z.lazy(() => NodeUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  submittedFeedback: z.lazy(() => FeedbackUncheckedCreateNestedManyWithoutSubmittedByInputSchema).optional(),
  Reaction: z.lazy(() => ReactionUncheckedCreateNestedManyWithoutAccountInputSchema).optional()
}).strict();

export const AccountCreateOrConnectWithoutNotificationsInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutNotificationsInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutNotificationsInputSchema),z.lazy(() => AccountUncheckedCreateWithoutNotificationsInputSchema) ]),
}).strict();

export const AccountUpsertWithoutNotificationsInputSchema: z.ZodType<Prisma.AccountUpsertWithoutNotificationsInput> = z.object({
  update: z.union([ z.lazy(() => AccountUpdateWithoutNotificationsInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutNotificationsInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutNotificationsInputSchema),z.lazy(() => AccountUncheckedCreateWithoutNotificationsInputSchema) ]),
  where: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const AccountUpdateToOneWithWhereWithoutNotificationsInputSchema: z.ZodType<Prisma.AccountUpdateToOneWithWhereWithoutNotificationsInput> = z.object({
  where: z.lazy(() => AccountWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AccountUpdateWithoutNotificationsInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutNotificationsInputSchema) ]),
}).strict();

export const AccountUpdateWithoutNotificationsInputSchema: z.ZodType<Prisma.AccountUpdateWithoutNotificationsInput> = z.object({
  screenName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  encryptedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isAdmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  profilePicURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profilePicUnsafe: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastIP: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalNodeViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalSuggestionScore: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suggestedChoices: z.lazy(() => ChoiceUpdateManyWithoutSuggestedByNestedInputSchema).optional(),
  ownedNodes: z.lazy(() => NodeUpdateManyWithoutOwnerNestedInputSchema).optional(),
  submittedFeedback: z.lazy(() => FeedbackUpdateManyWithoutSubmittedByNestedInputSchema).optional(),
  Reaction: z.lazy(() => ReactionUpdateManyWithoutAccountNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateWithoutNotificationsInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutNotificationsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  screenName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  encryptedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isAdmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  profilePicURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profilePicUnsafe: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastIP: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalNodeViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalSuggestionScore: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suggestedChoices: z.lazy(() => ChoiceUncheckedUpdateManyWithoutSuggestedByNestedInputSchema).optional(),
  ownedNodes: z.lazy(() => NodeUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  submittedFeedback: z.lazy(() => FeedbackUncheckedUpdateManyWithoutSubmittedByNestedInputSchema).optional(),
  Reaction: z.lazy(() => ReactionUncheckedUpdateManyWithoutAccountNestedInputSchema).optional()
}).strict();

export const AccountCreateWithoutReactionInputSchema: z.ZodType<Prisma.AccountCreateWithoutReactionInput> = z.object({
  screenName: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  encryptedPassword: z.string(),
  isAdmin: z.boolean().optional(),
  hidden: z.boolean().optional(),
  profilePicURL: z.string().optional().nullable(),
  profilePicUnsafe: z.boolean().optional(),
  bio: z.string().optional().nullable(),
  lastIP: z.string(),
  totalNodeViews: z.number().int(),
  totalSuggestionScore: z.number().int(),
  suggestedChoices: z.lazy(() => ChoiceCreateNestedManyWithoutSuggestedByInputSchema).optional(),
  ownedNodes: z.lazy(() => NodeCreateNestedManyWithoutOwnerInputSchema).optional(),
  submittedFeedback: z.lazy(() => FeedbackCreateNestedManyWithoutSubmittedByInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutAccountInputSchema).optional()
}).strict();

export const AccountUncheckedCreateWithoutReactionInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutReactionInput> = z.object({
  id: z.number().int().optional(),
  screenName: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  encryptedPassword: z.string(),
  isAdmin: z.boolean().optional(),
  hidden: z.boolean().optional(),
  profilePicURL: z.string().optional().nullable(),
  profilePicUnsafe: z.boolean().optional(),
  bio: z.string().optional().nullable(),
  lastIP: z.string(),
  totalNodeViews: z.number().int(),
  totalSuggestionScore: z.number().int(),
  suggestedChoices: z.lazy(() => ChoiceUncheckedCreateNestedManyWithoutSuggestedByInputSchema).optional(),
  ownedNodes: z.lazy(() => NodeUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  submittedFeedback: z.lazy(() => FeedbackUncheckedCreateNestedManyWithoutSubmittedByInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutAccountInputSchema).optional()
}).strict();

export const AccountCreateOrConnectWithoutReactionInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutReactionInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutReactionInputSchema),z.lazy(() => AccountUncheckedCreateWithoutReactionInputSchema) ]),
}).strict();

export const ChoiceCreateWithoutReactionsInputSchema: z.ZodType<Prisma.ChoiceCreateWithoutReactionsInput> = z.object({
  slug: z.string(),
  action: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  hidden: z.boolean().optional(),
  isCanon: z.boolean(),
  score: z.number().int(),
  fromNode: z.lazy(() => NodeCreateNestedOneWithoutChildChoicesInputSchema),
  toNode: z.lazy(() => NodeCreateNestedOneWithoutParentChoicesInputSchema).optional(),
  suggestedBy: z.lazy(() => AccountCreateNestedOneWithoutSuggestedChoicesInputSchema).optional()
}).strict();

export const ChoiceUncheckedCreateWithoutReactionsInputSchema: z.ZodType<Prisma.ChoiceUncheckedCreateWithoutReactionsInput> = z.object({
  id: z.number().int().optional(),
  slug: z.string(),
  action: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  hidden: z.boolean().optional(),
  isCanon: z.boolean(),
  score: z.number().int(),
  fromNodeId: z.number().int(),
  toNodeId: z.number().int().optional().nullable(),
  suggestedByAccountId: z.number().int().optional().nullable()
}).strict();

export const ChoiceCreateOrConnectWithoutReactionsInputSchema: z.ZodType<Prisma.ChoiceCreateOrConnectWithoutReactionsInput> = z.object({
  where: z.lazy(() => ChoiceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ChoiceCreateWithoutReactionsInputSchema),z.lazy(() => ChoiceUncheckedCreateWithoutReactionsInputSchema) ]),
}).strict();

export const AccountUpsertWithoutReactionInputSchema: z.ZodType<Prisma.AccountUpsertWithoutReactionInput> = z.object({
  update: z.union([ z.lazy(() => AccountUpdateWithoutReactionInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutReactionInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutReactionInputSchema),z.lazy(() => AccountUncheckedCreateWithoutReactionInputSchema) ]),
  where: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const AccountUpdateToOneWithWhereWithoutReactionInputSchema: z.ZodType<Prisma.AccountUpdateToOneWithWhereWithoutReactionInput> = z.object({
  where: z.lazy(() => AccountWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AccountUpdateWithoutReactionInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutReactionInputSchema) ]),
}).strict();

export const AccountUpdateWithoutReactionInputSchema: z.ZodType<Prisma.AccountUpdateWithoutReactionInput> = z.object({
  screenName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  encryptedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isAdmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  profilePicURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profilePicUnsafe: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastIP: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalNodeViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalSuggestionScore: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suggestedChoices: z.lazy(() => ChoiceUpdateManyWithoutSuggestedByNestedInputSchema).optional(),
  ownedNodes: z.lazy(() => NodeUpdateManyWithoutOwnerNestedInputSchema).optional(),
  submittedFeedback: z.lazy(() => FeedbackUpdateManyWithoutSubmittedByNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutAccountNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateWithoutReactionInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutReactionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  screenName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  encryptedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isAdmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  profilePicURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profilePicUnsafe: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastIP: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalNodeViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  totalSuggestionScore: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suggestedChoices: z.lazy(() => ChoiceUncheckedUpdateManyWithoutSuggestedByNestedInputSchema).optional(),
  ownedNodes: z.lazy(() => NodeUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  submittedFeedback: z.lazy(() => FeedbackUncheckedUpdateManyWithoutSubmittedByNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutAccountNestedInputSchema).optional()
}).strict();

export const ChoiceUpsertWithoutReactionsInputSchema: z.ZodType<Prisma.ChoiceUpsertWithoutReactionsInput> = z.object({
  update: z.union([ z.lazy(() => ChoiceUpdateWithoutReactionsInputSchema),z.lazy(() => ChoiceUncheckedUpdateWithoutReactionsInputSchema) ]),
  create: z.union([ z.lazy(() => ChoiceCreateWithoutReactionsInputSchema),z.lazy(() => ChoiceUncheckedCreateWithoutReactionsInputSchema) ]),
  where: z.lazy(() => ChoiceWhereInputSchema).optional()
}).strict();

export const ChoiceUpdateToOneWithWhereWithoutReactionsInputSchema: z.ZodType<Prisma.ChoiceUpdateToOneWithWhereWithoutReactionsInput> = z.object({
  where: z.lazy(() => ChoiceWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ChoiceUpdateWithoutReactionsInputSchema),z.lazy(() => ChoiceUncheckedUpdateWithoutReactionsInputSchema) ]),
}).strict();

export const ChoiceUpdateWithoutReactionsInputSchema: z.ZodType<Prisma.ChoiceUpdateWithoutReactionsInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isCanon: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fromNode: z.lazy(() => NodeUpdateOneRequiredWithoutChildChoicesNestedInputSchema).optional(),
  toNode: z.lazy(() => NodeUpdateOneWithoutParentChoicesNestedInputSchema).optional(),
  suggestedBy: z.lazy(() => AccountUpdateOneWithoutSuggestedChoicesNestedInputSchema).optional()
}).strict();

export const ChoiceUncheckedUpdateWithoutReactionsInputSchema: z.ZodType<Prisma.ChoiceUncheckedUpdateWithoutReactionsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isCanon: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fromNodeId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  toNodeId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  suggestedByAccountId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const NodeCreateWithoutViewInputSchema: z.ZodType<Prisma.NodeCreateWithoutViewInput> = z.object({
  slug: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  storedViews: z.number().int(),
  featured: z.boolean().optional(),
  pictureURL: z.string().optional().nullable(),
  pictureUnsafe: z.boolean().optional(),
  hidden: z.boolean().optional(),
  views: z.number().int(),
  owner: z.lazy(() => AccountCreateNestedOneWithoutOwnedNodesInputSchema).optional(),
  childChoices: z.lazy(() => ChoiceCreateNestedManyWithoutFromNodeInputSchema).optional(),
  parentChoices: z.lazy(() => ChoiceCreateNestedManyWithoutToNodeInputSchema).optional()
}).strict();

export const NodeUncheckedCreateWithoutViewInputSchema: z.ZodType<Prisma.NodeUncheckedCreateWithoutViewInput> = z.object({
  id: z.number().int().optional(),
  slug: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  storedViews: z.number().int(),
  featured: z.boolean().optional(),
  pictureURL: z.string().optional().nullable(),
  pictureUnsafe: z.boolean().optional(),
  hidden: z.boolean().optional(),
  views: z.number().int(),
  ownerId: z.number().int().optional().nullable(),
  childChoices: z.lazy(() => ChoiceUncheckedCreateNestedManyWithoutFromNodeInputSchema).optional(),
  parentChoices: z.lazy(() => ChoiceUncheckedCreateNestedManyWithoutToNodeInputSchema).optional()
}).strict();

export const NodeCreateOrConnectWithoutViewInputSchema: z.ZodType<Prisma.NodeCreateOrConnectWithoutViewInput> = z.object({
  where: z.lazy(() => NodeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NodeCreateWithoutViewInputSchema),z.lazy(() => NodeUncheckedCreateWithoutViewInputSchema) ]),
}).strict();

export const NodeUpsertWithoutViewInputSchema: z.ZodType<Prisma.NodeUpsertWithoutViewInput> = z.object({
  update: z.union([ z.lazy(() => NodeUpdateWithoutViewInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutViewInputSchema) ]),
  create: z.union([ z.lazy(() => NodeCreateWithoutViewInputSchema),z.lazy(() => NodeUncheckedCreateWithoutViewInputSchema) ]),
  where: z.lazy(() => NodeWhereInputSchema).optional()
}).strict();

export const NodeUpdateToOneWithWhereWithoutViewInputSchema: z.ZodType<Prisma.NodeUpdateToOneWithWhereWithoutViewInput> = z.object({
  where: z.lazy(() => NodeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => NodeUpdateWithoutViewInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutViewInputSchema) ]),
}).strict();

export const NodeUpdateWithoutViewInputSchema: z.ZodType<Prisma.NodeUpdateWithoutViewInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  storedViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  featured: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pictureURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pictureUnsafe: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => AccountUpdateOneWithoutOwnedNodesNestedInputSchema).optional(),
  childChoices: z.lazy(() => ChoiceUpdateManyWithoutFromNodeNestedInputSchema).optional(),
  parentChoices: z.lazy(() => ChoiceUpdateManyWithoutToNodeNestedInputSchema).optional()
}).strict();

export const NodeUncheckedUpdateWithoutViewInputSchema: z.ZodType<Prisma.NodeUncheckedUpdateWithoutViewInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  storedViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  featured: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pictureURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pictureUnsafe: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  childChoices: z.lazy(() => ChoiceUncheckedUpdateManyWithoutFromNodeNestedInputSchema).optional(),
  parentChoices: z.lazy(() => ChoiceUncheckedUpdateManyWithoutToNodeNestedInputSchema).optional()
}).strict();

export const ChoiceCreateManySuggestedByInputSchema: z.ZodType<Prisma.ChoiceCreateManySuggestedByInput> = z.object({
  id: z.number().int().optional(),
  slug: z.string(),
  action: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  hidden: z.boolean().optional(),
  isCanon: z.boolean(),
  score: z.number().int(),
  fromNodeId: z.number().int(),
  toNodeId: z.number().int().optional().nullable()
}).strict();

export const NodeCreateManyOwnerInputSchema: z.ZodType<Prisma.NodeCreateManyOwnerInput> = z.object({
  id: z.number().int().optional(),
  slug: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  storedViews: z.number().int(),
  featured: z.boolean().optional(),
  pictureURL: z.string().optional().nullable(),
  pictureUnsafe: z.boolean().optional(),
  hidden: z.boolean().optional(),
  views: z.number().int()
}).strict();

export const FeedbackCreateManySubmittedByInputSchema: z.ZodType<Prisma.FeedbackCreateManySubmittedByInput> = z.object({
  id: z.number().int().optional(),
  IP: z.string(),
  reportingType: z.string().optional().nullable(),
  reportingId: z.number().int().optional().nullable(),
  info: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const NotificationCreateManyAccountInputSchema: z.ZodType<Prisma.NotificationCreateManyAccountInput> = z.object({
  id: z.number().int().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  link: z.string().optional().nullable(),
  seen: z.boolean().optional()
}).strict();

export const ReactionCreateManyAccountInputSchema: z.ZodType<Prisma.ReactionCreateManyAccountInput> = z.object({
  id: z.number().int().optional(),
  like: z.boolean(),
  choiceId: z.number().int()
}).strict();

export const ChoiceUpdateWithoutSuggestedByInputSchema: z.ZodType<Prisma.ChoiceUpdateWithoutSuggestedByInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isCanon: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fromNode: z.lazy(() => NodeUpdateOneRequiredWithoutChildChoicesNestedInputSchema).optional(),
  toNode: z.lazy(() => NodeUpdateOneWithoutParentChoicesNestedInputSchema).optional(),
  reactions: z.lazy(() => ReactionUpdateManyWithoutChoiceNestedInputSchema).optional()
}).strict();

export const ChoiceUncheckedUpdateWithoutSuggestedByInputSchema: z.ZodType<Prisma.ChoiceUncheckedUpdateWithoutSuggestedByInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isCanon: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fromNodeId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  toNodeId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reactions: z.lazy(() => ReactionUncheckedUpdateManyWithoutChoiceNestedInputSchema).optional()
}).strict();

export const ChoiceUncheckedUpdateManyWithoutSuggestedByInputSchema: z.ZodType<Prisma.ChoiceUncheckedUpdateManyWithoutSuggestedByInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isCanon: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fromNodeId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  toNodeId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const NodeUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.NodeUpdateWithoutOwnerInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  storedViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  featured: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pictureURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pictureUnsafe: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  childChoices: z.lazy(() => ChoiceUpdateManyWithoutFromNodeNestedInputSchema).optional(),
  parentChoices: z.lazy(() => ChoiceUpdateManyWithoutToNodeNestedInputSchema).optional(),
  View: z.lazy(() => ViewUpdateManyWithoutNodeNestedInputSchema).optional()
}).strict();

export const NodeUncheckedUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.NodeUncheckedUpdateWithoutOwnerInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  storedViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  featured: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pictureURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pictureUnsafe: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  childChoices: z.lazy(() => ChoiceUncheckedUpdateManyWithoutFromNodeNestedInputSchema).optional(),
  parentChoices: z.lazy(() => ChoiceUncheckedUpdateManyWithoutToNodeNestedInputSchema).optional(),
  View: z.lazy(() => ViewUncheckedUpdateManyWithoutNodeNestedInputSchema).optional()
}).strict();

export const NodeUncheckedUpdateManyWithoutOwnerInputSchema: z.ZodType<Prisma.NodeUncheckedUpdateManyWithoutOwnerInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  storedViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  featured: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pictureURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pictureUnsafe: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackUpdateWithoutSubmittedByInputSchema: z.ZodType<Prisma.FeedbackUpdateWithoutSubmittedByInput> = z.object({
  IP: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportingType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reportingId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  info: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackUncheckedUpdateWithoutSubmittedByInputSchema: z.ZodType<Prisma.FeedbackUncheckedUpdateWithoutSubmittedByInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  IP: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportingType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reportingId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  info: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FeedbackUncheckedUpdateManyWithoutSubmittedByInputSchema: z.ZodType<Prisma.FeedbackUncheckedUpdateManyWithoutSubmittedByInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  IP: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportingType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reportingId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  info: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NotificationUpdateWithoutAccountInputSchema: z.ZodType<Prisma.NotificationUpdateWithoutAccountInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NotificationUncheckedUpdateWithoutAccountInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateWithoutAccountInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NotificationUncheckedUpdateManyWithoutAccountInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateManyWithoutAccountInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReactionUpdateWithoutAccountInputSchema: z.ZodType<Prisma.ReactionUpdateWithoutAccountInput> = z.object({
  like: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  choice: z.lazy(() => ChoiceUpdateOneRequiredWithoutReactionsNestedInputSchema).optional()
}).strict();

export const ReactionUncheckedUpdateWithoutAccountInputSchema: z.ZodType<Prisma.ReactionUncheckedUpdateWithoutAccountInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  like: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  choiceId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReactionUncheckedUpdateManyWithoutAccountInputSchema: z.ZodType<Prisma.ReactionUncheckedUpdateManyWithoutAccountInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  like: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  choiceId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChoiceCreateManyFromNodeInputSchema: z.ZodType<Prisma.ChoiceCreateManyFromNodeInput> = z.object({
  id: z.number().int().optional(),
  slug: z.string(),
  action: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  hidden: z.boolean().optional(),
  isCanon: z.boolean(),
  score: z.number().int(),
  toNodeId: z.number().int().optional().nullable(),
  suggestedByAccountId: z.number().int().optional().nullable()
}).strict();

export const ChoiceCreateManyToNodeInputSchema: z.ZodType<Prisma.ChoiceCreateManyToNodeInput> = z.object({
  id: z.number().int().optional(),
  slug: z.string(),
  action: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  hidden: z.boolean().optional(),
  isCanon: z.boolean(),
  score: z.number().int(),
  fromNodeId: z.number().int(),
  suggestedByAccountId: z.number().int().optional().nullable()
}).strict();

export const ViewCreateManyNodeInputSchema: z.ZodType<Prisma.ViewCreateManyNodeInput> = z.object({
  id: z.number().int().optional(),
  IP: z.string()
}).strict();

export const ChoiceUpdateWithoutFromNodeInputSchema: z.ZodType<Prisma.ChoiceUpdateWithoutFromNodeInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isCanon: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  toNode: z.lazy(() => NodeUpdateOneWithoutParentChoicesNestedInputSchema).optional(),
  suggestedBy: z.lazy(() => AccountUpdateOneWithoutSuggestedChoicesNestedInputSchema).optional(),
  reactions: z.lazy(() => ReactionUpdateManyWithoutChoiceNestedInputSchema).optional()
}).strict();

export const ChoiceUncheckedUpdateWithoutFromNodeInputSchema: z.ZodType<Prisma.ChoiceUncheckedUpdateWithoutFromNodeInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isCanon: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  toNodeId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  suggestedByAccountId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reactions: z.lazy(() => ReactionUncheckedUpdateManyWithoutChoiceNestedInputSchema).optional()
}).strict();

export const ChoiceUncheckedUpdateManyWithoutFromNodeInputSchema: z.ZodType<Prisma.ChoiceUncheckedUpdateManyWithoutFromNodeInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isCanon: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  toNodeId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  suggestedByAccountId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ChoiceUpdateWithoutToNodeInputSchema: z.ZodType<Prisma.ChoiceUpdateWithoutToNodeInput> = z.object({
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isCanon: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fromNode: z.lazy(() => NodeUpdateOneRequiredWithoutChildChoicesNestedInputSchema).optional(),
  suggestedBy: z.lazy(() => AccountUpdateOneWithoutSuggestedChoicesNestedInputSchema).optional(),
  reactions: z.lazy(() => ReactionUpdateManyWithoutChoiceNestedInputSchema).optional()
}).strict();

export const ChoiceUncheckedUpdateWithoutToNodeInputSchema: z.ZodType<Prisma.ChoiceUncheckedUpdateWithoutToNodeInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isCanon: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fromNodeId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suggestedByAccountId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reactions: z.lazy(() => ReactionUncheckedUpdateManyWithoutChoiceNestedInputSchema).optional()
}).strict();

export const ChoiceUncheckedUpdateManyWithoutToNodeInputSchema: z.ZodType<Prisma.ChoiceUncheckedUpdateManyWithoutToNodeInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isCanon: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fromNodeId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suggestedByAccountId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ViewUpdateWithoutNodeInputSchema: z.ZodType<Prisma.ViewUpdateWithoutNodeInput> = z.object({
  IP: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ViewUncheckedUpdateWithoutNodeInputSchema: z.ZodType<Prisma.ViewUncheckedUpdateWithoutNodeInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  IP: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ViewUncheckedUpdateManyWithoutNodeInputSchema: z.ZodType<Prisma.ViewUncheckedUpdateManyWithoutNodeInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  IP: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReactionCreateManyChoiceInputSchema: z.ZodType<Prisma.ReactionCreateManyChoiceInput> = z.object({
  id: z.number().int().optional(),
  like: z.boolean(),
  accountId: z.number().int()
}).strict();

export const ReactionUpdateWithoutChoiceInputSchema: z.ZodType<Prisma.ReactionUpdateWithoutChoiceInput> = z.object({
  like: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  account: z.lazy(() => AccountUpdateOneRequiredWithoutReactionNestedInputSchema).optional()
}).strict();

export const ReactionUncheckedUpdateWithoutChoiceInputSchema: z.ZodType<Prisma.ReactionUncheckedUpdateWithoutChoiceInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  like: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReactionUncheckedUpdateManyWithoutChoiceInputSchema: z.ZodType<Prisma.ReactionUncheckedUpdateManyWithoutChoiceInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  like: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const NodeFindFirstArgsSchema: z.ZodType<Prisma.NodeFindFirstArgs> = z.object({
  select: NodeSelectSchema.optional(),
  include: NodeIncludeSchema.optional(),
  where: NodeWhereInputSchema.optional(),
  orderBy: z.union([ NodeOrderByWithRelationInputSchema.array(),NodeOrderByWithRelationInputSchema ]).optional(),
  cursor: NodeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NodeScalarFieldEnumSchema,NodeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NodeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.NodeFindFirstOrThrowArgs> = z.object({
  select: NodeSelectSchema.optional(),
  include: NodeIncludeSchema.optional(),
  where: NodeWhereInputSchema.optional(),
  orderBy: z.union([ NodeOrderByWithRelationInputSchema.array(),NodeOrderByWithRelationInputSchema ]).optional(),
  cursor: NodeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NodeScalarFieldEnumSchema,NodeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NodeFindManyArgsSchema: z.ZodType<Prisma.NodeFindManyArgs> = z.object({
  select: NodeSelectSchema.optional(),
  include: NodeIncludeSchema.optional(),
  where: NodeWhereInputSchema.optional(),
  orderBy: z.union([ NodeOrderByWithRelationInputSchema.array(),NodeOrderByWithRelationInputSchema ]).optional(),
  cursor: NodeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NodeScalarFieldEnumSchema,NodeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NodeAggregateArgsSchema: z.ZodType<Prisma.NodeAggregateArgs> = z.object({
  where: NodeWhereInputSchema.optional(),
  orderBy: z.union([ NodeOrderByWithRelationInputSchema.array(),NodeOrderByWithRelationInputSchema ]).optional(),
  cursor: NodeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const NodeGroupByArgsSchema: z.ZodType<Prisma.NodeGroupByArgs> = z.object({
  where: NodeWhereInputSchema.optional(),
  orderBy: z.union([ NodeOrderByWithAggregationInputSchema.array(),NodeOrderByWithAggregationInputSchema ]).optional(),
  by: NodeScalarFieldEnumSchema.array(),
  having: NodeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const NodeFindUniqueArgsSchema: z.ZodType<Prisma.NodeFindUniqueArgs> = z.object({
  select: NodeSelectSchema.optional(),
  include: NodeIncludeSchema.optional(),
  where: NodeWhereUniqueInputSchema,
}).strict() ;

export const NodeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.NodeFindUniqueOrThrowArgs> = z.object({
  select: NodeSelectSchema.optional(),
  include: NodeIncludeSchema.optional(),
  where: NodeWhereUniqueInputSchema,
}).strict() ;

export const ChoiceFindFirstArgsSchema: z.ZodType<Prisma.ChoiceFindFirstArgs> = z.object({
  select: ChoiceSelectSchema.optional(),
  include: ChoiceIncludeSchema.optional(),
  where: ChoiceWhereInputSchema.optional(),
  orderBy: z.union([ ChoiceOrderByWithRelationInputSchema.array(),ChoiceOrderByWithRelationInputSchema ]).optional(),
  cursor: ChoiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ChoiceScalarFieldEnumSchema,ChoiceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ChoiceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ChoiceFindFirstOrThrowArgs> = z.object({
  select: ChoiceSelectSchema.optional(),
  include: ChoiceIncludeSchema.optional(),
  where: ChoiceWhereInputSchema.optional(),
  orderBy: z.union([ ChoiceOrderByWithRelationInputSchema.array(),ChoiceOrderByWithRelationInputSchema ]).optional(),
  cursor: ChoiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ChoiceScalarFieldEnumSchema,ChoiceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ChoiceFindManyArgsSchema: z.ZodType<Prisma.ChoiceFindManyArgs> = z.object({
  select: ChoiceSelectSchema.optional(),
  include: ChoiceIncludeSchema.optional(),
  where: ChoiceWhereInputSchema.optional(),
  orderBy: z.union([ ChoiceOrderByWithRelationInputSchema.array(),ChoiceOrderByWithRelationInputSchema ]).optional(),
  cursor: ChoiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ChoiceScalarFieldEnumSchema,ChoiceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ChoiceAggregateArgsSchema: z.ZodType<Prisma.ChoiceAggregateArgs> = z.object({
  where: ChoiceWhereInputSchema.optional(),
  orderBy: z.union([ ChoiceOrderByWithRelationInputSchema.array(),ChoiceOrderByWithRelationInputSchema ]).optional(),
  cursor: ChoiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ChoiceGroupByArgsSchema: z.ZodType<Prisma.ChoiceGroupByArgs> = z.object({
  where: ChoiceWhereInputSchema.optional(),
  orderBy: z.union([ ChoiceOrderByWithAggregationInputSchema.array(),ChoiceOrderByWithAggregationInputSchema ]).optional(),
  by: ChoiceScalarFieldEnumSchema.array(),
  having: ChoiceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ChoiceFindUniqueArgsSchema: z.ZodType<Prisma.ChoiceFindUniqueArgs> = z.object({
  select: ChoiceSelectSchema.optional(),
  include: ChoiceIncludeSchema.optional(),
  where: ChoiceWhereUniqueInputSchema,
}).strict() ;

export const ChoiceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ChoiceFindUniqueOrThrowArgs> = z.object({
  select: ChoiceSelectSchema.optional(),
  include: ChoiceIncludeSchema.optional(),
  where: ChoiceWhereUniqueInputSchema,
}).strict() ;

export const FeedbackFindFirstArgsSchema: z.ZodType<Prisma.FeedbackFindFirstArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  where: FeedbackWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackOrderByWithRelationInputSchema.array(),FeedbackOrderByWithRelationInputSchema ]).optional(),
  cursor: FeedbackWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FeedbackScalarFieldEnumSchema,FeedbackScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FeedbackFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FeedbackFindFirstOrThrowArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  where: FeedbackWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackOrderByWithRelationInputSchema.array(),FeedbackOrderByWithRelationInputSchema ]).optional(),
  cursor: FeedbackWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FeedbackScalarFieldEnumSchema,FeedbackScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FeedbackFindManyArgsSchema: z.ZodType<Prisma.FeedbackFindManyArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  where: FeedbackWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackOrderByWithRelationInputSchema.array(),FeedbackOrderByWithRelationInputSchema ]).optional(),
  cursor: FeedbackWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FeedbackScalarFieldEnumSchema,FeedbackScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FeedbackAggregateArgsSchema: z.ZodType<Prisma.FeedbackAggregateArgs> = z.object({
  where: FeedbackWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackOrderByWithRelationInputSchema.array(),FeedbackOrderByWithRelationInputSchema ]).optional(),
  cursor: FeedbackWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FeedbackGroupByArgsSchema: z.ZodType<Prisma.FeedbackGroupByArgs> = z.object({
  where: FeedbackWhereInputSchema.optional(),
  orderBy: z.union([ FeedbackOrderByWithAggregationInputSchema.array(),FeedbackOrderByWithAggregationInputSchema ]).optional(),
  by: FeedbackScalarFieldEnumSchema.array(),
  having: FeedbackScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FeedbackFindUniqueArgsSchema: z.ZodType<Prisma.FeedbackFindUniqueArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  where: FeedbackWhereUniqueInputSchema,
}).strict() ;

export const FeedbackFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FeedbackFindUniqueOrThrowArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  where: FeedbackWhereUniqueInputSchema,
}).strict() ;

export const NotificationFindFirstArgsSchema: z.ZodType<Prisma.NotificationFindFirstArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereInputSchema.optional(),
  orderBy: z.union([ NotificationOrderByWithRelationInputSchema.array(),NotificationOrderByWithRelationInputSchema ]).optional(),
  cursor: NotificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NotificationScalarFieldEnumSchema,NotificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NotificationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.NotificationFindFirstOrThrowArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereInputSchema.optional(),
  orderBy: z.union([ NotificationOrderByWithRelationInputSchema.array(),NotificationOrderByWithRelationInputSchema ]).optional(),
  cursor: NotificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NotificationScalarFieldEnumSchema,NotificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NotificationFindManyArgsSchema: z.ZodType<Prisma.NotificationFindManyArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereInputSchema.optional(),
  orderBy: z.union([ NotificationOrderByWithRelationInputSchema.array(),NotificationOrderByWithRelationInputSchema ]).optional(),
  cursor: NotificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NotificationScalarFieldEnumSchema,NotificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NotificationAggregateArgsSchema: z.ZodType<Prisma.NotificationAggregateArgs> = z.object({
  where: NotificationWhereInputSchema.optional(),
  orderBy: z.union([ NotificationOrderByWithRelationInputSchema.array(),NotificationOrderByWithRelationInputSchema ]).optional(),
  cursor: NotificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const NotificationGroupByArgsSchema: z.ZodType<Prisma.NotificationGroupByArgs> = z.object({
  where: NotificationWhereInputSchema.optional(),
  orderBy: z.union([ NotificationOrderByWithAggregationInputSchema.array(),NotificationOrderByWithAggregationInputSchema ]).optional(),
  by: NotificationScalarFieldEnumSchema.array(),
  having: NotificationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const NotificationFindUniqueArgsSchema: z.ZodType<Prisma.NotificationFindUniqueArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereUniqueInputSchema,
}).strict() ;

export const NotificationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.NotificationFindUniqueOrThrowArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereUniqueInputSchema,
}).strict() ;

export const ReactionFindFirstArgsSchema: z.ZodType<Prisma.ReactionFindFirstArgs> = z.object({
  select: ReactionSelectSchema.optional(),
  include: ReactionIncludeSchema.optional(),
  where: ReactionWhereInputSchema.optional(),
  orderBy: z.union([ ReactionOrderByWithRelationInputSchema.array(),ReactionOrderByWithRelationInputSchema ]).optional(),
  cursor: ReactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReactionScalarFieldEnumSchema,ReactionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReactionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ReactionFindFirstOrThrowArgs> = z.object({
  select: ReactionSelectSchema.optional(),
  include: ReactionIncludeSchema.optional(),
  where: ReactionWhereInputSchema.optional(),
  orderBy: z.union([ ReactionOrderByWithRelationInputSchema.array(),ReactionOrderByWithRelationInputSchema ]).optional(),
  cursor: ReactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReactionScalarFieldEnumSchema,ReactionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReactionFindManyArgsSchema: z.ZodType<Prisma.ReactionFindManyArgs> = z.object({
  select: ReactionSelectSchema.optional(),
  include: ReactionIncludeSchema.optional(),
  where: ReactionWhereInputSchema.optional(),
  orderBy: z.union([ ReactionOrderByWithRelationInputSchema.array(),ReactionOrderByWithRelationInputSchema ]).optional(),
  cursor: ReactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReactionScalarFieldEnumSchema,ReactionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReactionAggregateArgsSchema: z.ZodType<Prisma.ReactionAggregateArgs> = z.object({
  where: ReactionWhereInputSchema.optional(),
  orderBy: z.union([ ReactionOrderByWithRelationInputSchema.array(),ReactionOrderByWithRelationInputSchema ]).optional(),
  cursor: ReactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReactionGroupByArgsSchema: z.ZodType<Prisma.ReactionGroupByArgs> = z.object({
  where: ReactionWhereInputSchema.optional(),
  orderBy: z.union([ ReactionOrderByWithAggregationInputSchema.array(),ReactionOrderByWithAggregationInputSchema ]).optional(),
  by: ReactionScalarFieldEnumSchema.array(),
  having: ReactionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReactionFindUniqueArgsSchema: z.ZodType<Prisma.ReactionFindUniqueArgs> = z.object({
  select: ReactionSelectSchema.optional(),
  include: ReactionIncludeSchema.optional(),
  where: ReactionWhereUniqueInputSchema,
}).strict() ;

export const ReactionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ReactionFindUniqueOrThrowArgs> = z.object({
  select: ReactionSelectSchema.optional(),
  include: ReactionIncludeSchema.optional(),
  where: ReactionWhereUniqueInputSchema,
}).strict() ;

export const ViewFindFirstArgsSchema: z.ZodType<Prisma.ViewFindFirstArgs> = z.object({
  select: ViewSelectSchema.optional(),
  include: ViewIncludeSchema.optional(),
  where: ViewWhereInputSchema.optional(),
  orderBy: z.union([ ViewOrderByWithRelationInputSchema.array(),ViewOrderByWithRelationInputSchema ]).optional(),
  cursor: ViewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ViewScalarFieldEnumSchema,ViewScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ViewFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ViewFindFirstOrThrowArgs> = z.object({
  select: ViewSelectSchema.optional(),
  include: ViewIncludeSchema.optional(),
  where: ViewWhereInputSchema.optional(),
  orderBy: z.union([ ViewOrderByWithRelationInputSchema.array(),ViewOrderByWithRelationInputSchema ]).optional(),
  cursor: ViewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ViewScalarFieldEnumSchema,ViewScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ViewFindManyArgsSchema: z.ZodType<Prisma.ViewFindManyArgs> = z.object({
  select: ViewSelectSchema.optional(),
  include: ViewIncludeSchema.optional(),
  where: ViewWhereInputSchema.optional(),
  orderBy: z.union([ ViewOrderByWithRelationInputSchema.array(),ViewOrderByWithRelationInputSchema ]).optional(),
  cursor: ViewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ViewScalarFieldEnumSchema,ViewScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ViewAggregateArgsSchema: z.ZodType<Prisma.ViewAggregateArgs> = z.object({
  where: ViewWhereInputSchema.optional(),
  orderBy: z.union([ ViewOrderByWithRelationInputSchema.array(),ViewOrderByWithRelationInputSchema ]).optional(),
  cursor: ViewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ViewGroupByArgsSchema: z.ZodType<Prisma.ViewGroupByArgs> = z.object({
  where: ViewWhereInputSchema.optional(),
  orderBy: z.union([ ViewOrderByWithAggregationInputSchema.array(),ViewOrderByWithAggregationInputSchema ]).optional(),
  by: ViewScalarFieldEnumSchema.array(),
  having: ViewScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ViewFindUniqueArgsSchema: z.ZodType<Prisma.ViewFindUniqueArgs> = z.object({
  select: ViewSelectSchema.optional(),
  include: ViewIncludeSchema.optional(),
  where: ViewWhereUniqueInputSchema,
}).strict() ;

export const ViewFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ViewFindUniqueOrThrowArgs> = z.object({
  select: ViewSelectSchema.optional(),
  include: ViewIncludeSchema.optional(),
  where: ViewWhereUniqueInputSchema,
}).strict() ;

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict() ;

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict() ;

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
}).strict() ;

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
}).strict() ;

export const NodeCreateArgsSchema: z.ZodType<Prisma.NodeCreateArgs> = z.object({
  select: NodeSelectSchema.optional(),
  include: NodeIncludeSchema.optional(),
  data: z.union([ NodeCreateInputSchema,NodeUncheckedCreateInputSchema ]),
}).strict() ;

export const NodeUpsertArgsSchema: z.ZodType<Prisma.NodeUpsertArgs> = z.object({
  select: NodeSelectSchema.optional(),
  include: NodeIncludeSchema.optional(),
  where: NodeWhereUniqueInputSchema,
  create: z.union([ NodeCreateInputSchema,NodeUncheckedCreateInputSchema ]),
  update: z.union([ NodeUpdateInputSchema,NodeUncheckedUpdateInputSchema ]),
}).strict() ;

export const NodeCreateManyArgsSchema: z.ZodType<Prisma.NodeCreateManyArgs> = z.object({
  data: z.union([ NodeCreateManyInputSchema,NodeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const NodeDeleteArgsSchema: z.ZodType<Prisma.NodeDeleteArgs> = z.object({
  select: NodeSelectSchema.optional(),
  include: NodeIncludeSchema.optional(),
  where: NodeWhereUniqueInputSchema,
}).strict() ;

export const NodeUpdateArgsSchema: z.ZodType<Prisma.NodeUpdateArgs> = z.object({
  select: NodeSelectSchema.optional(),
  include: NodeIncludeSchema.optional(),
  data: z.union([ NodeUpdateInputSchema,NodeUncheckedUpdateInputSchema ]),
  where: NodeWhereUniqueInputSchema,
}).strict() ;

export const NodeUpdateManyArgsSchema: z.ZodType<Prisma.NodeUpdateManyArgs> = z.object({
  data: z.union([ NodeUpdateManyMutationInputSchema,NodeUncheckedUpdateManyInputSchema ]),
  where: NodeWhereInputSchema.optional(),
}).strict() ;

export const NodeDeleteManyArgsSchema: z.ZodType<Prisma.NodeDeleteManyArgs> = z.object({
  where: NodeWhereInputSchema.optional(),
}).strict() ;

export const ChoiceCreateArgsSchema: z.ZodType<Prisma.ChoiceCreateArgs> = z.object({
  select: ChoiceSelectSchema.optional(),
  include: ChoiceIncludeSchema.optional(),
  data: z.union([ ChoiceCreateInputSchema,ChoiceUncheckedCreateInputSchema ]),
}).strict() ;

export const ChoiceUpsertArgsSchema: z.ZodType<Prisma.ChoiceUpsertArgs> = z.object({
  select: ChoiceSelectSchema.optional(),
  include: ChoiceIncludeSchema.optional(),
  where: ChoiceWhereUniqueInputSchema,
  create: z.union([ ChoiceCreateInputSchema,ChoiceUncheckedCreateInputSchema ]),
  update: z.union([ ChoiceUpdateInputSchema,ChoiceUncheckedUpdateInputSchema ]),
}).strict() ;

export const ChoiceCreateManyArgsSchema: z.ZodType<Prisma.ChoiceCreateManyArgs> = z.object({
  data: z.union([ ChoiceCreateManyInputSchema,ChoiceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ChoiceDeleteArgsSchema: z.ZodType<Prisma.ChoiceDeleteArgs> = z.object({
  select: ChoiceSelectSchema.optional(),
  include: ChoiceIncludeSchema.optional(),
  where: ChoiceWhereUniqueInputSchema,
}).strict() ;

export const ChoiceUpdateArgsSchema: z.ZodType<Prisma.ChoiceUpdateArgs> = z.object({
  select: ChoiceSelectSchema.optional(),
  include: ChoiceIncludeSchema.optional(),
  data: z.union([ ChoiceUpdateInputSchema,ChoiceUncheckedUpdateInputSchema ]),
  where: ChoiceWhereUniqueInputSchema,
}).strict() ;

export const ChoiceUpdateManyArgsSchema: z.ZodType<Prisma.ChoiceUpdateManyArgs> = z.object({
  data: z.union([ ChoiceUpdateManyMutationInputSchema,ChoiceUncheckedUpdateManyInputSchema ]),
  where: ChoiceWhereInputSchema.optional(),
}).strict() ;

export const ChoiceDeleteManyArgsSchema: z.ZodType<Prisma.ChoiceDeleteManyArgs> = z.object({
  where: ChoiceWhereInputSchema.optional(),
}).strict() ;

export const FeedbackCreateArgsSchema: z.ZodType<Prisma.FeedbackCreateArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  data: z.union([ FeedbackCreateInputSchema,FeedbackUncheckedCreateInputSchema ]),
}).strict() ;

export const FeedbackUpsertArgsSchema: z.ZodType<Prisma.FeedbackUpsertArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  where: FeedbackWhereUniqueInputSchema,
  create: z.union([ FeedbackCreateInputSchema,FeedbackUncheckedCreateInputSchema ]),
  update: z.union([ FeedbackUpdateInputSchema,FeedbackUncheckedUpdateInputSchema ]),
}).strict() ;

export const FeedbackCreateManyArgsSchema: z.ZodType<Prisma.FeedbackCreateManyArgs> = z.object({
  data: z.union([ FeedbackCreateManyInputSchema,FeedbackCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FeedbackDeleteArgsSchema: z.ZodType<Prisma.FeedbackDeleteArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  where: FeedbackWhereUniqueInputSchema,
}).strict() ;

export const FeedbackUpdateArgsSchema: z.ZodType<Prisma.FeedbackUpdateArgs> = z.object({
  select: FeedbackSelectSchema.optional(),
  include: FeedbackIncludeSchema.optional(),
  data: z.union([ FeedbackUpdateInputSchema,FeedbackUncheckedUpdateInputSchema ]),
  where: FeedbackWhereUniqueInputSchema,
}).strict() ;

export const FeedbackUpdateManyArgsSchema: z.ZodType<Prisma.FeedbackUpdateManyArgs> = z.object({
  data: z.union([ FeedbackUpdateManyMutationInputSchema,FeedbackUncheckedUpdateManyInputSchema ]),
  where: FeedbackWhereInputSchema.optional(),
}).strict() ;

export const FeedbackDeleteManyArgsSchema: z.ZodType<Prisma.FeedbackDeleteManyArgs> = z.object({
  where: FeedbackWhereInputSchema.optional(),
}).strict() ;

export const NotificationCreateArgsSchema: z.ZodType<Prisma.NotificationCreateArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  data: z.union([ NotificationCreateInputSchema,NotificationUncheckedCreateInputSchema ]),
}).strict() ;

export const NotificationUpsertArgsSchema: z.ZodType<Prisma.NotificationUpsertArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereUniqueInputSchema,
  create: z.union([ NotificationCreateInputSchema,NotificationUncheckedCreateInputSchema ]),
  update: z.union([ NotificationUpdateInputSchema,NotificationUncheckedUpdateInputSchema ]),
}).strict() ;

export const NotificationCreateManyArgsSchema: z.ZodType<Prisma.NotificationCreateManyArgs> = z.object({
  data: z.union([ NotificationCreateManyInputSchema,NotificationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const NotificationDeleteArgsSchema: z.ZodType<Prisma.NotificationDeleteArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereUniqueInputSchema,
}).strict() ;

export const NotificationUpdateArgsSchema: z.ZodType<Prisma.NotificationUpdateArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  data: z.union([ NotificationUpdateInputSchema,NotificationUncheckedUpdateInputSchema ]),
  where: NotificationWhereUniqueInputSchema,
}).strict() ;

export const NotificationUpdateManyArgsSchema: z.ZodType<Prisma.NotificationUpdateManyArgs> = z.object({
  data: z.union([ NotificationUpdateManyMutationInputSchema,NotificationUncheckedUpdateManyInputSchema ]),
  where: NotificationWhereInputSchema.optional(),
}).strict() ;

export const NotificationDeleteManyArgsSchema: z.ZodType<Prisma.NotificationDeleteManyArgs> = z.object({
  where: NotificationWhereInputSchema.optional(),
}).strict() ;

export const ReactionCreateArgsSchema: z.ZodType<Prisma.ReactionCreateArgs> = z.object({
  select: ReactionSelectSchema.optional(),
  include: ReactionIncludeSchema.optional(),
  data: z.union([ ReactionCreateInputSchema,ReactionUncheckedCreateInputSchema ]),
}).strict() ;

export const ReactionUpsertArgsSchema: z.ZodType<Prisma.ReactionUpsertArgs> = z.object({
  select: ReactionSelectSchema.optional(),
  include: ReactionIncludeSchema.optional(),
  where: ReactionWhereUniqueInputSchema,
  create: z.union([ ReactionCreateInputSchema,ReactionUncheckedCreateInputSchema ]),
  update: z.union([ ReactionUpdateInputSchema,ReactionUncheckedUpdateInputSchema ]),
}).strict() ;

export const ReactionCreateManyArgsSchema: z.ZodType<Prisma.ReactionCreateManyArgs> = z.object({
  data: z.union([ ReactionCreateManyInputSchema,ReactionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ReactionDeleteArgsSchema: z.ZodType<Prisma.ReactionDeleteArgs> = z.object({
  select: ReactionSelectSchema.optional(),
  include: ReactionIncludeSchema.optional(),
  where: ReactionWhereUniqueInputSchema,
}).strict() ;

export const ReactionUpdateArgsSchema: z.ZodType<Prisma.ReactionUpdateArgs> = z.object({
  select: ReactionSelectSchema.optional(),
  include: ReactionIncludeSchema.optional(),
  data: z.union([ ReactionUpdateInputSchema,ReactionUncheckedUpdateInputSchema ]),
  where: ReactionWhereUniqueInputSchema,
}).strict() ;

export const ReactionUpdateManyArgsSchema: z.ZodType<Prisma.ReactionUpdateManyArgs> = z.object({
  data: z.union([ ReactionUpdateManyMutationInputSchema,ReactionUncheckedUpdateManyInputSchema ]),
  where: ReactionWhereInputSchema.optional(),
}).strict() ;

export const ReactionDeleteManyArgsSchema: z.ZodType<Prisma.ReactionDeleteManyArgs> = z.object({
  where: ReactionWhereInputSchema.optional(),
}).strict() ;

export const ViewCreateArgsSchema: z.ZodType<Prisma.ViewCreateArgs> = z.object({
  select: ViewSelectSchema.optional(),
  include: ViewIncludeSchema.optional(),
  data: z.union([ ViewCreateInputSchema,ViewUncheckedCreateInputSchema ]),
}).strict() ;

export const ViewUpsertArgsSchema: z.ZodType<Prisma.ViewUpsertArgs> = z.object({
  select: ViewSelectSchema.optional(),
  include: ViewIncludeSchema.optional(),
  where: ViewWhereUniqueInputSchema,
  create: z.union([ ViewCreateInputSchema,ViewUncheckedCreateInputSchema ]),
  update: z.union([ ViewUpdateInputSchema,ViewUncheckedUpdateInputSchema ]),
}).strict() ;

export const ViewCreateManyArgsSchema: z.ZodType<Prisma.ViewCreateManyArgs> = z.object({
  data: z.union([ ViewCreateManyInputSchema,ViewCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ViewDeleteArgsSchema: z.ZodType<Prisma.ViewDeleteArgs> = z.object({
  select: ViewSelectSchema.optional(),
  include: ViewIncludeSchema.optional(),
  where: ViewWhereUniqueInputSchema,
}).strict() ;

export const ViewUpdateArgsSchema: z.ZodType<Prisma.ViewUpdateArgs> = z.object({
  select: ViewSelectSchema.optional(),
  include: ViewIncludeSchema.optional(),
  data: z.union([ ViewUpdateInputSchema,ViewUncheckedUpdateInputSchema ]),
  where: ViewWhereUniqueInputSchema,
}).strict() ;

export const ViewUpdateManyArgsSchema: z.ZodType<Prisma.ViewUpdateManyArgs> = z.object({
  data: z.union([ ViewUpdateManyMutationInputSchema,ViewUncheckedUpdateManyInputSchema ]),
  where: ViewWhereInputSchema.optional(),
}).strict() ;

export const ViewDeleteManyArgsSchema: z.ZodType<Prisma.ViewDeleteManyArgs> = z.object({
  where: ViewWhereInputSchema.optional(),
}).strict() ;