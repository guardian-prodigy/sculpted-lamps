import React from 'react';
import Skeleton from 'react-loading-skeleton';

export const SkeletonLoader = () => {
  return (
    <div className="skeleton-loader">
      <Skeleton height={200} />
    </div>
  );
};

