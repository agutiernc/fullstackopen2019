import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'

// mock for local storage functiionality
let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: (key) => savedItems[key],
  clear: () => {
    savedItems = {}
  }
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

