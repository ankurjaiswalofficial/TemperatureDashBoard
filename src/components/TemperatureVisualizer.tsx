import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Thermometer, ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
// import { formatTemperature, TemperatureUnit } from '@/utils/temperatureUtils';

// Sample data for the visualizations
const generateRandomTemperatureData = (baseTemp: number, days: number, variance: number) => {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - days + i + 1);
    
    // Generate random temperature with trend
    let temp = baseTemp + (Math.random() * variance * 2 - variance);
    
    // Add seasonal pattern (higher in middle of range)
    const seasonalFactor = Math.sin((i / days) * Math.PI);
    temp += seasonalFactor * (variance / 2);
    
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      temperature: parseFloat(temp.toFixed(1)),
      trend: i > 0 ? 
        (temp > baseTemp + 0.5 ? 'rising' : temp < baseTemp - 0.5 ? 'falling' : 'stable') : 
        'stable'
    };
  });
};

// Generate heat transfer over time data
const generateHeatTransferData = () => {
  return Array.from({ length: 10 }, (_, i) => {
    const time = i * 10; // minutes
    const tempHot = 100 - (i * 5); // Cooling down
    const tempCold = 20 + (i * 3); // Heating up
    
    return {
      time: `${time} min`,
      hotSide: tempHot,
      coldSide: tempCold,
      heatTransfer: (tempHot - tempCold) * 2, // Simplified heat transfer rate
      equilibrium: 60 // Theoretical equilibrium temperature
    };
  });
};

// Sample data
const temperatureData = generateRandomTemperatureData(25, 14, 5);
const materialHeatData = generateHeatTransferData();

// Material conductivity comparison data
const materialComparisonData = [
  { name: 'Copper', conductivity: 385 },
  { name: 'Aluminum', conductivity: 205 },
  { name: 'Iron', conductivity: 80 },
  { name: 'Steel', conductivity: 50.2 },
  { name: 'Glass', conductivity: 0.8 },
  { name: 'Wood', conductivity: 0.13 },
  { name: 'Air', conductivity: 0.026 },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <Card className="glass p-2 border shadow-sm text-xs">
        <p className="font-medium">{label}</p>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {payload.map((item: any, index: number) => (
          <div key={index} className="flex items-center gap-1">
            <div style={{ backgroundColor: item.color, width: 8, height: 8, borderRadius: 4 }} />
            <span>{item.name}: </span>
            <span className="font-mono">{item.value}</span>
            {item.name === "temperature" && (
              <span className="ml-1">
                {item.payload.trend === 'rising' ? (
                  <ArrowUpRight className="h-3 w-3 text-red-500" />
                ) : item.payload.trend === 'falling' ? (
                  <ArrowDownRight className="h-3 w-3 text-blue-500" />
                ) : (
                  <Minus className="h-3 w-3 text-gray-500" />
                )}
              </span>
            )}
          </div>
        ))}
      </Card>
    );
  }
  return null;
};

const TemperatureVisualizer: React.FC = () => {
  const [chartType, setChartType] = useState<string>('temperature');
  
  return (
    <div className="section-container animate-slide-in">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-gradient">Temperature Visualizations <sub>Dummy</sub></h2>
        
        <Tabs value={chartType} onValueChange={setChartType} className="w-full">
          <TabsList className="w-full max-w-lg mx-auto grid grid-cols-3">
            <TabsTrigger value="temperature" className='text-xs sm:text-sm'>Recent Temp.s</TabsTrigger>
            <TabsTrigger value="heatTransfer" className='text-xs sm:text-sm'>Heat Transfer</TabsTrigger>
            <TabsTrigger value="materials" className='text-xs sm:text-sm'>Materials Compar.</TabsTrigger>
          </TabsList>
          
          <TabsContent value="temperature" className="mt-6">
            <Card className="light-card overflow-hidden">
              <CardContent className="p-6">
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={temperatureData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }} 
                        tickMargin={10} 
                      />
                      <YAxis 
                        tickFormatter={(value) => `${value}°C`}
                        tick={{ fontSize: 12 }} 
                        tickMargin={10} 
                        domain={['dataMin - 2', 'dataMax + 2']}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="temperature" 
                        stroke="#3B82F6" 
                        fillOpacity={1} 
                        fill="url(#tempGradient)" 
                        animationDuration={1000}
                        activeDot={{ r: 6 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6 bg-muted/30 p-4 rounded-lg">
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-primary" />
                    Temperature Trends
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    This chart displays temperature variations over the past 14 days. The gradient area shows the temperature fluctuations, with upward and downward trends indicated by arrows in the tooltip.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="heatTransfer" className="mt-6">
            <Card className="light-card overflow-hidden">
              <CardContent className="p-6">
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={materialHeatData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="time" tick={{ fontSize: 12 }} tickMargin={10} />
                      <YAxis yAxisId="left" tick={{ fontSize: 12 }} tickMargin={10} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} tickMargin={10} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="hotSide" 
                        name="Hot Side (°C)" 
                        stroke="#EF4444" 
                        strokeWidth={2}
                        dot={false}
                        animationDuration={1000}
                      />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="coldSide" 
                        name="Cold Side (°C)" 
                        stroke="#3B82F6" 
                        strokeWidth={2}
                        dot={false}
                        animationDuration={1200}
                      />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="equilibrium" 
                        name="Equilibrium Temp (°C)" 
                        stroke="#9CA3AF" 
                        strokeDasharray="4 4"
                        strokeWidth={1}
                        dot={false}
                        animationDuration={1400}
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="heatTransfer" 
                        name="Heat Transfer Rate (W)" 
                        stroke="#8B5CF6" 
                        strokeWidth={2}
                        dot={false}
                        animationDuration={1600}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6 bg-muted/30 p-4 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Heat Transfer Simulation</h3>
                  <p className="text-sm text-muted-foreground">
                    This chart simulates the change in temperature between the hot and cold sides of a material over time, showing how they approach thermal equilibrium. The heat transfer rate decreases as the temperature difference diminishes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="materials" className="mt-6">
            <Card className="light-card overflow-hidden">
              <CardContent className="p-6">
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={materialComparisonData} layout="vertical" margin={{ top: 10, right: 80, left: 20, bottom: 10 }}>
                      <defs>
                        <linearGradient id="conductivityGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.8} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 12 }} tickMargin={10} />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        tick={{ fontSize: 12 }} 
                        tickMargin={10} 
                        width={80}
                      />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="conductivity" 
                        name="Conductivity (W/(m·K))" 
                        stroke="url(#conductivityGradient)" 
                        fill="url(#conductivityGradient)" 
                        animationDuration={1200}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6 bg-muted/30 p-4 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Material Thermal Conductivity</h3>
                  <p className="text-sm text-muted-foreground">
                    This chart compares the thermal conductivity of different materials. Materials with higher thermal conductivity transfer heat more efficiently. Metals like copper and aluminum have very high conductivity, while insulators like wood and air have much lower values.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TemperatureVisualizer;
