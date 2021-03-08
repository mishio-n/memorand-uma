export const isSmartPhone =
  typeof window !== 'undefined' ? window.screen.width >= 1024 : false
