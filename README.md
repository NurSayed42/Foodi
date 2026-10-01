# Foodi

Cross-platform food-ordering mobile app built with React Native, TypeScript and Firebase Authentication.

---

## Features

- Email/password registration and login with Firebase Authentication
- Splash screen and home screen with food categories and popular items
- Food detail screen with image, description and price
- Order summary and delivery-information flow
- Order confirmation screen
- Order history screen
- Stack-based navigation with React Navigation

## Tech Stack

| Area | Technology |
|---|---|
| Framework | React Native 0.79 (bare workflow), TypeScript |
| Navigation | React Navigation |
| Auth | Firebase Authentication (`@react-native-firebase/auth`) |
| Tooling | Metro, ESLint, Prettier, Jest |

## Project Structure

```
src/
├── firebase/       # Firebase initialisation
├── navigation/     # AppNavigator
└── screens/        # Splash, Login, Register, Home, FoodDetail,
                    # OrderSummary, DeliveryInfo, Success, OrderHistory
assets/images/      # app images and icons
android/, ios/      # native projects
App.tsx             # entry point
```

## Getting Started

### Prerequisites

- Node.js and npm
- Android Studio (Android) and/or Xcode (iOS, macOS only)
- A Firebase project with Email/Password authentication enabled, with its config files added to the native projects (`google-services.json` for Android, `GoogleService-Info.plist` for iOS)

### Run

```bash
git clone https://github.com/NurSayed42/Foodi.git
cd Foodi
npm install

npx react-native run-android
# or, on macOS
cd ios && pod install && cd ..
npx react-native run-ios
```

See the React Native [troubleshooting guide](https://reactnative.dev/docs/troubleshooting) if the build fails.

## Author

**Nur Sayed** — [GitHub](https://github.com/NurSayed42)
