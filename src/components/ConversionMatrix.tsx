"use client";
import React, { useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { convertTemperature, TemperatureUnit, temperatureUnitLabels, temperatureUnitSymbols } from '@/utils/temperatureUtils';

interface ConversionMatrixProps {
  baseValue: number;
  baseUnit: TemperatureUnit;
}

const ConversionMatrix: React.FC<ConversionMatrixProps> = ({ baseValue, baseUnit }) => {
  const allUnits = Object.keys(temperatureUnitLabels) as TemperatureUnit[];
  
  const conversions = useMemo(() => {
    return allUnits.map(unit => {
      const converted = convertTemperature(baseValue, baseUnit, unit);
      
      // Format with appropriate precision based on magnitude
      let formatted: string;
      if (Math.abs(converted) < 0.01) {
        formatted = converted.toFixed(6);
      } else if (Math.abs(converted) < 1) {
        formatted = converted.toFixed(4);
      } else if (Math.abs(converted) < 10) {
        formatted = converted.toFixed(3);
      } else if (Math.abs(converted) < 100) {
        formatted = converted.toFixed(2);
      } else if (Math.abs(converted) < 1000) {
        formatted = converted.toFixed(1);
      } else {
        formatted = converted.toFixed(0);
      }
      
      return {
        unit,
        value: converted,
        formatted: `${formatted} ${temperatureUnitSymbols[unit]}`
      };
    });
  }, [allUnits, baseValue, baseUnit]);
  
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/2">Temperature Scale</TableHead>
            <TableHead className="text-right">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {conversions.map((item) => (
            <TableRow 
              key={item.unit}
              className={item.unit === baseUnit ? "bg-primary/5" : undefined}
            >
              <TableCell className="font-medium">{temperatureUnitLabels[item.unit]}</TableCell>
              <TableCell className="text-right font-mono">{item.formatted}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ConversionMatrix;
