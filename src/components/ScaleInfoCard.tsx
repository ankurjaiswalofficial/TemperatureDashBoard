
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TemperatureUnit, temperatureScaleInfo, temperatureUnitLabels } from '@/utils/temperatureUtils';

interface ScaleInfoCardProps {
  scale: TemperatureUnit;
}

const ScaleInfoCard: React.FC<ScaleInfoCardProps> = ({ scale }) => {
  const info = temperatureScaleInfo[scale];
  
  return (
    <Card className="bg-muted/30 border-muted/50 overflow-hidden">
      <CardContent className="p-4">
        <h3 className="font-medium text-md mb-2">{temperatureUnitLabels[scale]}</h3>
        <p className="text-sm text-muted-foreground mb-3">{info.description}</p>
        
        <div className="space-y-1">
          <h4 className="text-xs uppercase tracking-wide text-muted-foreground">Reference Points</h4>
          <ul className="text-sm space-y-1 pl-4">
            {info.referencePoints.map((point, index) => (
              <li key={index} className="list-disc list-outside">{point}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScaleInfoCard;
