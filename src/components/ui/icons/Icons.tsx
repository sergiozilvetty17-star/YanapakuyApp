import Svg, {
  Circle,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
} from 'react-native-svg';

type IconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

const defaults = {
  size: 28,
  color: '#17202A',
  strokeWidth: 2,
};

export function MedicalIcon({
  size = defaults.size,
  color = defaults.color,
  strokeWidth = defaults.strokeWidth,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 21s-7-4.35-9.2-8.2C.7 9.35 2.1 5 6.2 5c2.1 0 3.4 1.2 4.3 2.6C11.4 6.2 12.7 5 14.8 5c4.1 0 5.5 4.35 3.4 7.8C17 16.65 12 21 12 21Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line
        x1="12"
        y1="9"
        x2="12"
        y2="15"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <Line
        x1="9"
        y1="12"
        x2="15"
        y2="12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function AmbulanceIcon({
  size = defaults.size,
  color = defaults.color,
  strokeWidth = defaults.strokeWidth,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 7h11v10H3V7Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <Path
        d="M14 10h3l4 4v3h-7v-7Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <Circle
        cx="7"
        cy="18"
        r="1.5"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <Circle
        cx="18"
        cy="18"
        r="1.5"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <Line
        x1="7"
        y1="9"
        x2="7"
        y2="13"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <Line
        x1="5"
        y1="11"
        x2="9"
        y2="11"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <Line
        x1="16"
        y1="10"
        x2="16"
        y2="14"
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
}

export function PoliceIcon({
  size = defaults.size,
  color = defaults.color,
  strokeWidth = defaults.strokeWidth,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3 20 6v5c0 5-3.2 8.1-8 10-4.8-1.9-8-5-8-10V6l8-3Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <Path
        d="M12 8v6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <Path
        d="M9 11h6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function FirefighterIcon({
  size = defaults.size,
  color = defaults.color,
  strokeWidth = defaults.strokeWidth,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 21c4 0 7-2.8 7-6.6 0-3.1-1.9-5.6-4.7-7.7.2 2-1 3.3-2.3 3.9.2-3.6-1.7-6.1-4.1-7.6.2 3.1-2.9 5.2-2.9 9.3C5 18.2 8 21 12 21Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <Path
        d="M12 17.8c1.5 0 2.7-1 2.7-2.4 0-1-.5-1.9-1.5-2.7 0 1-.5 1.7-1.2 2-.1-1.2-.7-2.1-1.5-2.8-.1 1.5-1.2 2.3-1.2 3.5 0 1.4 1.2 2.4 2.7 2.4Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function PhoneIcon({
  size = defaults.size,
  color = defaults.color,
  strokeWidth = defaults.strokeWidth,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 4h3l2 5-2 1.5c1 2.1 2.4 3.5 4.5 4.5L14 13l5 2v3c0 1.1-.9 2-2 2C10.4 20 4 13.6 4 6c0-1.1.9-2 2-2Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function AlertIcon({
  size = defaults.size,
  color = defaults.color,
  strokeWidth = defaults.strokeWidth,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3 21 20H3L12 3Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <Line
        x1="12"
        y1="9"
        x2="12"
        y2="14"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <Circle cx="12" cy="17" r="1" fill={color} />
    </Svg>
  );
}

export function GuideIcon({
  size = defaults.size,
  color = defaults.color,
  strokeWidth = defaults.strokeWidth,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <Path
        d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <Line
        x1="8"
        y1="7"
        x2="16"
        y2="7"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <Line
        x1="8"
        y1="11"
        x2="14"
        y2="11"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function SimulatorIcon({
  size = defaults.size,
  color = defaults.color,
  strokeWidth = defaults.strokeWidth,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="4"
        y="3"
        width="16"
        height="18"
        rx="3"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <Polyline
        points="10,8 14,12 10,16"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function InfoIcon({
  size = defaults.size,
  color = defaults.color,
  strokeWidth = defaults.strokeWidth,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx="12"
        cy="12"
        r="9"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <Line
        x1="12"
        y1="10"
        x2="12"
        y2="16"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <Circle cx="12" cy="7" r="1" fill={color} />
    </Svg>
  );
}

export function CheckIcon({
  size = defaults.size,
  color = defaults.color,
  strokeWidth = defaults.strokeWidth,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Polyline
        points="5,12 10,17 19,7"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function BackIcon({
  size = defaults.size,
  color = defaults.color,
  strokeWidth = defaults.strokeWidth,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Polyline
        points="15,18 9,12 15,6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export {
  MedicalIcon as CrossIcon,
};