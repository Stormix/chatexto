import { cn } from '@/lib/utils';

interface LoadingProps {
  className?: string;
}

const Loading = ({ className }: LoadingProps) => {
  return (
    <svg
      className={cn('animate-spin', className)}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        fill="url(#paint0_angular_1_473)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M22.7816 9.60071C23.3294 9.53004 23.8307 9.91679 23.9014 10.4645C23.9671 10.9737 24 11.4866 24 12C24 12.5523 23.5523 13 23 13C22.4477 13 22 12.5523 22 12C22 11.5722 21.9725 11.1448 21.9178 10.7204C21.8471 10.1727 22.2339 9.67138 22.7816 9.60071Z"
        fill="#6105A7"
      />
      <defs>
        <radialGradient
          id="paint0_angular_1_473"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(12 12) scale(12)"
        >
          <stop stop-color="#27AE60" stop-opacity="0" />
          <stop offset="0.0001" stop-color="#6105A7" stop-opacity="0" />
          <stop offset="1" stop-color="#6105A7" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default Loading;
