'use client';

import TaskItem from './TaskItem';

export default function TasksList() {
  return (
    <div>
      <TaskItem
        category="call"
        time="10:00 AM"
        date="Today"
        description="Call Steve"
        content="Call 123-455-6655 and see if Steve is ready to sell"
      />
    </div>
  );
}
