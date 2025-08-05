import React from 'react';
import { getInitials } from '@/utils/formatters';

export interface TeamMemberProps {
  id: string;
  name: string;
  role: string;
  avatar?: string | null;
  className?: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  role,
  avatar,
  className = '',
}) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="w-10 h-10 bg-gradient-green rounded-full flex items-center justify-center text-white font-semibold text-sm">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          getInitials(name)
        )}
      </div>
      <div>
        <p className="text-white font-medium">{name}</p>
        <p className="text-sm text-gray-400">{role}</p>
      </div>
    </div>
  );
};

export default TeamMember;
