# Fake Store E-Commerce Application

A modern e-commerce application built with Next.js 14, TypeScript, and Styled Components.

## 🚀 Features

- ✅ Product listing with pagination (10 items per page)
- ✅ Search functionality by product title
- ✅ Category filtering
- ✅ Price range filtering
- ✅ Sort by price (ascending/descending)
- ✅ Product detail pages
- ✅ Shopping cart with localStorage persistence
- ✅ Responsive design (Mobile & Desktop)
- ✅ Server-side rendering
- ✅ URL-based state management

## 🛠️ Technologies

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Styled Components
- **State Management:** React Context API
- **Data Fetching:** Axios / Native Fetch API
- **Testing:** Jest & React Testing Library
- **API:** Fake Store API

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/            # React components (Atomic Design)
│   ├── atoms/            # Basic UI elements
│   ├── molecules/        # Composite components
│   ├── organisms/        # Complex UI sections
│   └── templates/        # Page templates
├── contexts/             # React Context providers
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and API functions
├── styles/               # Global styles and theme
└── types/                # TypeScript type definitions
```

## 🏗️ Atomic Design Structure

### Atoms
Basic building blocks of the UI:
- **Button:** Reusable button with variants
- **Card:** Container component
- **Badge:** Status/category indicators
- **Rating:** Star rating display
- **Input:** Form input fields

### Molecules
Combinations of atoms:
- **ProductCard:** Product display card
- **SearchBar:** Search input with functionality
- **SortDropdown:** Sorting selector
- **FilterPanel:** Category and price filters

### Organisms
Complex components:
- **Header:** Navigation and cart display
- **ProductGrid:** Responsive product grid
- **Pagination:** Page navigation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ygtuysal/fake-store-app.git
cd fake-store-app

```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
# Optional: For network issues
NODE_TLS_REJECT_UNAUTHORIZED=0
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate test coverage report
```

## 🧪 Testing

Run unit tests:
```bash
npm run test
```

Generate coverage report:
```bash
npm run test:coverage
```

### Test Coverage
✅ **Current coverage: >60%**

```
---------------------------------|---------|----------|---------|---------|-------------------
All files                        |    71.6 |    80.45 |   64.55 |    72.2 |                   
 src                             |     100 |      100 |     100 |     100 |                   
  test-utils.tsx                 |     100 |      100 |     100 |     100 |                   
 src/app                         |   69.92 |    97.72 |      50 |   69.53 |                   
  error.tsx                      |       0 |      100 |       0 |       0 | 3-31             
  layout.tsx                     |       0 |      100 |       0 |       0 | 1-20             
  loading.tsx                    |       0 |      100 |       0 |       0 | 3-31             
  not-found.tsx                  |       0 |      100 |       0 |       0 | 3-40             
  page.client.tsx                |     100 |    96.66 |     100 |     100 | 30               
  page.tsx                       |     100 |      100 |     100 |     100 |                  
 src/app/products/[id]           |       0 |      100 |       0 |       0 |                  
  page.tsx                       |       0 |      100 |       0 |       0 | 1-48             
 src/components/providers        |       0 |      100 |       0 |       0 |                  
  Providers.tsx                  |       0 |      100 |       0 |       0 | 3-10             
 src/contexts                    |   97.36 |       70 |     100 |   97.22 |                  
  CartContext.tsx                |   97.36 |       70 |     100 |   97.22 | 83               
 src/hooks                       |   86.66 |    58.33 |   83.33 |   85.71 |                  
  useLocalStorage.ts             |   86.66 |    58.33 |   83.33 |   85.71 | 37-41            
 src/lib                         |   77.92 |     61.9 |   76.92 |   80.88 |                  
  api.ts                         |   89.83 |    70.58 |     100 |    90.9 | 25,36,56,73,88   
  imageLoader.ts                 |   77.77 |       25 |     100 |     100 | 16-20            
  styled-components-registry.tsx |       0 |      100 |       0 |       0 | 3-16             
 src/styles                      |   27.27 |      100 |       0 |   28.57 |                  
  global.ts                      |       0 |      100 |       0 |       0 | 1-17             
  theme.ts                       |      75 |      100 |     100 |     100 |                  
---------------------------------|---------|----------|---------|---------|-------------------
```

## 🌐 API Endpoints

The application uses the [Fake Store API](https://fakestoreapi.com/):

- `GET /products` - Get all products
- `GET /products/:id` - Get single product
- `GET /products/categories` - Get all categories
- `GET /products/category/:category` - Get products by category

## 🎨 Styling & Theme

The project uses Styled Components with a custom theme:

## Light/Dark Mode Support

Automatic Detection: Detects system color scheme preference
Manual Toggle: Users can switch between themes using the toggle in header
Persistent Choice: Theme preference saved in localStorage
Smooth Transitions: All theme changes are animated

## Theme Structure

```typescript
const theme = {
  colors: {
    primary: '#0070f3',
    secondary: '#ff6347',
    // ...
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1440px',
  },
  // ...
};
```

## 📱 Responsive Design

- **Mobile:** < 768px (Single column)
- **Tablet:** 768px - 1024px (2 columns)
- **Desktop:** > 1024px (4 columns)

## 🐛 Known Issues

1. **API Fetch Issues:** Some environments may experience fetch failures. If this occurs:
   - Check your network connection
   - Try using a VPN or different network
   - Install and use axios instead of native fetch

2. **Hydration Warnings:** Minor warnings due to localStorage usage in SSR

## 🔄 Git Workflow

```bash
main            # Production branch
└── development # Development branch
    └── feature/* # Feature branches
```

### Commit Convention
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test updates
- `chore:` Build/config changes

📊 Lighthouse Skorları
Kategori	Skor
⚡ Performans	90
♿ Erişilebilirlik	96
🔐 Best Practices	100
🔍 SEO	100

Version History

v0.3.0 - Dark/Light theme support added
v0.2.0 - Unit tests implemented (>60% coverage)
v0.1.0 - Initial release with core features