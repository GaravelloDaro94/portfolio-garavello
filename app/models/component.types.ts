// Component Props Types
export interface TypewriterTitleProps {
  readonly text: string;
  readonly className?: string;
  readonly typingSpeed?: number;
}

export interface TypewriterEffectProps {
  readonly phrases: string[];
  readonly typingSpeed?: number;
  readonly deletingSpeed?: number;
  readonly pauseDuration?: number;
}

export interface FadeInCardProps {
  readonly children: React.ReactNode;
  readonly delay?: number;
  readonly className?: string;
}

export interface HorizontalScrollProps {
  children: React.ReactNode;
}

export interface UmamiAnalyticsProps {
  websiteId?: string;
  src?: string;
}

export interface UmamiWindow extends Window {
  umami?: {
    track: (eventName: string, eventData?: Record<string, unknown>) => void;
  };
}
