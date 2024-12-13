"use client";
import React, { useState } from 'react';
import Header from '@/components/Header';
import TemperatureConverter from '@/components/TemperatureConverter';
import HeatTransferCalculator from '@/components/HeatTransferCalculator';
import TemperatureVisualizer from '@/components/TemperatureVisualizer';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<string>('converter');

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab={activeTab} onChange={setActiveTab} />
      
      <main className="pt-24 pb-12">
        {activeTab === 'converter' && <TemperatureConverter />}
        {activeTab === 'physics' && <HeatTransferCalculator />}
        {activeTab === 'visualizer' && <TemperatureVisualizer />}
      </main>
      
      <footer className="border-t subtle-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-center text-muted-foreground">
            ThermoVerse — A sophisticated tool for temperature calculations, physics simulations, and visualizations
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
