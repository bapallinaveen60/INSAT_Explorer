export interface ImagerChannelInfo {
  id: string;
  number: number;
  name: string;
  shortName: string;
  centralWavelength: number; // in µm
  wavelengthBand: string; // e.g. "0.55 - 0.75 µm"
  spatialResolutionKm: number; // 1, 4, or 8 km
  spectralRegion: 'Visible' | 'Shortwave IR' | 'Midwave IR' | 'Water Vapour' | 'Thermal IR';
  detectorType: string;
  principalAbsorberOrWindow: string;
  measurementPhysicalProperty: string;
  whatItSees: string;
  physicalPrinciple: string;
  meteorologicalApplications: string[];
  limitations: string[];
  primaryColor: string; // Hex color for telemetry styling
}

export interface SounderChannelInfo {
  number: number;
  centralWavelengthMicrons: number;
  centralWavenumberCm: number;
  bandwidthCm: number;
  band: 'Longwave' | 'Midwave' | 'Shortwave' | 'Visible';
  principalAbsorbingGas: string;
  targetLayer: string;
  purpose: string;
  peakWeightingPressureHpa: number; // For vertical weighting function visualization
}

export interface PixelInspectionData {
  lat: number;
  lon: number;
  surfaceType: 'Ocean' | 'Land' | 'Desert' | 'Snow' | 'Dense Cloud';
  visReflectance: number; // % (0 - 100)
  swirReflectance: number; // % (0 - 100)
  mirTempK: number; // Kelvin
  wvTempK: number; // Kelvin
  tir1TempK: number; // Kelvin (10.8 µm)
  tir2TempK: number; // Kelvin (12.0 µm)
  splitWindowDiff: number; // tir1 - tir2
  cloudMaskClassification: 'Clear' | 'Thin Cirrus' | 'Low Fog' | 'Deep Convection' | 'Uncertain';
  retrievedRainRateMmHr: number;
  retrievedOlrWm2: number;
}
