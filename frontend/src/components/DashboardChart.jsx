import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, PieChart, Pie, Cell } from 'recharts'
import styles from './DashboardChart.module.scss'

function DashboardChart({ type = 'line', data = [], colors = ['#4f46e5', '#22c55e', '#f59e0b'], height = 260 }) {
  const safeData = Array.isArray(data) ? data : []

  const chart = (() => {
    if (type === 'line') {
      return (
        <LineChart data={safeData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
          <XAxis dataKey="label" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip cursor={{ stroke: '#4338ca' }} />
          <Line type="monotone" dataKey="value" stroke={colors[0]} strokeWidth={2} dot={false} />
        </LineChart>
      )
    }
    if (type === 'area') {
      return (
        <AreaChart data={safeData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors[0]} stopOpacity={0.6}/>
              <stop offset="95%" stopColor={colors[0]} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
          <XAxis dataKey="label" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke={colors[0]} fillOpacity={1} fill="url(#grad)" />
        </AreaChart>
      )
    }
    if (type === 'pie') {
      return (
        <PieChart>
          <Tooltip />
          <Pie data={safeData} dataKey="value" nameKey="label" outerRadius={100} label>
            {safeData.map((_, i) => (
              <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      )
    }
    return null
  })()

  return (
    <div className={styles.chartWrap}>
      <ResponsiveContainer width="100%" height={height}>
        {chart}
      </ResponsiveContainer>
    </div>
  )
}

export default DashboardChart
