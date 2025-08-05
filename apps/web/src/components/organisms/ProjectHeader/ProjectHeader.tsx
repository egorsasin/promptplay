import React from 'react';
import Text from '../../atoms/Text';
import Badge from '../../atoms/Badge';
import Button from '../../atoms/Button';
import Icon from '../../atoms/Icon';
import type { Project } from '@/types';
import {
  PROJECT_STATUS_LABELS,
  PROJECT_PRIORITY_LABELS,
  TEXT_VARIANTS,
  TEXT_COLORS,
  BUTTON_VARIANTS,
  ICON_NAMES,
} from '@/types';

export interface ProjectHeaderProps {
  project: Project;
  onBackClick?: () => void;
  showBackButton?: boolean;
  className?: string;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  project,
  onBackClick,
  showBackButton = false,
  className = '',
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {showBackButton && onBackClick && (
        <Button variant={BUTTON_VARIANTS.GHOST} size="sm" onClick={onBackClick}>
          <Icon name={ICON_NAMES.ARROW_LEFT} size="sm" className="mr-2" />
          Back to Projects
        </Button>
      )}

      <div className="flex items-start justify-between">
        <div className="flex-1">
          <Text variant={TEXT_VARIANTS.H1} color={TEXT_COLORS.WHITE} className="mb-2">
            {project.name}
          </Text>
          <Text variant={TEXT_VARIANTS.BODY} color={TEXT_COLORS.SECONDARY} className="mb-4 text-lg">
            {project.description}
          </Text>
          <div className="flex items-center space-x-4">
            <Badge variant={project.status} size="md">
              {PROJECT_STATUS_LABELS[project.status]}
            </Badge>
            <Badge variant={project.priority} size="md">
              {PROJECT_PRIORITY_LABELS[project.priority]}
            </Badge>
          </div>
        </div>

        <div className="text-right">
          <Text variant={TEXT_VARIANTS.CAPTION} color={TEXT_COLORS.MUTED}>
            Client
          </Text>
          <Text
            variant={TEXT_VARIANTS.BODY}
            color={TEXT_COLORS.PRIMARY}
            weight="semibold"
            className="text-lg"
          >
            {project.clientName}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
