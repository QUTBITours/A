import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  onClick?: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  onClick
}) => {
  return (
    <div 
      className={`card hover:shadow-md cursor-pointer transition-all duration-300 ${
        onClick ? 'hover:translate-y-[-2px]' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        
        <div className={`p-3 rounded-full bg-opacity-10 ${color}`}>
          <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;