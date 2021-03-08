export const isSmartPhone =
  typeof window !== 'undefined'
    ? window.matchMedia('(max-device-width: 640px)').matches
    : false
