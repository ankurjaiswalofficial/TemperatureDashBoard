"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpDown, Info } from "lucide-react";
import { convertTemperature, TemperatureUnit, temperatureUnitLabels } from '@/utils/temperatureUtils';
import ScaleInfoCard from './ScaleInfoCard';
import ConversionMatrix from './ConversionMatrix';

const TemperatureConverter: React.FC = () => {
  const [value, setValue] = useState<number>(20);
  const [fromUnit, setFromUnit] = useState<TemperatureUnit>('celsius');
  const [toUnit, setToUnit] = useState<TemperatureUnit>('fahrenheit');
  const [convertedValue, setConvertedValue] = useState<number>(68);
  const [selectedScale, setSelectedScale] = useState<TemperatureUnit | null>(null);
  
  useEffect(() => {
    try {
      const result = convertTemperature(value, fromUnit, toUnit);
      setConvertedValue(isNaN(result) ? 0 : parseFloat(result.toFixed(4)));
    } catch (error) {
      console.error('Conversion error:', error);
    }
  }, [value, fromUnit, toUnit]);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value === '' ? 0 : parseFloat(e.target.value);
    setValue(isNaN(newValue) ? 0 : newValue);
  };

  const handleSwapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleUnitInfo = (unit: TemperatureUnit) => {
    setSelectedScale(selectedScale === unit ? null : unit);
  };

  return (
    <div className="section-container animate-slide-in">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-gradient">Temperature Converter</h2>
          
          <Card className="light-card overflow-hidden">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="from-value">From</Label>
                    <button 
                      onClick={() => handleUnitInfo(fromUnit)}
                      className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full"
                    >
                      <Info className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Input
                      id="from-value"
                      type="number"
                      value={value || ''}
                      onChange={handleValueChange}
                      className="text-lg font-medium"
                    />
                    <Select value={fromUnit} onValueChange={(val) => setFromUnit(val as TemperatureUnit)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {(Object.keys(temperatureUnitLabels) as Array<TemperatureUnit>).map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {temperatureUnitLabels[unit]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <button 
                    onClick={handleSwapUnits}
                    className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                    aria-label="Swap units"
                  >
                    <ArrowUpDown className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="to-value">To</Label>
                    <button 
                      onClick={() => handleUnitInfo(toUnit)}
                      className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full"
                    >
                      <Info className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Input
                      id="to-value"
                      type="number"
                      value={convertedValue}
                      readOnly
                      className="text-lg font-medium bg-muted/50"
                    />
                    <Select value={toUnit} onValueChange={(val) => setToUnit(val as TemperatureUnit)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {(Object.keys(temperatureUnitLabels) as Array<TemperatureUnit>).map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {temperatureUnitLabels[unit]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              {selectedScale && (
                <div className="mt-6 animate-fade-in">
                  <ScaleInfoCard scale={selectedScale} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6 h-full">
          <h2 className="text-2xl font-semibold tracking-tight">Conversion Matrix</h2>
          <Card className="light-card h-[calc(100%-3rem)]">
            <CardContent className="p-6">
              <ConversionMatrix baseValue={value} baseUnit={fromUnit} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TemperatureConverter;
