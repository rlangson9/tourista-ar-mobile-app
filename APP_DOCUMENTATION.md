# Tourista AR Mobile App - Complete Documentation

## 1. App Overview

Tourista AR is a mobile application that combines immersive travel experiences with intelligent trade facilitation. The app leverages AR (Augmented Reality) technology to enhance destination exploration while providing a platform for seamless product sourcing through AI-driven trade features.

### Core Vision
"Where immersive travel meets intelligent trade."

## 2. Key Features

### 2.1 Travel Mode
- AR-powered destination exploration
- Featured experiences showcase
- Tour booking and management
- Interactive travel guides

### 2.2 Trade Mode
- Product discovery and sourcing
- Verified supplier listings
- Bulk ordering capabilities
- Negotiation tools
- Trade deals and promotions

### 2.3 AI Assistant
- Real-time translation services
- Image recognition and translation
- Voice-to-text transcription
- AI-powered travel/trade recommendations

### 2.4 Language Support
- Multi-language support (6 languages)
  - English
  - Chinese
  - French
  - Shona
  - Swahili
  - Zulu
- In-app language switching
- Persistent language preference

### 2.5 User Management
- Multiple account types (Traveler, Partner, Supplier, Admin)
- Profile management
- Loyalty program integration
- Secure authentication

## 3. Technical Architecture

### 3.1 Technology Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 4.5.14
- **Styling**: Tailwind CSS 4.1.3
- **UI Components**: Radix UI, Lucide React Icons
- **Animation**: Framer Motion
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Mobile Support**: Capacitor

### 3.2 Component Structure

```
src/
├── components/           # UI Components
│   ├── Onboarding.tsx       # Onboarding flow
│   ├── HomeScreen.tsx       # Main home screen
│   ├── ExploreScreen.tsx    # Explore destinations/products
│   ├── ProfileScreen.tsx    # User profile
│   ├── BottomNav.tsx        # Bottom navigation
│   ├── AIAssistant.tsx      # AI features
│   └── ...
├── i18n/               # Internationalization
│   ├── LanguageContext.tsx  # Language state management
│   └── translations.ts      # Translation dictionary
├── data/               # Mock data
│   └── mockData.ts
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

### 3.3 State Management

#### Language Context
The app uses React Context API for language state management:

**LanguageContext.tsx** - Provides:
- `language`: Current selected language code
- `setLanguage`: Function to change language
- `t()`: Translation function to get localized strings

**translations.ts** - Contains all UI strings translated into 6 languages with structure:
```typescript
Record<Language, Record<string, string>>
```

## 4. User Flow

### 4.1 Onboarding Flow
1. **Welcome Screen** - App introduction with AR showcase
2. **Language Selection** - Choose preferred language (persists via localStorage)
3. **Interest Selection** - Select travel/trade interests
4. **Role Selection** - Choose account type (User/Partner/Supplier)
5. **Authentication** - Sign up or sign in

### 4.2 Main App Flow
```
Onboarding → Home Screen → Explore → Details → Booking/Ordering
                                    ↓
                              Profile/Settings
```

### 4.3 Language Switching Flow
1. User selects language from onboarding or profile settings
2. `setLanguage()` updates context state
3. All components re-render with translated strings
4. Language preference saved to localStorage

## 5. Core Components

### 5.1 Onboarding Component
- Multi-step onboarding process
- Language selection with immediate translation preview
- Role-based routing (Traveler → Mobile App, Partner/Supplier → Web Portal)

### 5.2 Home Screen
- Mode toggle (Travel/Trade)
- Featured content carousel
- Quick access to AR experiences
- Search functionality
- Settings dropdown

### 5.3 Bottom Navigation
- Home, Explore, AR Experience, Bookings, Profile
- Persistent navigation across screens

### 5.4 AI Assistant
- Text translation
- Image translation (camera/upload)
- Voice transcription
- AI chat for travel/trade queries

### 5.5 Profile Screen
- User information management
- Loyalty points display
- Payment methods
- Language & currency settings
- Security settings

## 6. Data Management

### 6.1 Local State
- UI state managed with React useState/useContext
- Language preference stored in localStorage
- Session data stored in memory

### 6.2 Backend Integration
- REST API for authentication
- Tour/Product data retrieval
- Booking/Order management
- User profile synchronization

### 6.3 Mock Data
- `mockData.ts` contains sample tours, products, and categories
- Used for development and demonstration

## 7. Language Implementation Details

### 7.1 Translation Keys Structure
```
onboarding.slide0.headline    - Welcome screen headline
onboarding.lang.title         - Language selection title
home.travel                   - Travel mode label
home.trade                    - Trade mode label
nav.home                      - Navigation home label
profile.logout                - Logout button text
common.back                   - Back button text
```

### 7.2 Translation Function
```typescript
const t = (key: string): string => {
  return translations[language][key] || key;
};
```

### 7.3 Usage Example
```tsx
import { useLanguage } from '../i18n/LanguageContext';

function MyComponent() {
  const { t, setLanguage } = useLanguage();
  
  return (
    <button onClick={() => setLanguage('zh')}>
      {t('common.confirm')}
    </button>
  );
}
```

## 8. AR Features

### 8.1 AR Experience
- AR-powered destination visualization
- Interactive 3D content overlay
- Camera integration for real-world interaction

### 8.2 Image Translation
- Camera capture for text recognition
- Real-time translation overlay
- Support for multiple languages

## 9. Trade Features

### 9.1 Product Discovery
- Category-based browsing
- Supplier verification badges
- Price comparison
- Bulk ordering options

### 9.2 Negotiation Tools
- Request for quotation
- Price negotiation interface
- Order tracking

## 10. Admin Portal

### 10.1 Access
- Special admin login route (`/admin-portal`)
- Secure password authentication
- Separate admin dashboard

### 10.2 Features
- User management
- Content moderation
- Analytics and reporting

## 11. Development Environment

### 11.1 Running the App
```bash
npm run dev          # Start all services
npm run dev:app      # Start only frontend
npm run dev:backend  # Start only backend
```

### 11.2 Ports
- Main App: http://localhost:3000
- Admin Portal: http://localhost:3001
- Backend API: http://localhost:5002

## 12. Build and Deployment

### 12.1 Production Build
```bash
npm run build        # Build both app and admin
npm run build:app    # Build only main app
```

### 12.2 Mobile Deployment
```bash
npx cap add ios      # Add iOS platform
npx cap add android  # Add Android platform
npx cap sync         # Sync project files
```

## 13. Key Integration Points

### 13.1 External APIs
- Google Fonts (Cormorant Garamond, Playfair Display)
- DeepSeek API (AI features)
- MongoDB Atlas (Database)

### 13.2 Internal APIs
- Authentication endpoints
- Tour/Product data endpoints
- Booking/Order management endpoints

## 14. Security Considerations

- JWT-based authentication
- Secure password hashing
- Input validation
- API rate limiting
- HTTPS in production

## 15. Performance Optimization

- Lazy loading of components
- Code splitting
- Image optimization
- Efficient state management
- Caching strategies

---

## Appendix: Language Codes

| Code | Language | Native Name |
|------|----------|-------------|
| en | English | English |
| zh | Chinese | 中文 |
| fr | French | Français |
| sn | Shona | ChiShona |
| sw | Swahili | Kiswahili |
| zu | Zulu | isiZulu |

---

**Document Version**: 1.0  
**Last Updated**: May 2026  
**Project**: Tourista AR Mobile App