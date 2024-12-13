'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { z } from 'zod';

import { Button } from '@/components/ui/button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import {
  CoreEntityType,
  RelationshipCategory,
  RelationshipDirection,
} from '@prisma/client';
import {
  type RelationshipTypeData,
  RelationshipTypeInput,
} from '@/server/sharedTypes';
import { getEntityIcon } from '@/components/entities/utils';
import { getRelationshipCategoryIcon } from './icons';

export default function RelationshipTypeForm({
  type,
  submitLabel,
  onSubmit,
  submitting,
}: {
  type?: {
    category?: RelationshipCategory;
    direction?: RelationshipDirection;
    from?: CoreEntityType;
    id?: string;
    name?: string;
    to?: CoreEntityType;
  } | null;
  submitLabel?: string;
  onSubmit: (values: RelationshipTypeData) => void;
  submitting?: boolean;
}) {
  const form = useForm<RelationshipTypeData>({
    resolver: zodResolver(RelationshipTypeInput),
    defaultValues: {
      name: type?.name ?? '',
      from: type?.from ?? CoreEntityType.CONTACT,
      to: type?.to ?? CoreEntityType.PROPERTY,
      category: type?.category ?? RelationshipCategory.OWNERSHIP,
      direction: type?.direction ?? RelationshipDirection.TWO_WAY,
    },
  });

  const entitySelectItem = (type: CoreEntityType) => (
    <SelectItem value={type}>
      <span className="flex flex-row gap-2 items-center">
        <span>
          {getEntityIcon({
            type,
          })}
        </span>
        <span>{type}</span>
      </span>
    </SelectItem>
  );

  return (
    <div className="m-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>Relation</div>
          <div className="flex flex-row gap-2">
            <FormField
              control={form.control}
              name="from"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {entitySelectItem(CoreEntityType.CONTACT)}
                      {entitySelectItem(CoreEntityType.COMPANY)}
                      {entitySelectItem(CoreEntityType.PROPERTY)}
                    </SelectContent>
                  </Select>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="direction"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={RelationshipDirection.ONE_WAY}>
                        -&gt;
                      </SelectItem>
                      <SelectItem value={RelationshipDirection.TWO_WAY}>
                        &lt;-&gt;
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {entitySelectItem(CoreEntityType.CONTACT)}
                      {entitySelectItem(CoreEntityType.COMPANY)}
                      {entitySelectItem(CoreEntityType.PROPERTY)}
                    </SelectContent>
                  </Select>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={RelationshipCategory.OWNERSHIP}>
                      <span className="flex flex-row gap-2 items-center justify-between">
                        <span>
                          {getRelationshipCategoryIcon({
                            category: RelationshipCategory.OWNERSHIP,
                          })}
                        </span>
                        <span>{RelationshipCategory.OWNERSHIP}</span>
                      </span>
                    </SelectItem>
                    <SelectItem value={RelationshipCategory.EMPLOYMENT}>
                      <span className="flex flex-row gap-2 items-center justify-between">
                        <span>
                          {getRelationshipCategoryIcon({
                            category: RelationshipCategory.EMPLOYMENT,
                          })}
                        </span>
                        <span>{RelationshipCategory.EMPLOYMENT}</span>
                      </span>
                    </SelectItem>
                    <SelectItem value={RelationshipCategory.AGENCY}>
                      <span className="flex flex-row gap-2 items-center justify-between">
                        <span>
                          {getRelationshipCategoryIcon({
                            category: RelationshipCategory.AGENCY,
                          })}
                        </span>
                        <span>{RelationshipCategory.AGENCY}</span>
                      </span>
                    </SelectItem>
                    <SelectItem value={RelationshipCategory.PARTNERSHIP}>
                      <span className="flex flex-row gap-2 items-center justify-between">
                        <span>
                          {getRelationshipCategoryIcon({
                            category: RelationshipCategory.PARTNERSHIP,
                          })}
                        </span>
                        <span>{RelationshipCategory.PARTNERSHIP}</span>
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="required" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col justify-center mt-2">
            <Button type="submit" disabled={submitting}>
              {submitLabel ?? 'Submit'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
