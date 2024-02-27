import {
  RelationshipCategory,
  CoreEntityType,
  RelationshipDirection,
} from '@prisma/client';
import {
  IconBuildingCommunity,
  IconHeartHandshake,
  IconCertificate,
  IconUserPentagon,
} from '@tabler/icons-react';

import { getEntityIcon } from '@/components/entities/utils';

import { cn } from '@/libs/utils';

export const CategoryIconAgency = (props: any) => (
  <IconUserPentagon {...props} />
);

export const CategoryIconEmployment = (props: any) => (
  <IconBuildingCommunity {...props} />
);

export const CategoryIconPartnership = (props: any) => (
  <IconHeartHandshake {...props} />
);

export const CategoryIconOwnership = (props: any) => (
  <IconCertificate {...props} />
);

export const getRelationshipCategoryIcon = ({
  category,
  className,
}: {
  category?: RelationshipCategory;
  className?: string;
}) => {
  const classes = cn('w-4 h-4', className);

  switch (category) {
    case RelationshipCategory.OWNERSHIP:
      return <CategoryIconOwnership className={classes} />;
    case RelationshipCategory.EMPLOYMENT:
      return <CategoryIconEmployment className={classes} />;
    case RelationshipCategory.AGENCY:
      return <CategoryIconAgency className={classes} />;
    case RelationshipCategory.PARTNERSHIP:
      return <CategoryIconPartnership className={classes} />;
    default:
      return null;
  }
};

export const getDirectionIcons = (
  from?: CoreEntityType | null,
  to?: CoreEntityType | null,
  direction?: RelationshipDirection,
): React.ReactNode => {
  const fromIcon = from && getEntityIcon({ type: from });
  const toIcon = to && getEntityIcon({ type: to });

  const directionArrow =
    direction === RelationshipDirection.ONE_WAY ? (
      <span>-&gt;</span>
    ) : (
      <span>&lt;-&gt;</span>
    );

  return (
    <div className="flex flex-row gap-2">
      {fromIcon} {directionArrow} {toIcon}
    </div>
  );
};
