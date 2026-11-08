import { ImagerChannelInfo, SounderChannelInfo } from '../types/satellite';

export const INSAT_IMAGER_CHANNELS: ImagerChannelInfo[] = [
  {
    id: 'vis',
    number: 1,
    name: 'Visible Channel',
    shortName: 'VIS (0.65 µm)',
    centralWavelength: 0.65,
    wavelengthBand: '0.55 – 0.75 µm',
    spatialResolutionKm: 1,
    spectralRegion: 'Visible',
    detectorType: 'Silicon Photodiode array',
    principalAbsorberOrWindow: 'Clean Solar Optical Window',
    measurementPhysicalProperty: 'Reflected solar irradiance (Albedo / Bi-directional Reflectance)',
    whatItSees: 'Cloud top geometry, cloud optical thickness, surface features, fog, snow albedo during daytime.',
    physicalPrinciple: 'Mie and Rayleigh scattering of incoming solar radiation. Thick clouds reflect 70–90% of solar photons, appearing brilliant white.',
    meteorologicalApplications: [
      'High-resolution cloud boundary mapping',
      'Cumulonimbus overshooting top identification',
      'Daytime fog, smoke, and haze detection',
      'Snow cover mapping when combined with SWIR'
    ],
    limitations: [
      'Strictly daytime only (blind during night, requires solar zenith angle < 80°)',
      'Cannot penetrate through cloud tops to observe internal precipitation'
    ],
    primaryColor: '#38bdf8' // daylight cyan
  },
  {
    id: 'swir',
    number: 2,
    name: 'Shortwave Infrared Channel',
    shortName: 'SWIR (1.62 µm)',
    centralWavelength: 1.62,
    wavelengthBand: '1.55 – 1.70 µm',
    spatialResolutionKm: 1,
    spectralRegion: 'Shortwave IR',
    detectorType: 'InGaAs (Indium Gallium Arsenide)',
    principalAbsorberOrWindow: 'Shortwave Solar Window with strong Ice Absorption',
    measurementPhysicalProperty: 'Reflected solar infrared radiation sensitive to hydrometeor phase',
    whatItSees: 'Phase discrimination: Liquid water clouds vs Glaciated ice clouds, snow vs low clouds.',
    physicalPrinciple: 'Liquid water droplets are highly reflective at 1.6 µm, while ice crystals strongly absorb 1.6 µm radiation. Snow and ice clouds appear dark, while water clouds appear bright.',
    meteorologicalApplications: [
      'Phase classification: Ice cloud vs liquid cloud top',
      'Snow cover vs cloud discrimination (solves false snow alarms in VIS)',
      'Cloud particle effective radius estimation',
      'Burn scar and active fire periphery mapping'
    ],
    limitations: [
      'Daytime solar reflection only',
      'Sensitive to sub-pixel cloud fraction'
    ],
    primaryColor: '#818cf8' // shortwave violet
  },
  {
    id: 'mir',
    number: 3,
    name: 'Middle Infrared Channel',
    shortName: 'MIR (3.90 µm)',
    centralWavelength: 3.90,
    wavelengthBand: '3.80 – 4.00 µm',
    spatialResolutionKm: 4,
    spectralRegion: 'Midwave IR',
    detectorType: 'InSb (Indium Antimonide) cooled to 95 K',
    principalAbsorberOrWindow: 'Midwave Atmospheric Window (Mixed Solar + Terrestrial)',
    measurementPhysicalProperty: 'Dual-regime: Nighttime pure thermal emission; Daytime combined solar reflection and thermal emission',
    whatItSees: 'High-temperature thermal anomalies (forest fires, gas flares), nighttime low-level stratus fog, sea surface temperature.',
    physicalPrinciple: 'By Planck’s Law, emitted radiance at 3.9 µm is proportional to T^10 to T^12 at terrestrial temperatures. A small 500 K fire inside a 4 km pixel drastically spikes the recorded brightness temperature by 20–50 K.',
    meteorologicalApplications: [
      'Forest fire and active hotspot detection',
      'Nighttime fog and low stratus discrimination (via BT11 - BT3.9)',
      'Sub-pixel cloud detection',
      'Night SST retrieval'
    ],
    limitations: [
      'Daytime solar reflection contaminates thermal emission',
      'Extreme solar glint over calm ocean surfaces during morning and late afternoon'
    ],
    primaryColor: '#f59e0b' // flame amber
  },
  {
    id: 'wv',
    number: 4,
    name: 'Water Vapour Channel',
    shortName: 'WV (6.80 µm)',
    centralWavelength: 6.80,
    wavelengthBand: '6.50 – 7.10 µm',
    spatialResolutionKm: 8,
    spectralRegion: 'Water Vapour',
    detectorType: 'MCT (Mercury Cadmium Telluride) cooled to 95 K',
    principalAbsorberOrWindow: 'Strong ν2 Vibration-Rotation H2O Absorption Band',
    measurementPhysicalProperty: 'Radiation emitted by mid-to-upper tropospheric water vapor (300 to 600 hPa)',
    whatItSees: 'Upper-tropospheric jet streams, synoptic troughs, dry air subsidence intrusions, atmospheric vorticity, even in completely cloud-free air!',
    physicalPrinciple: 'The atmosphere is optically opaque to 6.8 µm radiation at the surface. Radiation emitted by the ground is 100% absorbed by water vapor. The satellite only sees photons emitted by the highest moist layer (typically 5 to 10 km altitude).',
    meteorologicalApplications: [
      'Upper-level wind tracking via Atmospheric Motion Vectors (AMV)',
      'Jet streak core and shear zone detection',
      'Dry intrusion tracking into tropical cyclones',
      'Upper Tropospheric Humidity (UTH) retrieval'
    ],
    limitations: [
      'Completely blind to the surface and lower boundary layer',
      'Coarser 8 km resolution due to lower photon energy flux'
    ],
    primaryColor: '#14b8a6' // tropospheric teal
  },
  {
    id: 'tir1',
    number: 5,
    name: 'Thermal Infrared Channel 1',
    shortName: 'TIR-1 (10.80 µm)',
    centralWavelength: 10.80,
    wavelengthBand: '10.20 – 11.30 µm',
    spatialResolutionKm: 4,
    spectralRegion: 'Thermal IR',
    detectorType: 'MCT Photoconductive cooled to 95 K',
    principalAbsorberOrWindow: 'Primary Clean Atmospheric Infrared Window',
    measurementPhysicalProperty: 'Direct terrestrial and cloud-top thermal emission (Planck radiance)',
    whatItSees: 'Cloud-top temperature, deep convective cloud anvils, cyclones, land and sea surface temperatures day and night.',
    physicalPrinciple: 'Gases in the atmosphere are largely transparent between 10 and 11 µm. The sensor measures radiation escaping from the highest opaque radiating boundary. Cold cloud tops appear as cold brightness temperatures (200–240 K); warm ground appears at 290–320 K.',
    meteorologicalApplications: [
      'Quantitative Precipitation Estimation (GPI, IMSRA, HEM)',
      'Tropical cyclone intensity estimation (Dvorak technique)',
      'Outgoing Longwave Radiation (OLR) retrieval',
      'Continuous 24-hour cloud tracking and monitoring'
    ],
    limitations: [
      'Cold brightness temperature indicates high cloud top, NOT guaranteed surface rain (e.g. thin cirrus trap)',
      'Sub-cloud rain cannot be seen directly'
    ],
    primaryColor: '#ec4899' // thermal magenta
  },
  {
    id: 'tir2',
    number: 6,
    name: 'Thermal Infrared Channel 2 (Split Window)',
    shortName: 'TIR-2 (12.00 µm)',
    centralWavelength: 12.00,
    wavelengthBand: '11.50 – 12.50 µm',
    spatialResolutionKm: 4,
    spectralRegion: 'Thermal IR',
    detectorType: 'MCT Photoconductive cooled to 95 K',
    principalAbsorberOrWindow: 'Split-Window Atmospheric Infrared Window (moderate H2O continuum absorption)',
    measurementPhysicalProperty: 'Thermal emission with enhanced water vapor continuum absorption relative to 10.8 µm',
    whatItSees: 'Same surface/cloud scenes as TIR-1, but with 1 to 4 K greater cooling due to atmospheric water vapor absorption.',
    physicalPrinciple: 'Water vapor absorbs 12.0 µm more strongly than 10.8 µm. The difference (BT10.8 - BT12.0) directly isolates the intervening column water vapor and differentiates thin cirrus from low clouds.',
    meteorologicalApplications: [
      'Split-window atmospheric moisture correction for accurate Sea Surface Temperature (SST)',
      'Thin cirrus cloud masking and optical thickness estimation',
      'Volcanic ash and mineral dust discrimination',
      'Land Surface Temperature (LST) dual-angle/split-window retrieval'
    ],
    limitations: [
      'Lower signal-to-noise ratio in extremely cold convective scenes (< 200 K)'
    ],
    primaryColor: '#a855f7' // split-window purple
  }
];

