"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  calculateHeatTransfer,
  materialConductivity,
  TemperatureUnit,
  convertTemperature
} from '@/utils/temperatureUtils';
import { ArrowRight, Beaker, Droplets, Ruler } from "lucide-react";

const HeatTransferCalculator: React.FC = () => {
  const [material, setMaterial] = useState<string>('aluminum');
  const [area, setArea] = useState<number>(1); // m²
  const [thickness, setThickness] = useState<number>(0.01); // m
  const [hotTemp, setHotTemp] = useState<number>(100); // °C
  const [coldTemp, setColdTemp] = useState<number>(20); // °C
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>('celsius');
  const [heatTransfer, setHeatTransfer] = useState<number>(0); // Watts
  
  useEffect(() => {
    // Convert temperatures to Celsius for calculation
    const hotTempCelsius = temperatureUnit === 'celsius' 
      ? hotTemp 
      : convertTemperature(hotTemp, temperatureUnit, 'celsius');
    
    const coldTempCelsius = temperatureUnit === 'celsius' 
      ? coldTemp 
      : convertTemperature(coldTemp, temperatureUnit, 'celsius');
    
    const result = calculateHeatTransfer({
      conductivity: materialConductivity[material],
      area,
      thickness,
      tempHot: hotTempCelsius,
      tempCold: coldTempCelsius
    });
    
    setHeatTransfer(parseFloat(result.toFixed(2)));
  }, [material, area, thickness, hotTemp, coldTemp, temperatureUnit]);

  const materials = Object.keys(materialConductivity);
  
  const handleAreaChange = (value: number[]) => {
    setArea(value[0]);
  };
  
  const handleThicknessChange = (value: number[]) => {
    setThickness(value[0]);
  };

  const handleTempUnitChange = (newUnit: TemperatureUnit) => {
    // Convert current temperatures to the new unit
    const newHotTemp = convertTemperature(hotTemp, temperatureUnit, newUnit);
    const newColdTemp = convertTemperature(coldTemp, temperatureUnit, newUnit);
    
    setTemperatureUnit(newUnit);
    setHotTemp(parseFloat(newHotTemp.toFixed(2)));
    setColdTemp(parseFloat(newColdTemp.toFixed(2)));
  };

  const formatArea = (value: number) => {
    return `${value.toFixed(2)} m²`;
  };
  
  const formatThickness = (value: number) => {
    if (value < 0.01) return `${(value * 1000).toFixed(2)} mm`;
    return `${value.toFixed(2)} m`;
  };

  return (
    <div className="section-container animate-slide-in">
      <div className="space-y-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold tracking-tight text-gradient">Heat Transfer Calculator</h2>
        
        <Card className="light-card overflow-hidden">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Beaker className="h-4 w-4 text-primary" />
                    <Label>Material</Label>
                  </div>
                  <Select value={material} onValueChange={setMaterial}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select material" />
                    </SelectTrigger>
                    <SelectContent>
                      {materials.map((mat) => (
                        <SelectItem key={mat} value={mat} className="capitalize">
                          {mat.charAt(0).toUpperCase() + mat.slice(1)} 
                          ({materialConductivity[mat]} W/(m·K))
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Ruler className="h-4 w-4 text-primary" />
                      <Label>Cross-sectional Area</Label>
                    </div>
                    <span className="text-sm text-muted-foreground">{formatArea(area)}</span>
                  </div>
                  <Slider 
                    value={[area]} 
                    min={0.01} 
                    max={5} 
                    step={0.01} 
                    onValueChange={handleAreaChange} 
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Ruler className="h-4 w-4 text-primary rotate-90" />
                      <Label>Material Thickness</Label>
                    </div>
                    <span className="text-sm text-muted-foreground">{formatThickness(thickness)}</span>
                  </div>
                  <Slider 
                    value={[thickness]} 
                    min={0.001} 
                    max={0.1} 
                    step={0.001} 
                    onValueChange={handleThicknessChange} 
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-red-500" />
                    <Label htmlFor="hot-temp">Hot Side Temperature</Label>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      id="hot-temp"
                      type="number"
                      value={hotTemp}
                      onChange={(e) => setHotTemp(parseFloat(e.target.value) || 0)}
                    />
                    <Select value={temperatureUnit} onValueChange={(val) => handleTempUnitChange(val as TemperatureUnit)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="celsius">°C</SelectItem>
                        <SelectItem value="fahrenheit">°F</SelectItem>
                        <SelectItem value="kelvin">K</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <Label htmlFor="cold-temp">Cold Side Temperature</Label>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      id="cold-temp"
                      type="number"
                      value={coldTemp}
                      onChange={(e) => setColdTemp(parseFloat(e.target.value) || 0)}
                    />
                    <div className="text-muted-foreground p-2 flex items-center justify-center bg-muted/30 rounded border">
                      {temperatureUnit === 'celsius' ? '°C' : temperatureUnit === 'fahrenheit' ? '°F' : 'K'}
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/40 p-4 rounded-lg space-y-2 mt-4">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <ArrowRight className="h-4 w-4" /> 
                    Heat Transfer Rate
                  </h3>
                  <div className="text-2xl font-bold font-mono text-gradient">
                    {heatTransfer} W
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Based on {material}&apos;s thermal conductivity of {materialConductivity[material]} W/(m·K)
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="light-card overflow-hidden">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-3">About Heat Transfer</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Heat transfer through conduction occurs when thermal energy moves through a material from a higher temperature region to a lower temperature region. This calculation uses Fourier&apos;s Law of heat conduction:
            </p>
            
            <div className="bg-muted/30 p-3 rounded font-mono text-sm my-3">
              Q = k × A × (T<sub>hot</sub> - T<sub>cold</sub>) / L
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Where:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Q = Heat transfer rate (W)</li>
                  <li>k = Thermal conductivity (W/(m·K))</li>
                  <li>A = Cross-sectional area (m²)</li>
                  <li>L = Material thickness (m)</li>
                  <li>T = Temperature (°C, K)</li>
                </ul>
              </div>
              <div>
                <p><strong>Examples:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Copper has high conductivity (385 W/(m·K))</li>
                  <li>Wood has low conductivity (0.13 W/(m·K))</li>
                  <li>Air is a good insulator (0.026 W/(m·K))</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HeatTransferCalculator;
