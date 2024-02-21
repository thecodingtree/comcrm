import {
  IconAddressBook,
  IconTopologyStar3,
  IconBuilding,
  IconUsers,
  IconLayoutDashboard,
  IconChevronDown,
  IconChevronUp,
  IconPlus as IconPlusTabler,
  IconClock,
  IconCalendarClock as IconCalendarClockTabler,
  IconNote as IconNoteTabler,
} from '@tabler/icons-react';

export const IconDashboard = (props: any) => <IconLayoutDashboard {...props} />;

export const IconContact = (props: any) => <IconAddressBook {...props} />;

export const IconCompany = (props: any) => <IconTopologyStar3 {...props} />;

export const IconProperty = (props: any) => <IconBuilding {...props} />;

export const IconTeam = (props: any) => <IconUsers {...props} />;

export const IconExpand = (props: any) => <IconChevronDown {...props} />;
export const IconCollapse = (props: any) => <IconChevronUp {...props} />;

export const IconPlus = (props: any) => <IconPlusTabler {...props} />;

export const IconTime = (props: any) => <IconClock {...props} />;

export const IconCalendarClock = (props: any) => (
  <IconCalendarClockTabler {...props} />
);

export const IconNote = (props: any) => <IconNoteTabler {...props} />;
