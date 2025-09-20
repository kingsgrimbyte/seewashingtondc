import React from 'react';
import {
  FaTheaterMasks,
  FaMusic,
  FaLaugh,
  FaCocktail,
  FaLandmark,
  FaMicrophoneAlt,
  FaFilm,
  FaUniversity,
  FaTree,
  FaPaw,
  FaWater,
  FaFish,
  FaHiking,
  FaUmbrellaBeach,
  FaFootballBall,
  FaTicketAlt,
  FaUtensils,
  FaCoffee,
  FaPalette,
  FaMoon,
  FaLeaf,
  FaSun,
  FaSnowflake,
  FaMoneyBill,
  FaHotel,
  FaStar,
  FaQuestionCircle,
  FaMap,
  FaSearch,
  FaSpa,
  FaUsers,
  FaBullseye,
  FaCalendarAlt,
  FaMobileAlt,
  FaSyncAlt,
  FaLightbulb,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
  FaLocationArrow,
  FaChartLine,
  FaAward,
  FaGlobe,
  FaClock,
  FaArrowRight,
  FaGolfBall,
} from 'react-icons/fa';
import { GiIsland } from 'react-icons/gi'; // Added import

type IconName =
  | 'theater'
  | 'music'
  | 'festival'
  | 'comedy'
  | 'bar'
  | 'landmark'
  | 'microphone'
  | 'film'
  | 'museum'
  | 'monument'
  | 'memorial'
  | 'park'
  | 'zoo'
  | 'island'
  | 'river'
  | 'water'
  | 'fish'
  | 'hiking'
  | 'beach'
  | 'sports'
  | 'ticket'
  | 'restaurant'
  | 'cafe'
  | 'palette'
  | 'moon'
  | 'leaf'
  | 'sun'
  | 'snowflake'
  | 'money'
  | 'hotel'
  | 'star'
  | 'map'
  | 'search'
  | 'spa'
  | 'users'
  | 'bullseye'
  | 'calendar'
  | 'mobile'
  | 'refresh'
  | 'lightbulb'
  | 'pin'
  | 'external'
  | 'navigation'
  | 'trending'
  | 'award'
  | 'globe'
  | 'clock'
  | 'arrowRight'
  | 'golf';

const iconRegistry: Record<IconName, React.ComponentType<{ className?: string }>> = {
  theater: FaTheaterMasks,
  music: FaMusic,
  festival: FaCalendarAlt,
  comedy: FaLaugh,
  bar: FaCocktail,
  landmark: FaLandmark,
  microphone: FaMicrophoneAlt,
  film: FaFilm,
  museum: FaUniversity,
  monument: FaLandmark,
  memorial: FaLandmark,
  park: FaTree,
  zoo: FaPaw,
  island: GiIsland, // Updated to use GiIsland
  river: FaWater,
  water: FaWater,
  fish: FaFish,
  hiking: FaHiking,
  beach: FaUmbrellaBeach,
  sports: FaFootballBall,
  ticket: FaTicketAlt,
  restaurant: FaUtensils,
  cafe: FaCoffee,
  palette: FaPalette,
  moon: FaMoon,
  leaf: FaLeaf,
  sun: FaSun,
  snowflake: FaSnowflake,
  money: FaMoneyBill,
  hotel: FaHotel,
  star: FaStar,
  map: FaMap,
  search: FaSearch,
  spa: FaSpa,
  users: FaUsers,
  bullseye: FaBullseye,
  calendar: FaCalendarAlt,
  mobile: FaMobileAlt,
  refresh: FaSyncAlt,
  lightbulb: FaLightbulb,
  pin: FaMapMarkerAlt,
  external: FaExternalLinkAlt,
  navigation: FaLocationArrow,
  trending: FaChartLine,
  award: FaAward,
  globe: FaGlobe,
  clock: FaClock,
  arrowRight: FaArrowRight,
  golf: FaGolfBall,
};

export type AppIconProps = {
  name: IconName | string;
  variant?: 'primary' | 'secondary';
  className?: string;
};

export default function AppIcon({ name, variant = 'primary', className }: AppIconProps) {
  const IconComponent = (iconRegistry as Record<string, React.ComponentType<{ className?: string }>>)[name] || FaQuestionCircle;
  const colorClass = variant === 'secondary' ? 'text-secondary' : 'text-primary';
  return <IconComponent className={`${colorClass} ${className ?? ''}`} />;
}
