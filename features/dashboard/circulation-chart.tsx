import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import { BarChart3, PieChart as PieIcon, Info } from 'lucide-react';

interface CirculationChartsProps {
  chartData: ChartItem[];
  totalCopies: number;
  availableCopies: number;
  borrowedCopies: number;
  overdueCopies: number;
}

const BAR_COLORS: Record<string, string> = {
  'Total Copies': '#334155', // slate-700
  Available: '#059669', // emerald-600
  Borrowed: '#d97706', // amber-600
  Overdue: '#e11d48', // rose-600
};

export const CirculationCharts: React.FC<CirculationChartsProps> = ({
  chartData,
  totalCopies,
  availableCopies,
  borrowedCopies,
  overdueCopies,
}) => {
  const [activeView, setActiveView] = useState<'bar' | 'donut'>('bar');

  // Breakdown data for the donut chart (excluding total copies to show parts of whole)
  const breakdownData = [
    { name: 'Available Copies', value: availableCopies, color: '#059669' },
    { name: 'Borrowed Copies', value: borrowedCopies, color: '#d97706' },
    { name: 'Overdue Copies', value: overdueCopies, color: '#e11d48' },
  ].filter((item) => item.value > 0 || item.name === 'Overdue Copies');

  const availabilityRate =
    totalCopies > 0 ? ((availableCopies / totalCopies) * 100).toFixed(1) : '0.0';
  const circulationRate =
    totalCopies > 0 ? ((borrowedCopies / totalCopies) * 100).toFixed(1) : '0.0';

  return (
    <div id="circulation-analytics-card" className="bg-white border border-stone-200/90 rounded-xl p-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
        <div>
          <h2 className="text-base font-semibold text-stone-900 tracking-tight flex items-center gap-2">
            Circulation & Inventory Breakdown
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Real-time copy availability, active borrowings, and overdue tracking
          </p>
        </div>

        {/* View Switcher */}
        <div className="inline-flex p-1 bg-stone-100 rounded-lg border border-stone-200 self-start sm:self-auto">
          <button
            id="btn-chart-view-bar"
            type="button"
            onClick={() => setActiveView('bar')}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${activeView === 'bar'
              ? 'bg-white text-stone-900 shadow-2xs font-semibold'
              : 'text-stone-600 hover:text-stone-900'
              }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Bar Chart
          </button>
          <button
            id="btn-chart-view-donut"
            type="button"
            onClick={() => setActiveView('donut')}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${activeView === 'donut'
              ? 'bg-white text-stone-900 shadow-2xs font-semibold'
              : 'text-stone-600 hover:text-stone-900'
              }`}
          >
            <PieIcon className="w-3.5 h-3.5" />
            Donut Share
          </button>
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5 items-center">
        {/* Visual Chart */}
        <div className="lg:col-span-8 h-72 w-full">
          {activeView === 'bar' ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 15, right: 20, left: -10, bottom: 10 }}
              >
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tick={{ fill: '#4b5563', fontSize: 12, fontWeight: 500 }}
                />
                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tick={{ fill: '#6b7280', fontSize: 11 }}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(243, 244, 246, 0.6)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as ChartItem;
                      const percentage =
                        totalCopies > 0
                          ? ((data.value / totalCopies) * 100).toFixed(1)
                          : '0';
                      return (
                        <div className="bg-stone-900 text-white px-3 py-2 rounded-lg text-xs shadow-lg">
                          <p className="font-semibold text-stone-200">{data.name}</p>
                          <p className="text-sm font-bold mt-0.5">
                            {data.value} copies
                            {data.name !== 'Total Copies' && (
                              <span className="text-stone-400 font-normal ml-1.5">
                                ({percentage}% of catalog)
                              </span>
                            )}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={56}>
                  {chartData?.map((entry, index) => (
                    <Cell
                      key={`bar-cell-${index}`}
                      fill={BAR_COLORS[entry.name] || '#475569'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-stone-900 text-white px-3 py-2 rounded-lg text-xs shadow-lg">
                            <p className="font-semibold">{data.name}</p>
                            <p className="text-sm font-bold mt-0.5">
                              {data.value} copies
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Pie
                    data={breakdownData}
                    cx="50%"
                    cy="50%"
                    innerRadius={68}
                    outerRadius={98}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {breakdownData?.map((entry, index) => (
                      <Cell key={`donut-cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Donut Center text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-stone-900">{totalCopies}</span>
                <span className="text-xs text-stone-500 font-medium">Total Copies</span>
              </div>
            </div>
          )}
        </div>

        {/* Breakdown Stats Column */}
        <div className="lg:col-span-4 flex flex-col justify-center space-y-3.5 bg-stone-50/70 border border-stone-200/70 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-600">On-Shelf Availability</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {availabilityRate}%
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden flex">
            <div
              className="bg-emerald-600 h-full transition-all duration-300"
              style={{ width: `${availabilityRate}%` }}
              title={`Available: ${availableCopies} copies`}
            />
            <div
              className="bg-amber-500 h-full transition-all duration-300"
              style={{ width: `${circulationRate}%` }}
              title={`Borrowed: ${borrowedCopies} copies`}
            />
            {overdueCopies > 0 && (
              <div
                className="bg-rose-500 h-full transition-all duration-300"
                style={{
                  width: `${((overdueCopies / totalCopies) * 100).toFixed(1)}%`,
                }}
                title={`Overdue: ${overdueCopies} copies`}
              />
            )}
          </div>

          <div className="pt-2 border-t border-stone-200/80 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-stone-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
                Available on Shelf
              </span>
              <span className="font-semibold text-stone-900 tabular-nums">
                {availableCopies} / {totalCopies}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-stone-600">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                Currently Borrowed
              </span>
              <span className="font-semibold text-stone-900 tabular-nums">
                {borrowedCopies} / {totalCopies}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-stone-600">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                Overdue Returns
              </span>
              <span className="font-semibold text-stone-900 tabular-nums">
                {overdueCopies} / {totalCopies}
              </span>
            </div>
          </div>

          <div className="mt-1 pt-2 border-t border-stone-200/80 text-[11px] text-stone-500 flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span>Circulation rate is at {circulationRate}% with 0 overdue penalties.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
