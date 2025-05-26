import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  previousValue?: string | number;
  change?: number;
  positive?: boolean;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  previousValue,
  change,
  positive
}) => {
  return (
    <div className="card hover:shadow-md">
      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
        
        {previousValue && change !== undefined && (
          <div className="flex items-center mt-2">
            <div className={`flex items-center ${positive ? 'text-green-600' : 'text-red-600'}`}>
              {positive ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              <span className="text-sm font-medium">{change}%</span>
            </div>
            <span className="text-sm text-slate-500 ml-2">vs {previousValue}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;