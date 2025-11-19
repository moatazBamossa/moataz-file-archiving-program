import { create } from 'zustand'

interface ThemeState {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  setTheme: (theme: 'light' | 'dark') => void
}

export const useThemeStore = create<ThemeState>((set) => {
  // Initialize theme from localStorage
  const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
  const initialTheme = storedTheme || 'light'
  
  if (initialTheme === 'dark') {
    document.documentElement.classList.add('dark')
  }

  return {
    theme: initialTheme,
    toggleTheme: () =>
      set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light'
        document.documentElement.classList.toggle('dark')
        localStorage.setItem('theme', newTheme)
        return { theme: newTheme }
      }),
    setTheme: (theme) => {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      localStorage.setItem('theme', theme)
      set({ theme })
    },
  }
})

