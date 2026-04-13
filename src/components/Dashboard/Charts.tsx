import React from 'react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const districtData = [
  { name: 'Hodan', count: 12 },
  { name: 'Abdiaziz', count: 8 },
  { name: 'Waberi', count: 5 },
  { name: 'H/Weyne', count: 7 },
  { name: 'Wadajir', count: 4 },
];

const revenueData = [
  { month: 'Jan', amount: 4500 },
  { month: 'Feb', amount: 5200 },
  { month: 'Mar', amount: 4800 },
  { month: 'Apr', amount: 6100 },
  { month: 'May', amount: 5900 },
  { month: 'Jun', amount: 7200 },
];

const COLORS = ['#0d9488', '#0369a1', '#b45309', '#0ea5e9', '#10b981'];

export const DistrictDistribution: React.FC = () => (
  <div style={{ height: 300, width: '100%' }}>
    <ResponsiveContainer minWidth={0}>
      <PieChart>
        <Pie
          data={districtData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="count"
        >
          {districtData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            borderRadius: 'var(--radius-md)', 
            border: 'none', 
            boxShadow: 'var(--shadow-lg)' 
          }} 
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export const RevenueTrend: React.FC = () => (
  <div style={{ height: 300, width: '100%' }}>
    <ResponsiveContainer minWidth={0}>
      <AreaChart data={revenueData}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis 
          dataKey="month" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#64748b', fontSize: 12 }} 
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#64748b', fontSize: 12 }} 
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip 
          contentStyle={{ 
            borderRadius: 'var(--radius-md)', 
            border: 'none', 
            boxShadow: 'var(--shadow-lg)' 
          }} 
        />
        <Area 
          type="monotone" 
          dataKey="amount" 
          stroke="#0d9488" 
          strokeWidth={3} 
          fillOpacity={1} 
          fill="url(#colorRevenue)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);