export const INSAT_SOUNDER_CHANNELS: SounderChannelInfo[] = [
  { number: 1, centralWavelengthMicrons: 14.67, centralWavenumberCm: 682, bandwidthCm: 18, band: 'Longwave', principalAbsorbingGas: 'CO2', targetLayer: 'Stratosphere (~30 hPa)', purpose: 'Stratosphere temperature sounding', peakWeightingPressureHpa: 30 },
  { number: 2, centralWavelengthMicrons: 14.31, centralWavenumberCm: 699, bandwidthCm: 15, band: 'Longwave', principalAbsorbingGas: 'CO2', targetLayer: 'Tropopause (~100 hPa)', purpose: 'Tropopause temperature', peakWeightingPressureHpa: 100 },
  { number: 3, centralWavelengthMicrons: 14.03, centralWavenumberCm: 713, bandwidthCm: 16, band: 'Longwave', principalAbsorbingGas: 'CO2', targetLayer: 'Upper Troposphere (~250 hPa)', purpose: 'Upper-level temperature', peakWeightingPressureHpa: 250 },
  { number: 4, centralWavelengthMicrons: 13.64, centralWavenumberCm: 733, bandwidthCm: 19, band: 'Longwave', principalAbsorbingGas: 'CO2', targetLayer: 'Mid Troposphere (~500 hPa)', purpose: 'Mid-level temperature', peakWeightingPressureHpa: 500 },
  { number: 5, centralWavelengthMicrons: 13.33, centralWavenumberCm: 750, bandwidthCm: 20, band: 'Longwave', principalAbsorbingGas: 'CO2', targetLayer: 'Lower Troposphere (~700 hPa)', purpose: 'Low-level temperature', peakWeightingPressureHpa: 700 },
  { number: 6, centralWavelengthMicrons: 12.59, centralWavenumberCm: 794, bandwidthCm: 34, band: 'Longwave', principalAbsorbingGas: 'H2O', targetLayer: 'Total Column', purpose: 'Total Precipitable Water (TPW)', peakWeightingPressureHpa: 850 },
  { number: 7, centralWavelengthMicrons: 11.98, centralWavenumberCm: 834, bandwidthCm: 53, band: 'Longwave', principalAbsorbingGas: 'H2O', targetLayer: 'Boundary Layer / Surface', purpose: 'Surface temp & moisture correction', peakWeightingPressureHpa: 950 },
  { number: 8, centralWavelengthMicrons: 10.99, centralWavenumberCm: 910, bandwidthCm: 51, band: 'Midwave', principalAbsorbingGas: 'Window', targetLayer: 'Surface', purpose: 'Clean Surface Window Temperature', peakWeightingPressureHpa: 1013 },
  { number: 9, centralWavelengthMicrons: 9.69, centralWavenumberCm: 1032, bandwidthCm: 28, band: 'Midwave', principalAbsorbingGas: 'O3', targetLayer: 'Ozone Layer (~25 km)', purpose: 'Total Column Ozone retrieval', peakWeightingPressureHpa: 50 },
  { number: 10, centralWavelengthMicrons: 7.43, centralWavenumberCm: 1346, bandwidthCm: 54, band: 'Midwave', principalAbsorbingGas: 'H2O', targetLayer: 'Lower-Mid Troposphere (~700 hPa)', purpose: 'Low-level moisture sounding', peakWeightingPressureHpa: 700 },
  { number: 11, centralWavelengthMicrons: 7.04, centralWavenumberCm: 1421, bandwidthCm: 86, band: 'Midwave', principalAbsorbingGas: 'H2O', targetLayer: 'Mid Troposphere (~500 hPa)', purpose: 'Mid-level moisture sounding', peakWeightingPressureHpa: 500 },
  { number: 12, centralWavelengthMicrons: 6.52, centralWavenumberCm: 1534, bandwidthCm: 63, band: 'Midwave', principalAbsorbingGas: 'H2O', targetLayer: 'Upper Troposphere (~300 hPa)', purpose: 'Upper-level moisture sounding', peakWeightingPressureHpa: 300 },
  { number: 13, centralWavelengthMicrons: 4.61, centralWavenumberCm: 2168, bandwidthCm: 25, band: 'Shortwave', principalAbsorbingGas: 'N2O', targetLayer: 'Lower Troposphere (~850 hPa)', purpose: 'Low-level temperature sounding', peakWeightingPressureHpa: 850 },
  { number: 14, centralWavelengthMicrons: 4.54, centralWavenumberCm: 2202, bandwidthCm: 26, band: 'Shortwave', principalAbsorbingGas: 'N2O', targetLayer: 'Mid Troposphere (~600 hPa)', purpose: 'Mid-level temperature sounding', peakWeightingPressureHpa: 600 },
  { number: 15, centralWavelengthMicrons: 4.48, centralWavenumberCm: 2232, bandwidthCm: 28, band: 'Shortwave', principalAbsorbingGas: 'CO2', targetLayer: 'Upper Troposphere (~350 hPa)', purpose: 'Upper-level temperature sounding', peakWeightingPressureHpa: 350 },
  { number: 16, centralWavelengthMicrons: 4.15, centralWavenumberCm: 2408, bandwidthCm: 45, band: 'Shortwave', principalAbsorbingGas: 'CO2', targetLayer: 'Boundary Layer (~900 hPa)', purpose: 'Boundary layer temperature', peakWeightingPressureHpa: 900 },
  { number: 17, centralWavelengthMicrons: 4.01, centralWavenumberCm: 2496, bandwidthCm: 46, band: 'Shortwave', principalAbsorbingGas: 'Window', targetLayer: 'Surface', purpose: 'Shortwave surface temperature', peakWeightingPressureHpa: 1013 },
  { number: 18, centralWavelengthMicrons: 3.79, centralWavenumberCm: 2642, bandwidthCm: 100, band: 'Shortwave', principalAbsorbingGas: 'Window', targetLayer: 'Surface / Low moisture', purpose: 'Surface temp and moisture correction', peakWeightingPressureHpa: 1013 },
  { number: 19, centralWavelengthMicrons: 0.69, centralWavenumberCm: 14500, bandwidthCm: 1000, band: 'Visible', principalAbsorbingGas: 'Window', targetLayer: 'Cloud / Surface', purpose: 'Daytime cloud detection & albedo reference', peakWeightingPressureHpa: 1013 }
];
