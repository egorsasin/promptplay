import React from 'react';
import Card from '@/components/molecules/Card';
import Text from '@/components/atoms/Text';
import Icon from '@/components/atoms/Icon';

export interface TechnologiesCardProps {
  tags: string[];
  className?: string;
}

const TechnologiesCard: React.FC<TechnologiesCardProps> = ({
  tags,
  className = '',
}) => {
  return (
    <Card className={className}>
      <Text variant="h2" color="white" className="mb-4">
        Technologies & Tags
      </Text>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium bg-dark-600 text-gray-300 rounded-lg border border-dark-500 hover:bg-dark-500 transition-colors"
          >
            <Icon name="tag" size="sm" className="mr-1.5" />
            {tag}
          </span>
        ))}
      </div>
    </Card>
  );
};

export default TechnologiesCard;
