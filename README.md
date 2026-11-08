# INSAT Explorer — An Illustrated Guide to Weather from Orbit 🛰️🇮🇳

[![Deploy INSAT Explorer to GitHub Pages](https://github.com/bapallinaveen60/INSAT_Explorer/actions/workflows/deploy.yml/badge.svg)](https://github.com/bapallinaveen60/INSAT_Explorer/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-10508f?style=flat&logo=github)](https://bapallinaveen60.github.io/INSAT_Explorer/)
[![ISRO ATBD](https://img.shields.io/badge/Scientific%20Basis-ISRO%20%2F%20IMD%20ATBD-1b6b3c?style=flat)](./atbd_docs/)
[![React 19](https://img.shields.io/badge/Framework-React%2019-61dafb?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript%205.8-3178c6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Bundler-Vite%208-646cff?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styles-Tailwind%20CSS%20v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![KaTeX](https://img.shields.io/badge/Math-KaTeX-00d084?style=flat)](https://katex.org/)

> **"One satellite. Multiple wavelengths. An entire atmosphere to discover."**

**INSAT Explorer** is an interactive scientific discovery and educational platform dedicated to **INSAT-3D/3DR geostationary satellite meteorology**. 

Unlike conventional weather dashboards or static image viewers, INSAT Explorer translates complex atmospheric physics and satellite remote sensing into an intuitive, visually illustrated learning journey. It is built strictly in accordance with official **ISRO (Indian Space Research Organisation)** and **IMD (India Meteorological Department) Algorithm Theoretical Basis Documents (ATBD)**.

---

## 🌐 Live Application

Explore the deployed interactive field guide directly in your browser:  
👉 **[https://bapallinaveen60.github.io/INSAT_Explorer/](https://bapallinaveen60.github.io/INSAT_Explorer/)**

---

## 🎨 Educational Philosophy & Visual Design

INSAT Explorer is inspired by the educational ethos of **[Rain from Orbit](https://bapallinaveen60.github.io/rain-from-orbit/#/ch/1/1)** (the illustrated GPM DPR mission guide) and the step-by-step clarity of **StatQuest with Josh Starmer**.

### The 8-Step Pedagogical Sequence
Every core atmospheric and remote sensing concept is taught through a disciplined learning arc:
$$\mathbf{Question} \longrightarrow \mathbf{Intuition} \longrightarrow \mathbf{Visual\ Model} \longrightarrow \mathbf{Physical\ Principle} \longrightarrow \mathbf{Math\ Formulation} \longrightarrow \mathbf{ISRO\ Algorithm} \longrightarrow \mathbf{Simulator} \longrightarrow \mathbf{Telemetry}$$

### Printed Field Guide Aesthetic
- **Warm Cream Paper Texture**: Natural eye-friendly background (`#faf8f2`) with warm off-white cards (`#fffdf8`).
- **Crisp Ink Borders**: 2px architectural ink outlines (`#2a2825`) with flat print drop shadows (`3px 3px 0 rgba(42, 40, 37, 0.15)`).
- **Rich Book Headers**: Solid deep navy (`#10508f`), forest green (`#1b6b3c`), and terracotta/magenta section headers.
- **Sequential Step Badges**: Circled step markers `(1)`, `(2)`, `(3)` that break multi-stage physics into bite-sized milestones.
- **Conversational Characters**:
  - **Ray**: An atmospheric photon offering intuitive physical explanations.
  - **INSAT**: The geostationary satellite sensor explaining radiometric inversion and mathematical retrieval constraints.

---

## 📚 Curriculum Chapters & Interactive Simulators

### 📖 Chapter 1: The Geostationary Eye at 36,000 km
- **Orbital Mechanics**: Why geostationary orbit occurs at exactly $35,786\text{ km}$ ($r = 42,164\text{ km}$) where orbital velocity ($\sim 3.07\text{ km/s}$) matches Earth's sidereal rotation ($23\text{h } 56\text{m } 4\text{s}$).
- **GEO vs. LEO Comparison**: Why polar Low Earth Orbit (LEO) satellites zoom past India in 10 minutes and disappear for 12 hours, while INSAT remains stationary over **$74.0^\circ\text{E}$** (INSAT-3D) and **$82.0^\circ\text{E}$** (INSAT-3DR) for 30-minute rapid-cycle scans.
- **Slant Path & Limb Darkening**: How satellite zenith angle ($\theta$) elongates the atmospheric optical path:
  $$s(\theta) = \frac{H}{\cos \theta} = H \sec \theta$$
- **Interactive Simulator**: Real-time 24-hour orbital simulator with Earth rotation, sub-satellite line of sight, footprint tangent cone, and day/night terminator.

---

### 📡 Chapter 2: Two Eyes in Orbit — VHRR Imager & 19-Channel Sounder
- **INSAT-3D VHRR 6-Channel Imager**:
  | Channel | Spectral Band | Central Wavelength | Resolution | Atmospheric Sensitivity |
  | :--- | :--- | :--- | :--- | :--- |
  | **VIS** | Visible | $0.55 - 0.75\ \mu\text{m}$ | $1\text{ km}$ | Cloud albedo, snow, fog, vegetation |
  | **SWIR** | Shortwave IR | $1.55 - 1.70\ \mu\text{m}$ | $1\text{ km}$ | Ice vs. water cloud discrimination |
  | **MIR** | Mid-Infrared | $3.80 - 4.00\ \mu\text{m}$ | $4\text{ km}$ | Nocturnal fog, hot spot / forest fires ($T^{10}$ law) |
  | **WV** | Water Vapour | $6.50 - 7.10\ \mu\text{m}$ | $8\text{ km}$ | Middle-to-upper tropospheric moisture & jet streams |
  | **TIR-1** | Thermal IR 1 | $10.2 - 11.3\ \mu\text{m}$ | $4\text{ km}$ | Cloud-top temperature, deep convection |
  | **TIR-2** | Thermal IR 2 | $11.5 - 12.5\ \mu\text{m}$ | $4\text{ km}$ | Split-window differential water vapour correction |
- **INSAT-3D 19-Channel Atmospheric Sounder**:
  - 18 Infrared Channels + 1 Visible Channel.
  - Longwave ($14.7 - 12.0\ \mu\text{m}$), Midwave ($11.0 - 6.5\ \mu\text{m}$), and Shortwave ($4.6 - 3.7\ \mu\text{m}$).
  - Vertical weighting functions:
    $$W(p) = \frac{\partial \tau(p)}{\partial \ln p}$$
- **Interactive Simulator**: Sounder atmospheric column profile simulator displaying pressure-altitude levels ($1000\text{ hPa}$ to $100\text{ hPa}$) and channel sensitivity peaks.

---

### 🔬 Chapter 3: The 6-Channel Split Comparison Sandbox
- **Interactive Peninsular India & Bay of Bengal Canvas**:
  - Crosshair telemetry probe inspecting pixel properties across all 6 channels simultaneously.
  - Interactive Split-Screen Wipe with adjustable horizontal divider ($0 - 100\%$).
- **Guided Meteorological Experiments**:
  1. *Why do clouds appear white in Visible?* (Non-selective Mie scattering of all solar wavelengths).
  2. *Why do clouds appear dark in SWIR?* (Strong photon absorption by ice crystals at $1.6\ \mu\text{m}$).
  3. *Why are convective clouds cold in Thermal IR?* (Cumulonimbus anvils penetrate the tropopause at $200 - 215\text{ K}$).
  4. *The Day/Night Ambiguity of Mid-IR ($3.9\ \mu\text{m}$)*: Reflected solar + thermal emission during day; pure thermal radiator at night.
  5. *Split-Window Trick ($T_{11} - T_{12}$)*: Subtracting TIR-2 from TIR-1 isolates atmospheric water vapour column attenuation.

---

### ⚡ Chapter 4: The Physics of Thermal Radiation
- **Planck's Law**: Spectral radiance emitted by an ideal blackbody:
  $$B_\lambda(T) = \frac{2hc^2}{\lambda^5 \left[\exp\left(\frac{hc}{\lambda k_B T}\right) - 1\right]}$$
- **Wien's Displacement Law**: Peak emission wavelength shifts inversely with temperature:
  $$\lambda_{\max} = \frac{b}{T} \quad (b \approx 2897.8\ \mu\text{m}\cdot\text{K})$$
- **Stefan-Boltzmann Law**: Total integrated radiance:
  $$E = \sigma T^4 \quad (\sigma \approx 5.670 \times 10^{-8}\ \text{W}\cdot\text{m}^{-2}\cdot\text{K}^{-4})$$
- **Brightness Temperature Inversion ($T_b$)**:
  $$T_b = \frac{hc}{k_B \lambda} \left[ \ln\left(1 + \frac{2hc^2}{\lambda^5 R_\lambda}\right) \right]^{-1}$$
- **Interactive Simulator**: Dynamic Planck curve graph comparing Sun ($5778\text{ K}$), Warm Earth ($300\text{ K}$), Stratocumulus ($270\text{ K}$), and Cold Convective Core ($210\text{ K}$) with Wien peak tracker and thin-cirrus emissivity sliders.

---

### ☁️ Chapter 5: Cloud Masking & Scene Classification (CMK)
- **The Inverse Problem**: Satellites detect raw digital counts (DN), not cloud tags.
- **ISRO 5-Stage Decision Cascade**:
  1. *Gross Contrast Test*: $T_{11} < T_{\text{surface\_matrix}} - \Delta T$
  2. *Spatial Uniformity Test*: Standard deviation of $3 \times 3$ TIR-1 kernel ($> 0.8\text{ K}$ indicates broken cloud edges)
  3. *Split-Window Difference*: $(T_{11} - T_{12})$ separates thin cirrus from low stratus
  4. *Mid-Infrared Difference*: $(T_{3.9} - T_{11})$ detects nocturnal low fog and marine stratus
  5. *Visible Albedo Test*: $\rho_{\text{vis}} > 0.18$ during daytime
- **Interactive Simulator**: Step-by-step decision tree processor classifying pixels into *Clear Land*, *Clear Ocean*, *Low Stratus/Fog*, *Cirrus Anvil*, or *Deep Convective Core*.

---

### 🌧️ Chapter 6: Rainfall Estimation Retrieval Lab (HEM, GPI, IMSRA)
- **Hydro-Estimator Method (HEM)**: Cloud-growth rate correction, environmental moisture adjustments via NWP models, and orographic lifting multipliers.
- **GOES Precipitation Index (GPI)** (Arkin, 1987):
  $$R = 3.0 \times f_c \quad [\text{mm/hr}]$$
  $$\text{where } f_c = \frac{N(T_b < 235\text{K})}{N_{\text{total}}}$$
- **ISRO INSAT Multi-spectral Rainfall Algorithm (IMSRA)**:
  - Deep Convection ($T_b < 210\text{ K}$): $R = a_1 (210 - T_b)^{b_1}$
  - Moderate Convection ($210\text{ K} \le T_b \le 230\text{ K}$): $R = a_2 (230 - T_b)^{b_2}$
  - Shallow Clouds ($230\text{ K} < T_b \le 260\text{ K}$): $R = a_3 (260 - T_b)^{b_3}$
- **Interactive Simulator**: Live rain rate calculator where users adjust cloud-top $T_b$, fractional coverage, and moisture factors to compare GPI vs. IMSRA retrievals.

---

### 💨 Chapter 7: Atmospheric Motion Vectors (AMV / Winds)
- **Optical Flow & Cross-Correlation**:
  - Sequential scan triplets ($t - 30\text{m}$, $t$, $t + 30\text{m}$).
  - $32 \times 32$ pixel target box matched inside a $64 \times 64$ pixel search area via Normalized Cross-Correlation (NCC).
- **Height Assignment**:
  - $H_2O$ Intercept Method & Minimum Infrared Temperature.
- **Interactive Simulator**: Vector wind field tracker displaying speed ($m/s$), direction ($^\circ$), and assigned pressure altitude ($hPa$).

---

### 📊 Chapter 8: Data Studio & Telemetry Inspector
- **HDF5 / NetCDF Product Structure**: Inspect Level-1B calibrated radiances, Level-2B geophysical retrievals, and Level-3 gridded composites.
- **Calibration & Quality Flags**: Raw digital numbers to radiance lookup tables, solar zenith angle corrections, and validation statistics.
- **Interactive Inspector**: JSON/HDF5 data tree explorer with pixel telemetry and QC flag validator.

---

## 📑 Official ISRO & IMD ATBD Reference Library

All algorithms and physical models implemented in INSAT Explorer are sourced from the official Algorithm Theoretical Basis Documents located in the [`atbd_docs/`](./atbd_docs/) directory:

| Filename | Official Title & Scope |
| :--- | :--- |
| [`INSAT_3D_ATBD_MAY_2015.pdf`](./atbd_docs/INSAT_3D_ATBD_MAY_2015.pdf) | **Master ATBD Volume (May 2015)**: Complete algorithm basis for INSAT-3D/3DR Imager and Sounder geophysical products. |
| [`HEM_rain-revised-atbd.pdf`](./atbd_docs/HEM_rain-revised-atbd.pdf) | **Hydro-Estimator Method (HEM)**: High-resolution quantitative precipitation estimation over the Indian region. |
| [`ATBD_INSAT-3D_SST_REV_V1.1.pdf`](./atbd_docs/ATBD_INSAT-3D_SST_REV_V1.1.pdf) | **Sea Surface Temperature (SST)**: Multi-channel split-window SST retrieval and atmospheric water vapour correction. |
| [`INSAT_AOD_ATBD_revised.doc.pdf`](./atbd_docs/INSAT_AOD_ATBD_revised.doc.pdf) | **Aerosol Optical Depth (AOD)**: Quantitative retrieval of particulate matter, dust storms, and winter fog. |
| [`Incremental-ATBD-12Feb2020.pdf`](./atbd_docs/Incremental-ATBD-12Feb2020.pdf) | **Incremental ATBD (Feb 2020)**: Operational enhancements, calibration upgrades, and validation benchmarks. |
| [`INSAT3D_Products.pdf`](./atbd_docs/INSAT3D_Products.pdf) | **Geophysical Product Catalog**: Complete specifications for Level-1B to Level-3 products. |
| [`INSAT_Product_Version_information_V01.pdf`](./atbd_docs/INSAT_Product_Version_information_V01.pdf) | **Product Versioning & Data Levels**: Processing definitions, naming conventions, and format specifications. |
| [`V1_INSAT3D_ProductTypes and ProcessingLevel.pdf`](./atbd_docs/V1_INSAT3D_ProductTypes%20and%20ProcessingLevel.pdf) | **Processing Levels & Distribution**: Data access standards for IMD and MOSDAC archives. |
| [`INSAT3D_COTS.pdf`](./atbd_docs/INSAT3D_COTS.pdf) | **Commercial Off-The-Shelf Processing**: Architecture of the operational ground station software suite. |

---

## 💻 Tech Stack & Architecture

- **Core**: React 19, TypeScript 5.8
- **Build Engine**: Vite 8 (with dual-mode base URL for seamless local development and production GitHub Pages deployment)
- **Styling**: Tailwind CSS v4 with custom typography and CSS custom properties
- **Math Rendering**: KaTeX with complete TeX typesetting for Planck, Wien, and ISRO equations
- **Iconography**: Lucide React
- **Typography**:
  - `Nunito Sans` (High-readability UI and explanations)
  - `IBM Plex Mono` (Telemetry values, coordinates, and spectral channels)
  - `Caveat` (Handwritten field notebook notes)
  - `Permanent Marker` (Illustrative callouts and emphasis)
- **CI/CD**: GitHub Actions workflow (`.github/workflows/deploy.yml`) building on Node 24 and deploying via GitHub Pages.

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js `18.x` or higher
- npm `9.x` or higher
- Git

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/bapallinaveen60/INSAT_Explorer.git
   cd INSAT_Explorer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173/`.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## 🧭 Navigation & Deep Linking

INSAT Explorer supports URL hash navigation for direct access to any chapter or lab:

| Destination | URL Hash |
| :--- | :--- |
| Chapter 1: The Geostationary Eye | `#/ch/1/1` |
| Chapter 2: Two Eyes in Orbit | `#/ch/2/1` |
| Chapter 3: 6-Channel Split Sandbox | `#/ch/3/1` |
| Chapter 4: Atmospheric Physics | `#/ch/4/1` |
| Chapter 5: Cloud Masking Lab | `#/ch/5/1` |
| Chapter 6: Rainfall Estimation | `#/ch/6/1` |
| Chapter 7: Atmospheric Motion Vectors | `#/ch/7/1` |
| Chapter 8: Data Studio | `#/ch/8/1` |
| Satellite Lab Sandbox | `#/lab/satellite` |
| Channels Comparison Lab | `#/lab/channels` |
| Physics Lab Simulators | `#/lab/physics` |
| Algorithm Retrieval Lab | `#/lab/algorithms` |
| Data Studio Inspector | `#/lab/datastudio` |

---

## 🤝 Scientific Attribution & Acknowledgments

- **Indian Space Research Organisation (ISRO)** & **Space Applications Centre (SAC), Ahmedabad**: For developing the INSAT-3D/3DR/3DS Earth observation missions and publishing the comprehensive Algorithm Theoretical Basis Documents.
- **India Meteorological Department (IMD), New Delhi**: For operational weather forecasting, satellite product generation, and ground validation data.
- **Meteorological & Oceanographic Satellite Data Archival Centre (MOSDAC)**: For archiving and disseminating INSAT telemetry.
- **Rain from Orbit**: Special appreciation for pioneering the illustrated field-guide format for orbital Earth observation.

---

## 📄 License

This educational project is distributed under the **MIT License**. Scientific equations and algorithms are based on public ISRO/IMD ATBD specifications.
