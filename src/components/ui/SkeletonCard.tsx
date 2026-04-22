import { Skeleton } from './skeleton';

interface SkeletonCardProps {
  variant?: 'card' | 'list' | 'screen';
  count?: number;
  className?: string;
}

export function SkeletonCard({ variant = 'card', count = 1, className = '' }: SkeletonCardProps) {
  const renderCard = () => (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-4 ${className}`}>
      <div className="flex items-start space-x-4">
        <Skeleton className="w-20 h-20 rounded-lg" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-5/6" />
          <div className="flex space-x-2 pt-2">
            <Skeleton className="h-8 w-16 rounded-lg" />
            <Skeleton className="h-8 w-16 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderList = () => (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
      <div className="space-y-3">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );

  const renderScreen = () => (
    <div className={`space-y-6 p-6 ${className}`}>
      <Skeleton className="h-8 w-1/2" />
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
      <Skeleton className="h-40 w-full rounded-lg" />
      <div className="flex space-x-3">
        <Skeleton className="h-10 w-1/3 rounded-lg" />
        <Skeleton className="h-10 w-1/3 rounded-lg" />
      </div>
    </div>
  );

  const renderSkeleton = () => {
    switch (variant) {
      case 'list':
        return renderList();
      case 'screen':
        return renderScreen();
      default:
        return renderCard();
    }
  };

  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="animate-pulse">
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
}
