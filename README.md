![Status projeto](https://img.shields.io/badge/STATUS-Finished-blue?style=for-the-badge)

# Challenge 3 - Persistence Squad * TI_Rex
## Leonildo Linck

## 📌 About

This repository contains the complete solution for Challenge 3 of the Compass UOL scholarship program. The goal of the challenge is to create an e-commerce platform with multiple pages, strictly adhering to the design provided in [Figma](https://www.figma.com/design/coo5RnXfpHBGkx94Q4yryH/Desafio-3?node-id=0-1&t=UJVNTPcdHpVanoTE-1). The project implements all the mandatory functionalities described in [Notion](https://thrilling-trilby-12c.notion.site/AWS-REACT-NOV24-DESAFIO-03-18bbe4fbfa3780f9b628ddce8a1ede7e).



## 🚀 Technologies used

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Redux](https://img.shields.io/badge/NodeJS-646CFF?style=for-the-badge&logo=node.js&logoColor=white)
![JSON Server](https://img.shields.io/badge/JSON%20Server-323330?style=for-the-badge&logo=json&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-F7DF1E?style=for-the-badge&logo=clerk&logoColor=black)
![Redux](https://img.shields.io/badge/Redux-646CFF?style=for-the-badge&logo=redux&logoColor=white)

 

## Implemented Pages

## 1. Home
### Desktop
<img src="https://github.com/leonildolinck/ti-rex-challenge3-persistence/blob/main/screenshots/home.png" />

## 2. Shop
### Desktop
<img src="https://github.com/leonildolinck/ti-rex-challenge3-persistence/blob/main/screenshots/shop.png" />

## 3. Login
### Desktop
<img src="https://github.com/leonildolinck/ti-rex-challenge3-persistence/blob/main/screenshots/login.png" />

## 4. Register
### Desktop
<img src="https://github.com/leonildolinck/ti-rex-challenge3-persistence/blob/main/screenshots/register.png" />

## 5 Profile 
### Desktop
<img src="https://github.com/leonildolinck/ti-rex-challenge3-persistence/blob/main/screenshots/profile.png" />

### Overlay
<img src="https://github.com/leonildolinck/ti-rex-challenge3-persistence/blob/main/screenshots/invoices.png" />

## 6. Cart
### Desktop
<img src="https://github.com/leonildolinck/ti-rex-challenge3-persistence/blob/main/screenshots/cart.png" />

### Overlay
<img src="https://github.com/leonildolinck/ti-rex-challenge3-persistence/blob/main/screenshots/cart-overlay.png" />

## 7. Checkout
### Desktop
<img src="https://github.com/leonildolinck/ti-rex-challenge3-persistence/blob/main/screenshots/checkout.png" />

## 8. Contact
### Desktop
<img src="https://github.com/leonildolinck/ti-rex-challenge3-persistence/blob/main/screenshots/contact.png" />

### By Page/Component:

#### **Home**
- Email validation in the form.  
- Styled modal for newsletter subscription confirmation.  

#### **Login**
- Email and password validation (specific rules in the instructions).  
- Google/Facebook login setup with Clerk.  
- Styled error display.  

#### **Register**
- Detailed field validation (check specific rules).  
- Google/Facebook login setup with Clerk.  

#### **Shop**
- Display products in a grid or list.  
- Add filters by name and price.

#### **Product Page**
- Product details (name, description, price, image).
- Option to add to the cart.
- Option to share the product.

### **Contact Page**
- Contact form with field validation.
- Display of validation errors.

#### **Profile**
- Display of user information and their recent orders.  

#### **Additional Pages**
- Custom 404 error page.  

### Optional Requirements  

- Tests on Jest
- Interface improvements and additional functionalities.
- Posting orders via API and retrieving them.  
- Implementation of automated tests.  
- EC2 deployment setup.  


## Estrutura do Repositório
```
./
┃  src
┃ ┣ assets
┃ ┣ components
┃ ┃ ┣ cart
┃ ┃ ┃ ┣ cart.selectors.tsx
┃ ┃ ┃ ┗ slice.tsx
┃ ┃ ┣ common
┃ ┃ ┃ ┣ BottomBanner.test.tsx
┃ ┃ ┃ ┣ BottomBanner.tsx
┃ ┃ ┃ ┣ Button.tsx
┃ ┃ ┃ ┣ CheckoutForm.tsx
┃ ┃ ┃ ┣ LoadingSpinner.tsx
┃ ┃ ┃ ┣ Pagination.tsx
┃ ┃ ┃ ┣ PlaceOrder.tsx
┃ ┃ ┃ ┣ ProductCard.tsx
┃ ┃ ┃ ┣ ProductsGrid.tsx
┃ ┃ ┃ ┣ StarRating.tsx
┃ ┃ ┃ ┣ ThankYouOverlay.tsx
┃ ┃ ┃ ┣ ThumbnailCarousel.tsx
┃ ┃ ┃ ┗ TopBanner.tsx
┃ ┃ ┣ layout
┃ ┃ ┃ ┣ home
┃ ┃ ┃ ┃ ┣ BannerSection.tsx
┃ ┃ ┃ ┃ ┣ BrowseSection.tsx
┃ ┃ ┃ ┃ ┣ InspirationSection.tsx
┃ ┃ ┃ ┃ ┣ ProductsSection.tsx
┃ ┃ ┃ ┃ ┗ ShareSection.tsx
┃ ┃ ┃ ┣ CartSection.tsx
┃ ┃ ┃ ┣ CheckoutSection.tsx
┃ ┃ ┃ ┣ ContactSection.tsx
┃ ┃ ┃ ┣ Footer.tsx
┃ ┃ ┃ ┣ Header.tsx
┃ ┃ ┃ ┣ LoginSection.tsx
┃ ┃ ┃ ┣ NotFoundSection.tsx
┃ ┃ ┃ ┣ ProfileMobileSection.tsx
┃ ┃ ┃ ┣ ProtectedLayout.tsx
┃ ┃ ┃ ┣ RegisterSection.tsx
┃ ┃ ┃ ┣ ShopSection.tsx
┃ ┃ ┃ ┗ SingleProduct.tsx
┃ ┃ ┣ ui
┃ ┃ ┃ ┣ CartItem.tsx
┃ ┃ ┃ ┣ CartList.tsx
┃ ┃ ┃ ┣ CartModal.tsx
┃ ┃ ┃ ┣ CartPageItem.tsx
┃ ┃ ┃ ┣ InvoicesModal.tsx
┃ ┃ ┃ ┣ MobileMenu.tsx
┃ ┃ ┃ ┗ ProfileModal.tsx
┃ ┃ ┗ user
┃ ┃ ┃ ┣ action-types.tsx
┃ ┃ ┃ ┣ actions.tsx
┃ ┃ ┃ ┣ reducer.tsx
┃ ┃ ┃ ┗ slice.tsx
┃ ┣ hooks
┃ ┃ ┗ UserSync.tsx
┃ ┣ pages
┃ ┃ ┣ Cart.tsx
┃ ┃ ┣ Checkout.tsx
┃ ┃ ┣ Contact.tsx
┃ ┃ ┣ Home.tsx
┃ ┃ ┣ Login.tsx
┃ ┃ ┣ NotFound.tsx
┃ ┃ ┣ Profile.tsx
┃ ┃ ┣ Register.tsx
┃ ┃ ┗ Shop.tsx
┃ ┣ redux
┃ ┃ ┣ root-reducer.tsx
┃ ┃ ┗ store.tsx
┃ ┣ services
┃ ┃ ┣ ApiFetcher.tsx
┃ ┃ ┣ AuthCallback.tsx
┃ ┃ ┣ ProductInterface.tsx
┃ ┃ ┗ Profile.tsx
┃ ┣ styles
┃ ┃ ┣ grid.css
┃ ┃ ┣ index.css
┃ ┃ ┣ selectbox.css
┃ ┃ ┣ slide.css
┃ ┃ ┣ splider.css
┃ ┃ ┗ star.css
┃ ┣ App.tsx
┃ ┣ declaration.d.ts
┃ ┣ main.tsx
┃ ┣ setupTests.ts
┃ ┣ splide-augment.d.ts
┃ ┗ vite-env.d.ts
┣ .gitignore
┣ LICENSE
┣ README.md
┣ backlog.txt
┣ eslint.config.js
┣ index.html
┣ jest.config.mjs
┣ package-lock.json
┣ package.json
┣ postcss.config.js
┣ tailwind.config.js
┣ tsconfig.app.json
┣ tsconfig.json
┣ tsconfig.node.json
┗ vite.config.ts

```

## 🛠️ Como executar o projeto

Clone o repositório:

- Clone este repositório em sua máquina local usando o comando `git clone`.

  -git clone [Repo](https://github.com/leonildolinck/ti-rex-challenge3-persistence)


# Project Dependencies

This project uses the following dependencies:

- **Frontend Frameworks & Tools:**
  - `@clerk/clerk-react@5.22.10`: Authentication library for React applications.
  - `@coreui/react@5.4.1`: UI components library based on CoreUI design.
  - `@hookform/resolvers@3.10.0`: Integrates validation libraries with React Hook Form.
  - `@reduxjs/toolkit@2.5.1`: Efficient and standard way to write Redux logic.
  - `@splidejs/react-splide@0.7.12`: React wrapper for Splide slider.
  - `@splidejs/splide@4.1.4`: Flexible and lightweight slider library.
  - `lucide-react@0.474.0`: React icons library with consistent design.
  - `react@18.3.1`: JavaScript library for building user interfaces.
  - `react-dom@18.3.1`: Entry point for React to interact with the DOM.
  - `react-hook-form@7.54.2`: Performant library for handling form inputs.
  - `react-redux@9.2.0`: Official React bindings for Redux.
  - `react-router-dom@7.1.5`: Declarative routing for React applications.
  - `react-share@5.2.0`: Social media share buttons for React.
  - `redux@5.0.1`: Predictable state container for JavaScript apps.
  - `redux-logger@3.0.6`: Middleware for logging Redux actions and state changes.
  - `zod@3.24.1`: TypeScript-first schema declaration and validation library.

 - **Build Tools:**

  - `vite@6.0.5`: Next-generation frontend tooling for development and build.
  - `@vitejs/plugin-react@4.3.4`: Plugin for Vite to support React fast refresh and JSX.

- **CSS Framework:**

  - `tailwindcss@3.4.17`: Utility-first CSS framework for styling.
  - `postcss@8.5.1`: Tool for transforming CSS with JavaScript plugins.
  - `autoprefixer@10.4.20`: Adds vendor prefixes to CSS rules.

- **Development Tools:**

  - `eslint@9.17.0`: JavaScript linter to enforce code quality and consistency.
  - `@eslint/js@9.17.0`: Core configuration for ESLint.
  - `eslint-plugin-react-hooks@5.0.0`: ESLint rules for React hooks.
  - `eslint-plugin-react-refresh@0.4.16`: Plugin for ensuring fast refresh compatibility in React.
  - `globals@15.14.0`: Global variables configuration for ESLint.

- **Testing Tools:**

  - `jest@29.7.0`: JavaScript testing framework.
  - `jest-environment-jsdom@29.7.0`: JSDOM environment for Jest.
  - `babel-jest@29.7.0`: Babel integration for Jest.
  - `@testing-library/react@16.2.0`: Utilities for testing React components.
  - `@testing-library/jest-dom@6.6.3`: Custom Jest matchers for DOM node assertions.
  - `@types/jest@29.5.14`: Type definitions for Jest.


- **TypeScript Support:**

  - `typescript@5.7.3`: Language for type safety and development productivity.
  - `typescript-eslint@8.18.2`: Integration between TypeScript and ESLint.
  - `@types/react@18.3.18`: Type definitions for React.
  - `@types/react-dom@18.3.5`: Type definitions for React DOM.
  - `ts-jest@29.2.5`: Jest configuration for TypeScript.
  - `@babel/preset-typescript@7.26.0`: Babel preset for compiling TypeScript.

---

### Installing Dependencies
To install these dependencies, run:
```bash
npm install
```

### Running the Project
Use the following scripts defined in the `package.json`:
- **Development**: Starts the development server with Vite, Tailwind CSS, and JSON Server:
  ```bash
  npm run dev
  ```
- **Build**: Compiles the project for production:
  ```bash
  npm run build
  ```
- **Lint**: Runs ESLint to check for code issues:
  ```bash
  npm run lint
  ```
- **Preview**: Previews the production build:
  ```bash
  npm run preview
  ```
## Final Considerations ##

Link to website:

http://ec2-34-239-122-225.compute-1.amazonaws.com/

This project represents an important step in my learning journey, applying both theoretical and practical knowledge gained during the Compass Scholarship Program. While striving for simplicity and efficiency, there's always room for growth and improvement.

Thank you for taking the time to review this project. Your feedback, suggestions, or any collaboration opportunities are highly appreciated.

Feel free to reach out!

Email: leonildolinck@gmail.com
Discord: leonildo

