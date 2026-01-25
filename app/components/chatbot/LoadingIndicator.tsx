import { LoadingIndicatorProps } from "../../models";

export function LoadingIndicator({ backgroundColor, dotColor }: Readonly<LoadingIndicatorProps>) {
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl px-4 py-3" style={{ backgroundColor }}>
        <div className="flex gap-1">
          <span 
            className="w-2 h-2 rounded-full animate-bounce" 
            style={{ backgroundColor: dotColor }} 
          />
          <span 
            className="w-2 h-2 rounded-full animate-bounce delay-100" 
            style={{ backgroundColor: dotColor }} 
          />
          <span 
            className="w-2 h-2 rounded-full animate-bounce delay-200" 
            style={{ backgroundColor: dotColor }} 
          />
        </div>
      </div>
    </div>
  );
}