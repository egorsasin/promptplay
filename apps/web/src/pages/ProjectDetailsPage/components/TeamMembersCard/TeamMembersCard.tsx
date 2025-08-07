import React from 'react';
import Card from '@/components/molecules/Card';
import Text from '@/components/atoms/Text';
import TeamMember from '@/components/molecules/TeamMember';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string | null;
}

export interface TeamMembersCardProps {
  teamMembers: TeamMember[];
  className?: string;
}

const TeamMembersCard: React.FC<TeamMembersCardProps> = ({
  teamMembers,
  className = '',
}) => {
  if (teamMembers.length === 0) {
    return null;
  }

  return (
    <Card className={className}>
      <Text variant="h2" color="white" className="mb-4">
        Team Members
      </Text>
      <div className="space-y-3">
        {teamMembers.map((member) => (
          <TeamMember
            key={member.id}
            id={member.id}
            name={member.name}
            role={member.role}
            avatar={member.avatar}
          />
        ))}
      </div>
    </Card>
  );
};

export default TeamMembersCard;
