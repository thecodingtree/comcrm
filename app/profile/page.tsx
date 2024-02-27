import UpdateAvatar from '@/components/profile/UpdateAvatar';
import UpdateName from '@/components/profile/UpdateName';
import UpdateRelationshipTypes from '@/components/profile/UpdateRelationshipTypes';
import UpdateTeam from '@/components/profile/UpdateTeam';

export default function ProfilePage() {
  return (
    <div className="grid grid-flow-row gap-4">
      <UpdateAvatar />
      <UpdateName />
      <UpdateTeam />
      <UpdateRelationshipTypes />
    </div>
  );
}
