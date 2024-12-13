
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Thermometer, BarChart3, FlaskConical } from "lucide-react";
import { ThemeTogglerButton } from './ThemeTogglerProvider';

interface HeaderProps {
  activeTab: string;
  onChange: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onChange }) => {
  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b subtle-border py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center flex flex-col gap-2 justify-between items-center sm:flex-row">
          <div className="flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-medium tracking-tight text-gradient">ThermoVerse</h1>
          </div>
          
          <div className="flex-grow flex justify-center">
            <Tabs value={activeTab} onValueChange={onChange} className="w-full max-w-md">
              <TabsList className="w-full bg-secondary/80 p-1">
                <TabsTrigger 
                  value="converter" 
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-primary data-[state=active]:shadow-sm flex-1 py-2 transition-all"
                >
                  <Thermometer className="w-4 h-4 sm:mr-2 mx-1.5 sm:m-0" />
                  <span className="hidden sm:inline">Converter</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="physics" 
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-primary data-[state=active]:shadow-sm flex-1 py-2 transition-all"
                >
                  <FlaskConical className="w-4 h-4 sm:mr-2 mx-1.5 sm:m-0" />
                  <span className="hidden sm:inline">Physics</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="visualizer" 
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-primary data-[state=active]:shadow-sm flex-1 py-2 transition-all"
                >
                  <BarChart3 className="w-4 h-4 sm:mr-2 mx-1.5 sm:m-0" />
                  <span className="hidden sm:inline">Visualizer</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="flex w-fit items-center">
            {/* Future toggles or user options could go here */}
          </div>
        </div>
      </div>
            <ThemeTogglerButton />
    </header>
  );
};

export default Header;
