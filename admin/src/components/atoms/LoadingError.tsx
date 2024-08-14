import React from "react";

interface LoadingErrorProps {
  loading: boolean;
  error: Error | null;
  children: React.ReactNode;
}

const LoadingError: React.FC<LoadingErrorProps> = ({
  loading,
  error,
  children,
}) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <>{children}</>;
};

export default LoadingError;
