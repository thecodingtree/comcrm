import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  state: Scalars['String']['output'];
  street: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  zip: Scalars['String']['output'];
};

export type AddressInput = {
  city: Scalars['String']['input'];
  state: Scalars['String']['input'];
  street: Scalars['String']['input'];
  zip: Scalars['String']['input'];
};

export type Attribute = {
  __typename?: 'Attribute';
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type AttributeInput = {
  name: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type Company = {
  __typename?: 'Company';
  address?: Maybe<Address>;
  attributes?: Maybe<Array<Maybe<Attribute>>>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type Contact = {
  __typename?: 'Contact';
  address?: Maybe<Address>;
  attributes?: Maybe<Array<Maybe<Attribute>>>;
  createdAt: Scalars['DateTime']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  surName?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type CoreEntityFilter = {
  entity?: InputMaybe<Scalars['ID']['input']>;
  user?: InputMaybe<Scalars['ID']['input']>;
};

export type CoreEntityInput = {
  address?: InputMaybe<AddressInput>;
  attributes?: InputMaybe<Array<InputMaybe<AttributeInput>>>;
  name: Scalars['String']['input'];
  surName?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['ID']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCompany?: Maybe<Company>;
  createContact?: Maybe<Contact>;
  createProperty?: Maybe<Property>;
  deleteCompany?: Maybe<Company>;
  deleteContact?: Maybe<Contact>;
  deleteProperty?: Maybe<Property>;
  updateCompany?: Maybe<Company>;
  updateContact?: Maybe<Contact>;
  updateProperty?: Maybe<Property>;
};


export type MutationCreateCompanyArgs = {
  address?: InputMaybe<AddressInput>;
  attributes?: InputMaybe<Array<InputMaybe<AttributeInput>>>;
  name: Scalars['String']['input'];
  user: Scalars['ID']['input'];
};


export type MutationCreateContactArgs = {
  address?: InputMaybe<AddressInput>;
  attributes?: InputMaybe<Array<InputMaybe<AttributeInput>>>;
  name: Scalars['String']['input'];
  surName?: InputMaybe<Scalars['String']['input']>;
  user: Scalars['ID']['input'];
};


export type MutationCreatePropertyArgs = {
  address?: InputMaybe<AddressInput>;
  attributes?: InputMaybe<Array<InputMaybe<AttributeInput>>>;
  name: Scalars['String']['input'];
  user: Scalars['ID']['input'];
};


export type MutationDeleteCompanyArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteContactArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePropertyArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateCompanyArgs = {
  address?: InputMaybe<AddressInput>;
  attributes?: InputMaybe<Array<InputMaybe<AttributeInput>>>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateContactArgs = {
  address?: InputMaybe<AddressInput>;
  attributes?: InputMaybe<Array<InputMaybe<AttributeInput>>>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  surName?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdatePropertyArgs = {
  address?: InputMaybe<AddressInput>;
  attributes?: InputMaybe<Array<InputMaybe<AttributeInput>>>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Property = {
  __typename?: 'Property';
  address?: Maybe<Address>;
  attributes?: Maybe<Array<Maybe<Attribute>>>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  allUsers?: Maybe<Array<Maybe<User>>>;
  companies?: Maybe<Array<Maybe<Company>>>;
  company?: Maybe<Company>;
  contact?: Maybe<Contact>;
  contacts?: Maybe<Array<Maybe<Contact>>>;
  me?: Maybe<User>;
  properties?: Maybe<Array<Maybe<Property>>>;
  property?: Maybe<Property>;
};


export type QueryCompaniesArgs = {
  filter?: InputMaybe<CoreEntityFilter>;
};


export type QueryCompanyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryContactArgs = {
  id: Scalars['ID']['input'];
};


export type QueryContactsArgs = {
  filter?: InputMaybe<CoreEntityFilter>;
};


export type QueryPropertiesArgs = {
  filter?: InputMaybe<CoreEntityFilter>;
};


export type QueryPropertyArgs = {
  id: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Address: ResolverTypeWrapper<Address>;
  AddressInput: AddressInput;
  Attribute: ResolverTypeWrapper<Attribute>;
  AttributeInput: AttributeInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Company: ResolverTypeWrapper<Company>;
  Contact: ResolverTypeWrapper<Contact>;
  CoreEntityFilter: CoreEntityFilter;
  CoreEntityInput: CoreEntityInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Property: ResolverTypeWrapper<Property>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Address: Address;
  AddressInput: AddressInput;
  Attribute: Attribute;
  AttributeInput: AttributeInput;
  Boolean: Scalars['Boolean']['output'];
  Company: Company;
  Contact: Contact;
  CoreEntityFilter: CoreEntityFilter;
  CoreEntityInput: CoreEntityInput;
  DateTime: Scalars['DateTime']['output'];
  ID: Scalars['ID']['output'];
  JSON: Scalars['JSON']['output'];
  Mutation: {};
  Property: Property;
  Query: {};
  String: Scalars['String']['output'];
  User: User;
}>;

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = ResolversObject<{
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  street?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  zip?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AttributeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Attribute'] = ResolversParentTypes['Attribute']> = ResolversObject<{
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CompanyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Company'] = ResolversParentTypes['Company']> = ResolversObject<{
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  attributes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Attribute']>>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContactResolvers<ContextType = any, ParentType extends ResolversParentTypes['Contact'] = ResolversParentTypes['Contact']> = ResolversObject<{
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  attributes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Attribute']>>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  surName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createCompany?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType, RequireFields<MutationCreateCompanyArgs, 'name' | 'user'>>;
  createContact?: Resolver<Maybe<ResolversTypes['Contact']>, ParentType, ContextType, RequireFields<MutationCreateContactArgs, 'name' | 'user'>>;
  createProperty?: Resolver<Maybe<ResolversTypes['Property']>, ParentType, ContextType, RequireFields<MutationCreatePropertyArgs, 'name' | 'user'>>;
  deleteCompany?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType, RequireFields<MutationDeleteCompanyArgs, 'id'>>;
  deleteContact?: Resolver<Maybe<ResolversTypes['Contact']>, ParentType, ContextType, RequireFields<MutationDeleteContactArgs, 'id'>>;
  deleteProperty?: Resolver<Maybe<ResolversTypes['Property']>, ParentType, ContextType, RequireFields<MutationDeletePropertyArgs, 'id'>>;
  updateCompany?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType, RequireFields<MutationUpdateCompanyArgs, 'id'>>;
  updateContact?: Resolver<Maybe<ResolversTypes['Contact']>, ParentType, ContextType, RequireFields<MutationUpdateContactArgs, 'id'>>;
  updateProperty?: Resolver<Maybe<ResolversTypes['Property']>, ParentType, ContextType, RequireFields<MutationUpdatePropertyArgs, 'id'>>;
}>;

export type PropertyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Property'] = ResolversParentTypes['Property']> = ResolversObject<{
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  attributes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Attribute']>>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  allUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  companies?: Resolver<Maybe<Array<Maybe<ResolversTypes['Company']>>>, ParentType, ContextType, Partial<QueryCompaniesArgs>>;
  company?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType, RequireFields<QueryCompanyArgs, 'id'>>;
  contact?: Resolver<Maybe<ResolversTypes['Contact']>, ParentType, ContextType, RequireFields<QueryContactArgs, 'id'>>;
  contacts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Contact']>>>, ParentType, ContextType, Partial<QueryContactsArgs>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  properties?: Resolver<Maybe<Array<Maybe<ResolversTypes['Property']>>>, ParentType, ContextType, Partial<QueryPropertiesArgs>>;
  property?: Resolver<Maybe<ResolversTypes['Property']>, ParentType, ContextType, RequireFields<QueryPropertyArgs, 'id'>>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Address?: AddressResolvers<ContextType>;
  Attribute?: AttributeResolvers<ContextType>;
  Company?: CompanyResolvers<ContextType>;
  Contact?: ContactResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Property?: PropertyResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

