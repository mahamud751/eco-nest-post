// components/atoms/Spinner.tsx
export const Spinner = () => (
  <div className="spinner">
    <style jsx>{`
      .spinner {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 8px solid rgba(255, 255, 255, 0.3);
        border-top: 8px solid #0070f3;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);
