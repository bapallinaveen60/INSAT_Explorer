import { CourseChapter } from '../types/course';

export const COURSE_CHAPTERS: CourseChapter[] = [
  // =========================================================================
  // CHAPTER 01: The Geostationary Eye at 36,000 Kilometres
  // =========================================================================
  {
    id: 1,
    slug: 'eye-at-36000-km',
    numberString: '01',
    title: 'The Geostationary Eye at 36,000 Kilometres!!!',
    subtitle: 'How do you watch an entire subcontinent breathe, when you are ten times farther away than the International Space Station?',
    pages: [
      {
        id: '1.1',
        pageIndex: 1,
        chapterIndex: 1,
        headerBarBadge: 'How This Guide Works',
        badgeColor: 'blue',
        title: 'Two Eyes, One Atmosphere',
        subtitle: 'Why satellite meteorology is not photography — it is an inverse problem.',
        sections: [
          {
            stepNumber: 1,
            leadParagraph: 'Every page in this guide has a single header bar above, telling you exactly which concept the page is about. Inside, follow the circled numbers in order. They build progressively from simple physical intuition to exact mathematical retrieval equations.',
          },
          {
            stepNumber: 2,
            leadParagraph: 'Two characters will debate their way through every satellite puzzle. Meet them now, because the entire science lives in the gap between what they each know:',
            dialogue: [
              {
                speaker: 'ray',
                text: "I am Ray — an electromagnetic photon packet! I was born at the surface of the warm Arabian Sea, got scattered by water droplets inside a monsoon cloud, and escaped from an ice crystal anvil at 14 kilometres altitude. I know exactly what I am: 10.8 micrometres wavelength, and I know the exact temperature of the particle that sent me. Ask me anything."
              },
              {
                speaker: 'insat',
                text: "I am INSAT-3D — the geostationary observatory perched 35,786 kilometres in space at 74°E longitude. I know none of that. I know exactly one number: how many digitized counts (0 to 1023) my scan mirror focused onto my cooled detectors. Everything else — cloud height, wind speed, whether it is raining on Mumbai — I have to calculate through inverse physics."
              }
            ]
          },
          {
            stepNumber: 3,
            leadParagraph: 'Three special markers you will encounter on this journey:',
            splatInsight: {
              level: 'SPLAT!!!',
              summary: 'SPLAT!!! marks the moment a physical insight clicks. TERMINOLOGY ALERT boxes warn you when atmospheric scientists and satellite engineers use the same word to mean two completely different things. And purple boxes are live physics simulators where you can grab the controls yourself.'
            }
          }
        ]
      },
      {
        id: '1.2',
        pageIndex: 2,
        chapterIndex: 1,
        headerBarBadge: 'Measuring Weather: Main Ideas',
        badgeColor: 'blue',
        title: 'The Geostationary Perch',
        subtitle: 'Why sit at 35,786 km instead of orbiting close to Earth?',
        sections: [
          {
            stepNumber: 4,
            dialogue: [
              {
                speaker: 'ray',
                text: "Hang on, INSAT. Why are you all the way out at 36,000 kilometres? Weather satellites in Low Earth Orbit (LEO) fly at 400 to 800 km. They are much closer, have crisper pixels, and need smaller mirrors!"
              },
              {
                speaker: 'insat',
                text: "That works for a quick snapshot, Ray. But a polar satellite in LEO takes only 10 minutes to cross India, and then it's gone for the next 12 hours. A tropical thunderstorm can explode, dump 100 mm of flood water, and dissipate in just 90 minutes. In LEO, you miss the entire drama. I stay locked directly above India forever."
              }
            ]
          },
          {
            stepNumber: 5,
            leadParagraph: 'Kepler’s Third Law dictates that orbital period increases with distance from Earth:',
            formulas: [
              {
                label: 'Orbital Period Balance',
                math: 'T = 2\\pi \\sqrt{\\frac{r^3}{G M_{\\oplus}}} = 86,164.1\\text{ seconds} \\approx 23\\text{h } 56\\text{m } 4\\text{s}',
                explanation: 'At exactly r = 42,164 km from Earth center (altitude 35,786 km), the orbital period matches Earth sidereal day.'
              }
            ]
          },
          {
            stepNumber: 6,
            leadParagraph: 'Because INSAT orbits the equator at the exact same rotational speed as the Earth beneath it, the satellite appears completely stationary in the sky over India. A dish on the ground in New Delhi or Chennai never has to move its motors to track it.',
            splatInsight: {
              level: 'SPLAT!!!',
              summary: 'Geostationary orbit trades spatial resolution for temporal continuity. What we lose in pixel sharpness (4 km vs 250 m), we gain in a continuous movie of the atmosphere every 30 minutes, 24 hours a day, 365 days a year.'
            }
          }
        ]
      },
      {
        id: '1.3',
        pageIndex: 3,
        chapterIndex: 1,
        headerBarBadge: 'Now You Try It: Geostationary Orbit Simulator',
        badgeColor: 'purple',
        title: 'Simulating Geostationary vs LEO Orbits',
        subtitle: 'Drag the timeline to see why polar satellites miss thunderstorms that INSAT tracks continuously.',
        isSimulatorPage: true,
        sections: [
          {
            stepNumber: 7,
            leadParagraph: 'Experiment with the orbital mechanics below. Notice how the LEO satellite rushes past India while INSAT remains glued to 74°E longitude.',
            simulatorId: 'orbit-geometry'
          }
        ]
      },
      {
        id: '1.4',
        pageIndex: 4,
        chapterIndex: 1,
        headerBarBadge: 'Viewing Geometry: Details Part 1',
        badgeColor: 'blue',
        title: 'The Slant Path and Limb Darkening',
        subtitle: 'Looking down is not the same as looking sideways.',
        sections: [
          {
            stepNumber: 8,
            leadParagraph: 'At nadir (directly below the satellite at the equator and 74°E), INSAT looks straight down through one atmospheric thickness (1.0 airmass). But as you look toward the Himalayas, Central Asia, or the southern Indian Ocean, the satellite beam strikes Earth at an oblique Satellite Zenith Angle (θ).',
            formulas: [
              {
                label: 'Slant Atmospheric Path Length',
                math: 's(\\theta) = \\frac{H}{\\cos\\theta} = H \\sec\\theta',
                explanation: 'As zenith angle theta increases toward the edge of the disk, the ray must travel through up to 3 times more atmosphere!'
              }
            ]
          },
          {
            stepNumber: 9,
            dataTrap: {
              title: 'The Limb Darkening / Cooling Trap',
              description: 'Because rays at the edge of the disk pass through more absorbing gas (water vapor and ozone), brightness temperatures appear several degrees colder than at nadir. Without geometric atmospheric path correction, a clear ocean pixel near the limb can easily be misclassified as a cold cloud!'
            }
          },
          {
            stepNumber: 10,
            terminologyAlert: {
              term: 'Level-1B vs Level-2 Geophysical Products',
              definition: 'Level-1B is calibrated, geolocated raw radiance or brightness temperature (what the satellite directly observed). Level-2 is the derived geophysical property (Rain rate, Sea Surface Temperature, Cloud Mask, Ozone) retrieved by running algorithms.',
              pitfall: 'Never treat Level-2 rain rate as a physical measurement like a rain gauge! It is an algorithmic inference that carries assumptions and model uncertainties.'
            }
          }
        ],
        selfCheck: {
          id: 'sc-1.4',
          question: 'Why does INSAT-3D fly in a geostationary orbit rather than a sun-synchronous Low Earth Orbit (LEO)?',
          options: [
            {
              id: 'A',
              text: 'A geostationary orbit remains fixed over the Indian subcontinent, enabling continuous 30-minute sampling to capture the full life cycle of rapid convective storms and diurnal monsoon cycles.',
              isCorrect: true,
              explanation: 'Tropical convective clouds can develop, precipitate, and dissipate within 1 to 2 hours. A polar LEO satellite passes over a given location only twice per day, missing most convective events. Geostationary orbit provides the temporal continuity essential for nowcasting.'
            },
            {
              id: 'B',
              text: 'A geostationary orbit is much closer to Earth, allowing the camera to achieve sub-metre spatial resolution.',
              isCorrect: false,
              explanation: 'Actually, geostationary orbit is at 35,786 km — almost 100 times farther than LEO (400 km). Because of the vast distance, spatial resolution is coarser (1 to 8 km), not higher.'
            },
            {
              id: 'C',
              text: 'A geostationary orbit avoids all atmospheric absorption because it operates outside the solar wind.',
              isCorrect: false,
              explanation: 'Atmospheric absorption happens inside the Earth atmosphere (below 50 km) through which photons travel before reaching any satellite, regardless of orbit.'
            },
            {
              id: 'D',
              text: 'A geostationary orbit eliminates the need to calibrate the radiometer sensors.',
              isCorrect: false,
              explanation: 'Sensors degrade continuously in space due to UV and cosmic radiation; onboard blackbody targets and space looks are required for continuous radiometric calibration.'
            }
          ],
          conceptualTakeaway: 'Geostationary orbit trades spatial resolution for unmatched 24-hour temporal continuity over the Indian Ocean region.'
        }
      }
    ]
  },

  // =========================================================================
  // CHAPTER 02: Six Colours of Invisible Light (The VHRR Imager)
  // =========================================================================
  {
    id: 2,
    slug: 'six-colours-of-invisible-light',
    numberString: '02',
    title: 'Six Colours of Invisible Light!!!',
    subtitle: 'Why one camera is not enough to photograph an entire atmosphere.',
    pages: [
      {
        id: '2.1',
        pageIndex: 1,
        chapterIndex: 2,
        headerBarBadge: 'The Imager Payload: Main Ideas',
        badgeColor: 'teal',
        title: 'The Six Channels of INSAT-3D VHRR',
        subtitle: 'Documented sensor architecture from the official ATBD Table 1.',
        sections: [
          {
            stepNumber: 1,
            leadParagraph: 'The INSAT-3D Very High Resolution Radiometer (VHRR) splits incoming radiation into six distinct spectral channels. Each channel answers a different meteorological question:',
            bulletPoints: [
              '1. VIS (0.55–0.75 µm, 1 km): What does the cloud look like in reflected sunlight?',
              '2. SWIR (1.55–1.70 µm, 1 km): Is the cloud made of liquid water droplets or frozen ice crystals?',
              '3. MIR (3.8–4.0 µm, 4 km): Is there a hot forest fire, or low night fog?',
              '4. WV (6.5–7.1 µm, 8 km): Where are the swirling moisture rivers in the upper troposphere?',
              '5. TIR-1 (10.2–11.3 µm, 4 km): How cold is the top of the cloud, and how warm is the sea?',
              '6. TIR-2 (11.5–12.5 µm, 4 km): How much water vapor is obscuring the view?'
            ]
          },
          {
            stepNumber: 2,
            dialogue: [
              {
                speaker: 'ray',
                text: "Notice my wavelengths, INSAT! My visible channel is tiny — only 0.65 micrometres, just like human eyesight. But my thermal infrared channel (10.8 µm) is seventeen times longer! Why do you need both?"
              },
              {
                speaker: 'insat',
                text: "Because at 0.65 µm, the Sun is the flashlight — I only see what the Sun illuminates. When nighttime falls over India, your visible channel goes completely pitch black! But at 10.8 µm, Earth and clouds are their own flashlights. They glow continuously with thermal heat day and night."
              }
            ]
          },
          {
            stepNumber: 3,
            splatInsight: {
              level: 'SPLAT!!!',
              summary: 'Visible channels see reflected solar photons (albedo). Thermal infrared channels see emitted terrestrial photons (temperature). Combining them lets us track weather 24 hours a day.'
            }
          }
        ]
      },
      {
        id: '2.2',
        pageIndex: 2,
        chapterIndex: 2,
        headerBarBadge: 'Phase & Clouds: Details Part 1',
        badgeColor: 'teal',
        title: 'The SWIR Trick: Ice vs Water',
        subtitle: 'Why snow and ice clouds appear black in shortwave infrared.',
        sections: [
          {
            stepNumber: 4,
            leadParagraph: 'In visible imagery (0.65 µm), both high cirrus ice clouds and low stratus water clouds reflect sunlight vigorously. They both appear bright white. Snow on the Himalayan peaks also appears bright white! How can an algorithm tell them apart?',
            bulletPoints: [
              'Liquid water droplets have very low absorption at 1.6 µm, reflecting sunlight brightly.',
              'Ice crystals strongly absorb 1.6 µm radiation, appearing dark or near-black in SWIR imagery.',
              'Snow on the ground has large ice grains that absorb SWIR photons completely.'
            ]
          },
          {
            stepNumber: 5,
            terminologyAlert: {
              term: 'Normalized Difference Snow Index (NDSI)',
              definition: 'NDSI = (VIS - SWIR) / (VIS + SWIR). Because snow is bright in VIS and dark in SWIR, NDSI > 0.4 clearly isolates snow from water clouds.',
              pitfall: 'Do not confuse snow with ice clouds: ice clouds also have low SWIR, but their thermal IR brightness temperature is far colder (< 230 K) than surface snow.'
            }
          }
        ]
      },
      {
        id: '2.3',
        pageIndex: 3,
        chapterIndex: 2,
        headerBarBadge: 'The 3.9 µm Enigma: Details Part 2',
        badgeColor: 'amber',
        title: 'The Dual Nature of Middle Infrared (MIR)',
        subtitle: 'The channel that changes its physical identity when the Sun sets.',
        sections: [
          {
            stepNumber: 6,
            leadParagraph: 'The 3.9 µm channel sits in a unique spectral boundary where solar reflected energy and Earth thermal emission are of comparable magnitude:',
            formulas: [
              {
                label: 'Daytime MIR Radiance Balance',
                math: 'L_{3.9}^{\\text{total}} = \\epsilon_{3.9} B_{3.9}(T_{\\text{sfc}}) + \\rho_{3.9} \\frac{F_{\\odot, 3.9}}{\\pi} \\cos\\theta_0',
                explanation: 'Total radiance is the sum of emitted thermal energy (left) and reflected solar energy (right).'
              }
            ]
          },
          {
            stepNumber: 7,
            dataTrap: {
              title: 'The Daytime Fire False Alarm / Solar Glint Trap',
              description: 'During daytime, solar specular reflection off calm lakes or ocean surfaces (sun glint) adds huge radiance to the 3.9 µm detector, driving apparent brightness temperatures above 330 K! Operational fire detection algorithms must verify against TIR-1 (10.8 µm) to avoid declaring the ocean to be on fire.'
            }
          }
        ]
      },
      {
        id: '2.4',
        pageIndex: 4,
        chapterIndex: 2,
        headerBarBadge: 'Now You Try It: Six-Channel Sandbox',
        badgeColor: 'purple',
        title: 'Interactive Multi-Channel Laboratory',
        subtitle: 'Slide between channels, inspect simulated pixel radiances, and test guided experiments.',
        isSimulatorPage: true,
        sections: [
          {
            stepNumber: 8,
            leadParagraph: 'Use the interactive comparison tool below to inspect the 6 VHRR channels over the Indian subcontinent. Probe different cloud and surface types to see their multi-spectral signatures.',
            simulatorId: 'six-channel-sandbox'
          }
        ],
        selfCheck: {
          id: 'sc-2.4',
          question: 'Why does the 6.8 µm Water Vapour channel show detailed swirls and jet stream features over India even when the visible channel shows completely cloud-free clear skies?',
          options: [
            {
              id: 'A',
              text: 'Because 6.8 µm is strongly absorbed by water vapor molecules in the gas phase; radiation from the ground is blocked, so the satellite measures thermal emission from mid-to-upper tropospheric moisture (300 to 600 hPa).',
              isCorrect: true,
              explanation: 'Water vapor is an invisible gas in visible light, but an active thermal emitter at 6.8 µm. The mid-to-upper troposphere emits radiation that reveals dry sinking air (warm dark areas) and moist rising air (cold bright areas) even in clear skies.'
            },
            {
              id: 'B',
              text: 'Because 6.8 µm penetrates deep into the Earth crust to map underground aquifers.',
              isCorrect: false,
              explanation: 'Infrared radiation does not penetrate soil or rock. Furthermore, 6.8 µm cannot even reach the Earth surface through the atmosphere.'
            },
            {
              id: 'C',
              text: 'Because water vapor channel is an active radar pulse that reflects off ocean spray.',
              isCorrect: false,
              explanation: 'The VHRR is a passive radiometer, not an active radar; it transmits no pulse.'
            },
            {
              id: 'D',
              text: 'Because dust particles from the Thar desert emit exclusively at 6.8 µm.',
              isCorrect: false,
              explanation: 'Mineral dust absorbs across thermal IR bands, but 6.8 µm is dominated by the fundamental ν2 vibration-rotation band of the H2O molecule.'
            }
          ],
          conceptualTakeaway: 'The 6.8 µm channel allows meteorologists to visualize invisible atmospheric circulation, turbulence, and jet streams.'
        }
      }
    ]
  },

  // =========================================================================
  // CHAPTER 03: The Physics of Seeing Heat
  // =========================================================================
  {
    id: 3,
    slug: 'physics-of-seeing-heat',
    numberString: '03',
    title: 'The Physics of Seeing Heat!!!',
    subtitle: 'How a telescope measures temperature without touching anything.',
    pages: [
      {
        id: '3.1',
        pageIndex: 1,
        chapterIndex: 3,
        headerBarBadge: 'Thermal Physics: Main Ideas',
        badgeColor: 'amber',
        title: 'Everything Above Absolute Zero Shines',
        subtitle: 'Planck’s Law, Wien’s Law, and the concept of Brightness Temperature.',
        sections: [
          {
            stepNumber: 1,
            leadParagraph: 'Any matter with a temperature above absolute zero (0 Kelvin) contains oscillating charged particles that emit electromagnetic radiation. An ideal emitter is called a blackbody. In 1900, Max Planck derived the exact spectral distribution of this radiation:',
            formulas: [
              {
                label: 'Planck Radiance Equation',
                math: 'B_\\lambda(T) = \\frac{2 h c^2}{\\lambda^5 \\left( \\exp\\left(\\frac{h c}{\\lambda k_B T}\\right) - 1 \\right)}',
                explanation: 'Radiance B_λ is given in W / (m² · sr · µm), where h is Planck’s constant, c is light speed, and kB is Boltzmann’s constant.'
              }
            ]
          },
          {
            stepNumber: 2,
            dialogue: [
              {
                speaker: 'ray',
                text: "When I was emitted by a warm tropical ocean at 300 K (+27°C), where was my peak emission wavelength?"
              },
              {
                speaker: 'insat',
                text: "By Wien's Displacement Law: λ_max = 2898 / T = 2898 / 300 ≈ 9.66 micrometres! That lands squarely in my thermal infrared window (10.8 µm). You shone right into my telescope aperture!"
              }
            ]
          },
          {
            stepNumber: 3,
            terminologyAlert: {
              term: 'Physical Temperature (T) vs Brightness Temperature (Tb)',
              definition: 'Physical temperature T is the kinetic thermal state of the matter. Brightness temperature Tb is the temperature an ideal blackbody would need to have to produce the exact radiance measured by the satellite.',
              pitfall: 'Because real surfaces and clouds have emissivity ε < 1, measured radiance is L = ε · B(T). Therefore, Brightness Temperature is almost always colder than Physical Temperature!'
            }
          }
        ]
      },
      {
        id: '3.2',
        pageIndex: 2,
        chapterIndex: 3,
        headerBarBadge: 'Now You Try It: Planck Blackbody Simulator',
        badgeColor: 'purple',
        title: 'Interactive Planck Radiation Laboratory',
        subtitle: 'Drag the temperature slider from a frigid convective anvil (200 K) to a summer desert (325 K).',
        isSimulatorPage: true,
        sections: [
          {
            stepNumber: 4,
            leadParagraph: 'Observe how peak wavelength shifts with Wien’s displacement law, and test what happens to Brightness Temperature when emissivity drops below 1.0.',
            simulatorId: 'planck-blackbody'
          }
        ],
        selfCheck: {
          id: 'sc-3.2',
          question: 'If a high, thin cirrus cloud has an actual kinetic temperature of 220 K, but its emissivity is only ε = 0.50, what will INSAT-3D measure in the 10.8 µm window?',
          options: [
            {
              id: 'A',
              text: 'The satellite will measure a mixture of radiance: 50% from the cold cirrus cloud plus 50% transmitted upward from the warm Earth surface (300 K), resulting in an apparent brightness temperature significantly warmer than 220 K (e.g. ~265 K).',
              isCorrect: true,
              explanation: 'A semi-transparent cloud does not emit as a blackbody (ε = 0.5). It allows 50% of the warm radiation from the underlying surface to pass straight through. The combined radiance inverts to an intermediate brightness temperature that underestimates cloud height!'
            },
            {
              id: 'B',
              text: 'The satellite will measure exactly 220 K because temperature is independent of radiance.',
              isCorrect: false,
              explanation: 'Satellites do not measure temperature directly; they measure radiance. If radiance is altered by transmission from below, the inverted brightness temperature changes.'
            },
            {
              id: 'C',
              text: 'The satellite will report 0 Kelvin because thin clouds are invisible to infrared sensors.',
              isCorrect: false,
              explanation: 'Thin cirrus clouds are clearly detectable in infrared, especially through split-window differencing (BT10.8 - BT12.0).'
            },
            {
              id: 'D',
              text: 'The satellite will record a negative radiance.',
              isCorrect: false,
              explanation: 'Emitted radiance is always positive for any physical body above absolute zero.'
            }
          ],
          conceptualTakeaway: 'Semi-transparent clouds transmit warm surface radiance, making brightness temperature an ambiguous indicator of true cloud height without split-window corrections.'
        }
      }
    ]
  },

  // =========================================================================
  // CHAPTER 04: The Great Deception (Cloud Masking)
  // =========================================================================
  {
    id: 4,
    slug: 'the-great-deception-cloud-mask',
    numberString: '04',
    title: 'The Great Deception (Cloud Masking)!!!',
    subtitle: 'Before you can measure anything on Earth, you must ask: is there a cloud in the way?',
    pages: [
      {
        id: '4.1',
        pageIndex: 1,
        chapterIndex: 4,
        headerBarBadge: 'The Gatekeeper: Main Ideas',
        badgeColor: 'emerald',
        title: 'Why Cloud Masking is the Hardest Step in Remote Sensing',
        subtitle: 'If your cloud mask fails, every downstream product is ruined.',
        sections: [
          {
            stepNumber: 1,
            leadParagraph: 'If you want to measure Sea Surface Temperature (SST), you must be 100% sure you are looking at the ocean, not a cold cloud. If you want to estimate rainfall, you must be sure you are looking at a cloud, not cold snow on a mountain.',
          },
          {
            stepNumber: 2,
            dialogue: [
              {
                speaker: 'ray',
                text: "Why is it so hard to detect clouds, INSAT? Clouds are cold and white. Just test: if cold, it's a cloud!"
              },
              {
                speaker: 'insat',
                text: "If only it were that simple, Ray! In northern India during January, the Himalayan snow is much colder than many clouds. Over the Thar desert at night, clear sand drops to 5°C, while low fog can be at 15°C. And thin cirrus is so transparent that it looks like warm ocean. That is why the ATBD uses a cascade of multi-spectral threshold tests."
              }
            ]
          },
          {
            stepNumber: 3,
            leadParagraph: 'ISRO ATBD Chapter 2 documents the operational threshold cascade:',
            bulletPoints: [
              '1. Over Land: If (BTmax - BT11) > 12 K → Cloudy',
              '2. Over Ocean: If (BTmax - BT11) > 6 K → Cloudy',
              '3. Clear Sky Confidence: If |BTmax - BT11| < 2 K → Clear',
              '4. Ambiguous Pixels: Pass to BT11 - BT3.9 test and Split-Window (BT11 - BT12) test'
            ]
          }
        ]
      },
      {
        id: '4.2',
        pageIndex: 2,
        chapterIndex: 4,
        headerBarBadge: 'Now You Try It: Operational Cloud Mask Sandbox',
        badgeColor: 'purple',
        title: 'Tuning the Cloud Mask Decision Tree',
        subtitle: 'Adjust land and ocean thresholds to balance false alarms against missed clouds.',
        isSimulatorPage: true,
        sections: [
          {
            stepNumber: 4,
            leadParagraph: 'Experiment with the multi-spectral thresholds below. Watch how changing the cutoff values modifies the Confusion Matrix, Precision, Recall, and F1 Score in real time.',
            simulatorId: 'cloud-mask-sandbox'
          }
        ],
        selfCheck: {
          id: 'sc-4.2',
          question: 'Why does the INSAT-3D ATBD set a tighter threshold over ocean (6 K difference) than over land (12 K difference)?',
          options: [
            {
              id: 'A',
              text: 'The ocean has high thermal inertia and its sea surface temperature changes very slowly, making clear-sky ocean BTmax extremely stable; land surfaces undergo large diurnal heating and cooling cycles of 15–25 K.',
              isCorrect: true,
              explanation: 'Water has immense heat capacity. Ocean skin temperature varies by less than 1 K per day. A drop of 6 K over the ocean is conclusive evidence of cloud. But land warms by 20 K between dawn and 2 PM, requiring a wider 12 K margin to prevent false cloud alarms during afternoon coolings.'
            },
            {
              id: 'B',
              text: 'The satellite sensor is turned off when flying over land.',
              isCorrect: false,
              explanation: 'INSAT-3D VHRR scans the entire continental and oceanic disk continuously.'
            },
            {
              id: 'C',
              text: 'Salt in ocean water reflects thermal infrared light like a mirror.',
              isCorrect: false,
              explanation: 'Liquid water has a very high infrared emissivity (0.98–0.99) and behaves almost as an ideal blackbody.'
            },
            {
              id: 'D',
              text: 'Land surfaces are always covered with snow.',
              isCorrect: false,
              explanation: 'Snow covers only the Himalayas and high latitudes seasonally, while tropical India is snow-free.'
            }
          ],
          conceptualTakeaway: 'Ocean thermal stability allows aggressive cloud detection (6 K), whereas land diurnal variability demands wider thresholds (12 K).'
        }
      }
    ]
  },

  // =========================================================================
  // CHAPTER 05: Rain Without a Radar (GPI)
  // =========================================================================
  {
    id: 5,
    slug: 'rain-without-a-radar-gpi',
    numberString: '05',
    title: 'Rain Without a Radar (GPI)!!!',
    subtitle: 'If INSAT only sees the roof of the cloud, how can it know how much water is falling through the floor?',
    pages: [
      {
        id: '5.1',
        pageIndex: 1,
        chapterIndex: 5,
        headerBarBadge: 'The Ambiguity: Main Ideas',
        badgeColor: 'rose',
        title: 'The Precipitation Disconnect',
        subtitle: 'Why cloud-top temperature does not measure raindrop mass.',
        sections: [
          {
            stepNumber: 1,
            leadParagraph: 'A ground weather radar sends a microwave beam directly into the falling raindrops and measures backscattered power proportional to the drop size to the sixth power (Z ∝ Σ D⁶). But a geostationary optical radiometer cannot penetrate through cloud tops. It only records the temperature of the cloud roof!',
            dialogue: [
              {
                speaker: 'ray',
                text: "Look at my cloud top, INSAT! My temperature is 210 Kelvin (-63°C). How much rain is hitting the ground beneath me right now?"
              },
              {
                speaker: 'insat',
                text: "I cannot tell from that number alone, Ray! You could be a raging 50 mm/h convective thunderstorm over Mumbai. Or you could be a high, wispy anvil cirrus cloud with zero rain reaching the ground. Those differ by an infinite ratio!"
              }
            ]
          },
          {
            stepNumber: 2,
            leadParagraph: 'How do you bridge this gap? In the late 1980s, Phillip Arkin developed the famous GOES Precipitation Index (GPI), adopted by ISRO in the INSAT-3D ATBD Chapter 4.4.1.1:',
            formulas: [
              {
                label: 'The Historic GPI Relationship',
                math: 'R = 3.0\\text{ mm}\\cdot\\text{h}^{-1} \\times f_c \\times \\Delta t',
                explanation: 'where fc is the fractional coverage of pixels with Tb < 235 K within a 1.0° x 1.0° grid box, and Δt is accumulation hours.'
              }
            ]
          },
          {
            stepNumber: 3,
            splatInsight: {
              level: 'SPLAT!!!',
              summary: 'GPI is an empirical statistical relationship. It works by spatial and temporal averaging: over large areas (100 km) and long times (days/months), the volume of cold cloud tops correlates with total rainfall. But for a single pixel or a single hour, GPI is blind to cloud microphysics!'
            }
          }
        ]
      },
      {
        id: '5.2',
        pageIndex: 2,
        chapterIndex: 5,
        headerBarBadge: 'Now You Try It: The GPI Grid Simulator',
        badgeColor: 'purple',
        title: 'The GPI Grid Accumulator Laboratory',
        subtitle: 'See how the 235 K threshold operates, and trigger the two classic failure modes of GPI.',
        isSimulatorPage: true,
        sections: [
          {
            stepNumber: 4,
            leadParagraph: 'Experiment with the GPI grid simulator below. Test the Deep Monsoon Convection preset, then test the Cold Cirrus Trap and the Western Ghats Warm Rain failure modes.',
            simulatorId: 'gpi-rainfall'
          }
        ],
        selfCheck: {
          id: 'sc-5.2',
          question: 'Why does the GPI algorithm severely underestimate or miss rainfall along the windward slopes of the Western Ghats during active monsoon spells?',
          options: [
            {
              id: 'A',
              text: 'Monsoon orographic rainfall over the Ghats is produced by shallow warm-rain collision-coalescence systems whose tops only reach 3 to 4 km altitude (Tb ~ 260 K), which is much warmer than the 235 K GPI threshold.',
              isCorrect: true,
              explanation: 'Orographic lift forces deep maritime moisture into vigorous shallow clouds that dump torrential rain without ever freezing or building tall cold ice anvils. Because their cloud tops stay warmer than 235 K, GPI counts them as non-raining!'
            },
            {
              id: 'B',
              text: 'The mountains absorb satellite infrared radiation completely.',
              isCorrect: false,
              explanation: 'Topography does not block satellite views from above; the issue is cloud-top temperature versus rain production.'
            },
            {
              id: 'C',
              text: 'GPI only works over the Atlantic Ocean.',
              isCorrect: false,
              explanation: 'GPI was applied globally across the tropics by NOAA and ISRO.'
            },
            {
              id: 'D',
              text: 'Rain in the Western Ghats falls only at night when satellite imagers are turned off.',
              isCorrect: false,
              explanation: 'Thermal IR channels operate 24 hours a day continuously.'
            }
          ],
          conceptualTakeaway: 'The 235 K threshold assumes rain only comes from tall ice-topped clouds, blinding GPI to shallow tropical orographic precipitation.'
        }
      }
    ]
  },

  // =========================================================================
  // CHAPTER 06: The Modern Rain Machine (IMSRA & HEM)
  // =========================================================================
  {
    id: 6,
    slug: 'the-modern-rain-machine-imsra',
    numberString: '06',
    title: 'The Modern Rain Machine (IMSRA & HEM)!!!',
    subtitle: 'How combining multi-spectral physics and cloud dynamics rescues the rain retrieval.',
    pages: [
      {
        id: '6.1',
        pageIndex: 1,
        chapterIndex: 6,
        headerBarBadge: 'Multi-Spectral Retrieval: Main Ideas',
        badgeColor: 'teal',
        title: 'The 10-Step IMSRA Assembly Line',
        subtitle: 'Documented in ATBD Chapter 4.4.1.2: Moving beyond single-channel thresholds.',
        sections: [
          {
            stepNumber: 1,
            leadParagraph: 'To fix the flaws of GPI, scientists at ISRO Space Applications Centre (SAC) developed the INSAT Multispectral Rainfall Algorithm (IMSRA). IMSRA treats cloud rainfall as a dynamic physical system rather than a static threshold:',
            bulletPoints: [
              '1. Cloud Expansion vs Dissipation: Clouds with rapidly cooling tops (dTb/dt < 0) are actively developing and assigned higher rain rates. Clouds with warming tops (dTb/dt > 0) are dissipating anvils with near-zero rain.',
              '2. Cloud Merging: When two cumulonimbus clouds merge, rain rates intensify by 25%.',
              '3. Microwave Radar Calibration: Lookup curves R(Tb) are pre-calibrated against coincident spaceborne radars (TRMM TMI / GPM DPR).',
              '4. Moisture Multiplier: Rain is scaled by numerical weather model fields of Total Precipitable Water (TPW) and Relative Humidity (RH) from surface to 500 hPa.'
            ]
          },
          {
            stepNumber: 2,
            dialogue: [
              {
                speaker: 'ray',
                text: "Why does environmental humidity matter so much, INSAT? If my cloud top is cold, why do you care about the air underneath the cloud?"
              },
              {
                speaker: 'insat',
                text: "Because if the sub-cloud layer is dry (low RH), falling raindrops will evaporate completely before hitting the dirt — a phenomenon called virga! Conversely, in a saturated monsoon column with 60 mm of precipitable water, every drop survives to the ground."
              }
            ]
          },
          {
            stepNumber: 3,
            splatInsight: {
              level: 'DOUBLE SPLAT!!!',
              summary: 'Cloud-top temperature alone cannot measure rain. IMSRA succeeds by combining three independent pieces of evidence: cloud cooling rate dTb/dt (updraft vigor), microwave radar calibration tables (drop size truth), and atmospheric moisture fields (sub-cloud survival).'
            }
          }
        ]
      },
      {
        id: '6.2',
        pageIndex: 2,
        chapterIndex: 6,
        headerBarBadge: 'Now You Try It: IMSRA Lifecycle Simulator',
        badgeColor: 'purple',
        title: 'IMSRA Cloud Lifecycle & Moisture Multipliers',
        subtitle: 'Experiment with cloud top cooling rates, TPW scaling, and cloud merging.',
        isSimulatorPage: true,
        sections: [
          {
            stepNumber: 4,
            leadParagraph: 'Adjust the current and previous brightness temperatures to watch the cloud stage transition from developing to dissipating. Compare IMSRA output with the old GPI value.',
            simulatorId: 'imsra-lifecycle'
          }
        ],
        selfCheck: {
          id: 'sc-6.2',
          question: 'In IMSRA, if a cloud top has a very cold brightness temperature of 210 K, but its temperature 30 minutes ago was 200 K (meaning it has warmed by 10 K), how does the algorithm adjust its rain estimate?',
          options: [
            {
              id: 'A',
              text: 'It sharply reduces the rain rate (by ~85%) because warming cloud tops signify collapsing updrafts and a dissipating anvil, preventing false flood alarms.',
              isCorrect: true,
              explanation: 'When convective updrafts cease, the cloud top begins to warm and spread horizontally. Although it is still cold (210 K), precipitation has largely stopped falling. Detecting dTb/dt > 0 prevents false alarms.'
            },
            {
              id: 'B',
              text: 'It doubles the rain rate because warmer clouds have more liquid water.',
              isCorrect: false,
              explanation: 'Warming at the cloud top indicates decay and evaporation of hydrometeors, not intensification.'
            },
            {
              id: 'C',
              text: 'It marks the pixel as missing data (-999.0).',
              isCorrect: false,
              explanation: 'A warming anvil is a physically valid atmospheric state, not bad data.'
            },
            {
              id: 'D',
              text: 'It switches to visible channel reflection.',
              isCorrect: false,
              explanation: 'Convective cloud lifecycle tracking relies primarily on infrared time-differencing.'
            }
          ],
          conceptualTakeaway: 'Temporal trend (dTb/dt) is as important as absolute temperature: rising clouds rain heavily; warming anvils produce little to no surface rain.'
        }
      }
    ]
  },

  // =========================================================================
  // CHAPTER 07: Slicing the Atmosphere (The 19-Channel Sounder)
  // =========================================================================
  {
    id: 7,
    slug: 'slicing-the-atmosphere-sounder',
    numberString: '07',
    title: 'Slicing the Atmosphere (The 19-Channel Sounder)!!!',
    subtitle: 'How 19 infrared channels let us reconstruct atmospheric temperature and moisture layer by layer.',
    pages: [
      {
        id: '7.1',
        pageIndex: 1,
        chapterIndex: 7,
        headerBarBadge: 'Atmospheric Sounding: Main Ideas',
        badgeColor: 'purple',
        title: 'Imager vs Sounder: A Photo vs a CT Scan',
        subtitle: 'Documented in ATBD Chapter 16 & Table 2.',
        sections: [
          {
            stepNumber: 1,
            leadParagraph: 'The VHRR Imager is like a camera: it takes a 2D snapshot of the Earth and cloud tops. But meteorologists need 3D knowledge: what is the temperature and moisture at 850 hPa, 500 hPa, and 200 hPa? The INSAT-3D 19-channel Sounder acts like a medical CT scan of the atmosphere.',
            dialogue: [
              {
                speaker: 'ray',
                text: "How can 19 infrared channels slice height, INSAT? All 19 detectors are sitting in the same telescope in space looking down at the same spot!"
              },
              {
                speaker: 'insat',
                text: "The secret is molecular absorption! In Channel 1 (14.67 µm), carbon dioxide absorbs so violently that the atmosphere becomes pitch opaque after just a few kilometres. Radiation from below 30 hPa never escapes. In Channel 4 (13.64 µm), absorption is weaker, so I see down to 500 hPa. And in Channel 8 (11.0 µm), the air is clear and I see all the way to the ground!"
              }
            ]
          },
          {
            stepNumber: 2,
            leadParagraph: 'This is mathematically governed by the Radiative Transfer Weighting Function:',
            formulas: [
              {
                label: 'Radiative Transfer Integral',
                math: 'L_\\nu = \\epsilon_\\nu B_\\nu(T_s) \\tau_\\nu(p_s) + \\int_0^{p_s} B_\\nu(T(p)) \\left( \\frac{\\partial \\tau_\\nu(p)}{\\partial \\ln p} \\right) d\\ln p',
                explanation: 'The term W(p) = ∂τ_ν / ∂ln p is the Weighting Function. It acts as a vertical filter peaking at a specific pressure layer.'
              }
            ]
          }
        ]
      },
      {
        id: '7.2',
        pageIndex: 2,
        chapterIndex: 7,
        headerBarBadge: 'Now You Try It: Sounder Profile Explorer',
        badgeColor: 'purple',
        title: 'Weighting Functions & Atmospheric Inversion',
        subtitle: 'Explore all 19 channels, see where they peak, and monitor stability indices like Lifted Index.',
        isSimulatorPage: true,
        sections: [
          {
            stepNumber: 3,
            leadParagraph: 'Select different sounder channels below. Observe their vertical weighting functions and see how severe weather instability (Lifted Index) is derived.',
            simulatorId: 'sounder-profile'
          }
        ],
        selfCheck: {
          id: 'sc-7.2',
          question: 'Why does Sounder Channel 1 (14.67 µm CO2 absorption band) measure stratospheric temperature (~30 hPa) rather than surface temperature?',
          options: [
            {
              id: 'A',
              text: 'Because CO2 concentration and absorption cross-section at 14.67 µm are so high that atmospheric transmittance drops to zero below the stratosphere; photons emitted by the lower troposphere or surface are completely re-absorbed before escaping to space.',
              isCorrect: true,
              explanation: 'Atmospheric optical depth reaches unity high in the stratosphere. Radiation escaping to space originates entirely from that high, cold layer. The weighting function peaks near 30 hPa.'
            },
            {
              id: 'B',
              text: 'Because CO2 does not exist in the troposphere.',
              isCorrect: false,
              explanation: 'CO2 is a well-mixed greenhouse gas present throughout the entire homosphere.'
            },
            {
              id: 'C',
              text: 'Because Channel 1 only operates during solar eclipses.',
              isCorrect: false,
              explanation: 'Sounder infrared channels operate continuously day and night.'
            },
            {
              id: 'D',
              text: 'Because 14.67 µm radiation reflects off the ozone layer.',
              isCorrect: false,
              explanation: 'Infrared radiation is absorbed and emitted by greenhouse gases, not specularly reflected by ozone.'
            }
          ],
          conceptualTakeaway: 'Strong greenhouse absorption bands reach optical depth τ = 1 in the upper atmosphere, isolating stratospheric emission.'
        }
      }
    ]
  },

  // =========================================================================
  // CHAPTER 08: Winds, Fog, Fire, and the Real HDF5 Data
  // =========================================================================
  {
    id: 8,
    slug: 'winds-fog-fire-real-hdf5-data',
    numberString: '08',
    title: 'Winds, Fog, Fire, and the Real HDF5 Data!!!',
    subtitle: 'From atmospheric motion vectors to opening real MOSDAC files in Python.',
    pages: [
      {
        id: '8.1',
        pageIndex: 1,
        chapterIndex: 8,
        headerBarBadge: 'Atmospheric Motion Vectors: Main Ideas',
        badgeColor: 'blue',
        title: 'Measuring Winds by Tracking Clouds',
        subtitle: 'Documented in ATBD Chapters 11–14: AMV derivation from triplet imagery.',
        sections: [
          {
            stepNumber: 1,
            leadParagraph: 'How do you measure wind speed from a satellite that has no anemometer? You track clouds! By comparing three consecutive images spaced 30 minutes apart (t-30m, t, t+30m), an automated cross-correlation pattern matcher tracks target blocks and computes their displacement vectors.',
            dialogue: [
              {
                speaker: 'ray',
                text: "Tracking how far I drifted is easy geometry, INSAT: speed = distance / 1800 seconds! But which wind did I measure?"
              },
              {
                speaker: 'insat',
                text: "That is the central dilemma of AMVs: Height Assignment! A cloud at 200 hPa might be caught in a 120-knot jet streak, while the surface wind below it is calm. I use my 10.8 µm brightness temperature collocated with numerical weather soundings to assign each vector to its exact vertical pressure level."
              }
            ]
          },
          {
            stepNumber: 2,
            splatInsight: {
              level: 'TRIPLE SPLAT!!!',
              summary: 'Cloud motion is a proxy for wind, but clouds can grow, evaporate, or propagate as gravity waves without moving at wind speed. Quality Indicator (QI) consistency checks between frame pairs are critical before assimilating AMVs into numerical weather forecast models.'
            }
          }
        ]
      },
      {
        id: '8.2',
        pageIndex: 2,
        chapterIndex: 8,
        headerBarBadge: 'Now You Try It: AMV Cloud Tracking Simulator',
        badgeColor: 'purple',
        title: 'Interactive AMV Cloud Motion Laboratory',
        subtitle: 'Track cloud displacement across sequential frames, compute wind speed in knots, and test height assignment.',
        isSimulatorPage: true,
        sections: [
          {
            stepNumber: 3,
            leadParagraph: 'Animate the cloud tracer across the 30-minute frames below to see how horizontal velocity (u, v) and meteorological wind direction are derived.',
            simulatorId: 'amv-tracking'
          }
        ]
      },
      {
        id: '8.3',
        pageIndex: 3,
        chapterIndex: 8,
        headerBarBadge: 'Data Studio & Python: Details Part 1',
        badgeColor: 'emerald',
        title: 'Opening Real MOSDAC HDF5 Files in Python',
        subtitle: 'Avoiding the -999.0 fill value trap and decoding calibrated satellite granules.',
        isSimulatorPage: true,
        sections: [
          {
            stepNumber: 4,
            leadParagraph: 'Inspect the production-ready Python pipelines below to learn how to ingest, calibrate, and plot real INSAT-3D/3DR granules using h5py, numpy, and matplotlib.',
            simulatorId: 'data-studio-inspector'
          }
        ],
        selfCheck: {
          id: 'sc-8.3',
          question: 'When reading an INSAT-3D Level-2B rain rate or SST array from an HDF5 file in Python, what will happen if you calculate the regional mean without masking negative values?',
          options: [
            {
              id: 'A',
              text: 'The fill value used for missing or cloud-masked pixels is -999.0; averaging without masking will produce catastrophically negative, unphysical numbers that ruin your analysis.',
              isCorrect: true,
              explanation: 'HDF5 stores missing or unretrieved pixels as large negative numbers (e.g. -999.0 or -9999.0), not NaN! You must always write `data = np.where(data < 0, np.nan, data)` before computing spatial means or standard deviations.'
            },
            {
              id: 'B',
              text: 'Python will automatically convert all negative numbers to zero.',
              isCorrect: false,
              explanation: 'NumPy and Python calculate exact numerical averages including all array elements; negative fill values will corrupt the result.'
            },
            {
              id: 'C',
              text: 'The HDF5 file will delete itself from your hard drive.',
              isCorrect: false,
              explanation: 'File reading operations do not alter or delete files.'
            },
            {
              id: 'D',
              text: 'Negative values represent negative rainfall (evaporation).',
              isCorrect: false,
              explanation: 'Rainfall rate cannot be negative. -999.0 is strictly an operational fill value flag.'
            }
          ],
          conceptualTakeaway: 'Always read quality flags and mask fill values (-999.0) before conducting scientific calculations on satellite datasets.'
        }
      }
    ]
  }
];
