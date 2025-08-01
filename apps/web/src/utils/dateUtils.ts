export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateRange = (
  startDate: string,
  endDate: string | null
): string => {
  const start = formatDate(startDate);
  if (!endDate) {
    return `${start} - Ongoing`;
  }
  const end = formatDate(endDate);
  return `${start} - ${end}`;
};

export const isDateInRange = (
  date: string,
  startDate: string | null,
  endDate: string | null
): boolean => {
  const targetDate = new Date(date);

  if (startDate && targetDate < new Date(startDate)) {
    return false;
  }

  if (endDate && targetDate > new Date(endDate)) {
    return false;
  }

  return true;
};

export const getDaysRemaining = (endDate: string | null): number | null => {
  if (!endDate) return null;

  const today = new Date();
  const end = new Date(endDate);
  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

export const getProjectDuration = (
  startDate: string,
  endDate: string | null
): string => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 30) {
    return `${diffDays} days`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? 's' : ''}`;
  } else {
    const years = Math.floor(diffDays / 365);
    const remainingMonths = Math.floor((diffDays % 365) / 30);
    return `${years} year${years > 1 ? 's' : ''}${
      remainingMonths > 0
        ? ` ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`
        : ''
    }`;
  }
};
