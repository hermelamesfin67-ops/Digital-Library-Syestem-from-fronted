import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    id: string;
    title: string;
    value: number | string;
    subtitle?: string;
    badgeText?: string;
    badgeType?: 'neutral' | 'success' | 'warning' | 'info';
    icon: LucideIcon;
    iconBgColor?: string;
    iconColor?: string;
    onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
    id,
    title,
    value,
    subtitle,
    badgeText,
    badgeType = 'neutral',
    icon: Icon,
    iconBgColor = 'bg-stone-100',
    iconColor = 'text-stone-700',
    onClick,
}) => {
    const getBadgeStyle = () => {
        switch (badgeType) {
            case 'success':
                return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
            case 'warning':
                return 'bg-amber-50 text-amber-800 border-amber-200/80';
            case 'info':
                return 'bg-sky-50 text-sky-700 border-sky-200/80';
            case 'neutral':
            default:
                return 'bg-stone-100 text-stone-700 border-stone-200/80';
        }
    };

    return (
        <div
            id={id}
            className={`relative bg-white border border-stone-200/90 rounded-xl p-5 transition-all duration-150 hover:border-stone-400 hover:shadow-xs`}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider truncate mb-1">
                        {title}
                    </p>
                    <div className="flex items-baseline gap-2.5">
                        <span className="text-3xl font-bold tracking-tight text-stone-900 tabular-nums">
                            {value}
                        </span>
                        {badgeText && (
                            <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getBadgeStyle()}`}
                            >
                                {badgeText}
                            </span>
                        )}
                    </div>
                    {subtitle && (
                        <p className="text-xs text-stone-500 mt-2 font-normal truncate">
                            {subtitle}
                        </p>
                    )}
                </div>

                <div
                    className={`flex-shrink-0 w-11 h-11 rounded-lg ${iconBgColor} ${iconColor} flex items-center justify-center`}
                >
                    <Icon className="w-5 h-5" strokeWidth={2} />
                </div>
            </div>
        </div>
    );
};
