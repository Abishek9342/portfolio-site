type IconProps = { size?: number; className?: string };

export function GithubIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
      0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01
      1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
      0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27
      2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82
      1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01
      2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export function LinkedInIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
      <path d="M14.82 0H1.18C.53 0 0 .52 0 1.16v13.68C0 15.48.53 16
      1.18 16h13.64c.65 0 1.18-.52 1.18-1.16V1.16C16 .52 15.47 0 14.82 0zM4.75
      13.65H2.4V6.05h2.35v7.6zM3.58 5.03a1.36 1.36 0 110-2.72 1.36 1.36 0 010 2.72zM13.65
      13.65h-2.34V9.96c0-.88-.02-2-1.22-2-1.23 0-1.42.96-1.42 1.95v3.74H6.33V6.05h2.25v1.04h.03c.31-.59
      1.08-1.22 2.23-1.22 2.39 0 2.83 1.57 2.83 3.62v4.16z" />
    </svg>
  );
}

export function KaggleIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
      <path d="M15.87 15.53c-.06.09-.19.14-.36.14h-2.63c-.19
      0-.35-.03-.46-.13a1.6 1.6 0 01-.32-.34l-3.36-4.35-.94.9v3.4c0 .3-.24.42-.53.42H5.4c-.29
      0-.53-.12-.53-.42V.5c0-.3.24-.5.53-.5H7.3c.29 0 .53.2.53.5v9.14l3.99-4.14c.11-.12.24-.24.38-.34.14-.1.32-.15.53-.15h2.72c.2
      0 .33.09.38.24a.4.4 0 01-.09.4l-4.53 4.45 4.87 6.36c.1.13.13.28.09.4a.4.4 0 01-.4.13z" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
      <path d="M13.6 2.33A7.85 7.85 0 008 0 7.94 7.94 0 00.36 10.9L0 16l5.24-.37A7.93 7.93 0 008 16a7.94
      7.94 0 007.94-7.94c0-2.12-.83-4.11-2.34-5.73zM8 14.55a6.53 6.53 0 01-3.33-.91l-.24-.14-2.47.65.66-2.41-.16-.25a6.55
      6.55 0 0110.03-8.4A6.5 6.5 0 0114.5 8.1 6.56 6.56 0 018 14.55zm3.58-4.9c-.2-.1-1.16-.57-1.34-.64-.18-.07-.31-.1-.44.1-.13.2-.5.64-.62.77-.11.13-.23.15-.42.05a5.4
      5.4 0 01-1.6-.98 5.98 5.98 0 01-1.1-1.37c-.12-.2 0-.3.09-.4.09-.1.2-.24.29-.36.1-.12.13-.2.2-.33.06-.13.03-.25-.02-.35-.05-.1-.44-1.06-.6-1.45-.16-.38-.32-.33-.44-.33h-.38c-.13
      0-.34.05-.52.24-.18.2-.68.66-.68 1.6s.7 1.86.8 2c.1.13 1.38 2.1 3.34 2.95.47.2.83.32 1.12.42.47.15.9.13
      1.24.08.38-.06 1.16-.47 1.32-.93.16-.45.16-.84.11-.93-.05-.09-.18-.14-.38-.24z" />
    </svg>
  );
}

export function ArrowUpRightIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 12L12 4M12 4H5.5M12 4V10.5" />
    </svg>
  );
}

export function MailIcon({ size = 15, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="1.5" y="3" width="13" height="10" rx="1.6" />
      <path d="M2 4l6 5 6-5" />
    </svg>
  );
}

export function DownloadIcon({ size = 15, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 1.5v9M4.5 7l3.5 3.5L11.5 7M2 13.5h12" />
    </svg>
  );
}
