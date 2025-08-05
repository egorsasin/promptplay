import React from 'react';
import Card from '@/components/molecules/Card';
import Text from '@/components/atoms/Text';
import ProjectProgress from '@/components/molecules/ProjectProgress';
import { formatCurrency } from '@/utils/formatters';

export interface BudgetOverviewCardProps {
  budget: number;
  actualCost: number;
  className?: string;
}

const BudgetOverviewCard: React.FC<BudgetOverviewCardProps> = ({
  budget,
  actualCost,
  className = '',
}) => {
  const isOverBudget = actualCost > budget;
  const budgetPercentage = (actualCost / budget) * 100;

  return (
    <Card className={className}>
      <Text variant="h2" color="white" className="mb-4">
        Budget Overview
      </Text>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Text variant="caption" color="muted">
              Total Budget
            </Text>
            <Text variant="h2" color="white">
              {formatCurrency(budget)}
            </Text>
          </div>
          <div>
            <Text variant="caption" color="muted">
              Actual Cost
            </Text>
            <Text variant="h2" color={isOverBudget ? 'error' : 'success'}>
              {formatCurrency(actualCost)}
            </Text>
          </div>
        </div>
        <ProjectProgress
          value={Math.min(budgetPercentage, 100)}
          label="Budget Utilization"
          size="md"
          color={
            isOverBudget ? 'red' : budgetPercentage > 80 ? 'yellow' : 'emerald'
          }
        />
        {isOverBudget && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <Text variant="body" color="error" weight="medium">
              ⚠️ Project is over budget by {formatCurrency(actualCost - budget)}
            </Text>
          </div>
        )}
      </div>
    </Card>
  );
};

export default BudgetOverviewCard;
