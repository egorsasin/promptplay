import React from 'react';
import Input from '../../atoms/Input';
import Icon from '../../atoms/Icon';
import { ICON_NAMES } from '@/types';

export interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
}) => {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      leftIcon={<Icon name={ICON_NAMES.SEARCH} size="sm" />}
      className={className}
    />
  );
};

export default SearchBar;
