import type { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

function SvgIcon({ size = 24, children, ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M3.75 10.5L12 3.75L20.25 10.5V19.5C20.25 20.3284 19.5784 21 18.75 21H14.25V15.75H9.75V21H5.25C4.42157 21 3.75 20.3284 3.75 19.5V10.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </SvgIcon>
  );
}

export function CompassIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M15.9 8.1L13.5 13.5L8.1 15.9L10.5 10.5L15.9 8.1Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </SvgIcon>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="11" cy="11" r="6.25" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 16L20 20" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </SvgIcon>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 5V19" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      <path d="M5 12H19" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </SvgIcon>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M14.75 5.75L8.75 12L14.75 18.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.9"
      />
    </SvgIcon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M6 6L18 18" stroke="currentColor" strokeLinecap="round" strokeWidth="1.9" />
      <path d="M18 6L6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="1.9" />
    </SvgIcon>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M9.25 5.75L15.25 12L9.25 18.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.9"
      />
    </SvgIcon>
  );
}

export function CameraIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M5.25 7.25H8L9.25 5.25H14.75L16 7.25H18.75C19.5784 7.25 20.25 7.92157 20.25 8.75V17.25C20.25 18.0784 19.5784 18.75 18.75 18.75H5.25C4.42157 18.75 3.75 18.0784 3.75 17.25V8.75C3.75 7.92157 4.42157 7.25 5.25 7.25Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="13" r="3.25" stroke="currentColor" strokeWidth="1.8" />
    </SvgIcon>
  );
}

export function HashIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M9 4L7 20" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      <path d="M17 4L15 20" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      <path d="M4 9H20" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      <path d="M3 15H19" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </SvgIcon>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="12" cy="8.25" r="3.25" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5.25 19.25C6.47022 16.7699 8.86879 15.25 12 15.25C15.1312 15.25 17.5298 16.7699 18.75 19.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </SvgIcon>
  );
}

export function ShareIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="17.5" cy="5.5" r="2.25" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="6.5" cy="12" r="2.25" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="18.5" r="2.25" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.5 11L15.5 6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.5 13L15.5 17.5" stroke="currentColor" strokeWidth="1.8" />
    </SvgIcon>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M12 21C12 21 18 14.9256 18 10.125C18 6.74226 15.3137 4 12 4C8.68629 4 6 6.74226 6 10.125C6 14.9256 12 21 12 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="10.25" r="1.9" stroke="currentColor" strokeWidth="1.8" />
    </SvgIcon>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M6.75 4.75H9.5L10.75 8L9.25 9.5C10.1619 11.2717 11.7283 12.8381 13.5 13.75L15 12.25L18.25 13.5V16.25C18.25 16.6642 18.0854 17.0618 17.7924 17.3549C17.4993 17.6479 17.1017 17.8125 16.6875 17.8125C13.2397 17.6024 9.99493 16.1383 7.54891 13.6923C5.10289 11.2463 3.63882 8.00155 3.42871 4.55371C3.42871 4.13951 3.5933 3.74188 3.88633 3.44885C4.17936 3.15583 4.57699 2.99121 4.99121 2.99121H6.75V4.75Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </SvgIcon>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M12 20.5L10.695 19.285C6.06 14.995 3 12.145 3 8.65C3 5.8 5.235 3.75 8.025 3.75C9.6 3.75 11.115 4.485 12 5.64C12.885 4.485 14.4 3.75 15.975 3.75C18.765 3.75 21 5.8 21 8.65C21 12.145 17.94 14.995 13.305 19.285L12 20.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </SvgIcon>
  );
}

export function SettingsIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M19.5 12C19.5 12.3454 19.4657 12.6818 19.4004 13.0069L21 14.25L19.5 16.75L17.6 16.1C17.0906 16.5456 16.5007 16.8964 15.856 17.131L15.5 19.25H12.5L12.144 17.131C11.4993 16.8964 10.9094 16.5456 10.4 16.1L8.5 16.75L7 14.25L8.5996 13.0069C8.53428 12.6818 8.5 12.3454 8.5 12C8.5 11.6546 8.53428 11.3182 8.5996 10.9931L7 9.75L8.5 7.25L10.4 7.9C10.9094 7.45444 11.4993 7.10358 12.144 6.869L12.5 4.75H15.5L15.856 6.869C16.5007 7.10358 17.0906 7.45444 17.6 7.9L19.5 7.25L21 9.75L19.4004 10.9931C19.4657 11.3182 19.5 11.6546 19.5 12Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </SvgIcon>
  );
}

export function Share2Icon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="18" cy="5.5" r="2.25" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="6" cy="12" r="2.25" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="18.5" r="2.25" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 11L15.8 6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 13L15.8 17.5" stroke="currentColor" strokeWidth="1.8" />
    </SvgIcon>
  );
}

export function PenToolIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M12.5 6.5L17.5 11.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
      <path
        d="M5 19L7.75 18.25L16.5 9.5C17.3284 8.67157 17.3284 7.32843 16.5 6.5L15.5 5.5C14.6716 4.67157 13.3284 4.67157 12.5 5.5L3.75 14.25L3 17L5 19Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </SvgIcon>
  );
}

export function MessageSquareIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M6.25 17.5L3.75 20V6.75C3.75 5.92157 4.42157 5.25 5.25 5.25H18.75C19.5784 5.25 20.25 5.92157 20.25 6.75V15.25C20.25 16.0784 19.5784 16.75 18.75 16.75H7L6.25 17.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </SvgIcon>
  );
}

export function SendIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M20 4L11 13"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M20 4L14.5 20L11 13L4 9.5L20 4Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </SvgIcon>
  );
}

export function BookmarkIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M7.5 4.25H16.5C17.0523 4.25 17.5 4.69772 17.5 5.25V19.25L12 15.5L6.5 19.25V5.25C6.5 4.69772 6.94772 4.25 7.5 4.25Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </SvgIcon>
  );
}

export function MoreHorizontalIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="6" cy="12" fill="currentColor" r="1.75" />
      <circle cx="12" cy="12" fill="currentColor" r="1.75" />
      <circle cx="18" cy="12" fill="currentColor" r="1.75" />
    </SvgIcon>
  );
}

export function NavigationIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M20 4L14 20L11 13L4 10L20 4Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </SvgIcon>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M12 3.75L14.4721 8.75785L20 9.56434L16 13.4634L16.9443 19L12 16.3993L7.05573 19L8 13.4634L4 9.56434L9.52786 8.75785L12 3.75Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
}

export function ThumbsUpIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M9.5 10.25V19.25H6.25C5.55964 19.25 5 18.6904 5 18V11.5C5 10.8096 5.55964 10.25 6.25 10.25H9.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M9.5 10.25L12.5 4.75C13.4225 4.75 14.116 5.59028 13.9413 6.49606L13.25 10.25H17.3033C18.1822 10.25 18.8264 11.0774 18.6116 11.9297L17.0783 18.013C16.9376 18.5714 16.4358 18.9625 15.86 18.9625H9.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </SvgIcon>
  );
}
