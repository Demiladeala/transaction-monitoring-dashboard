# Transaction Monitoring Dashboard

## Objective
A responsive Transaction Monitoring Dashboard interface using React/Next.js and TypeScript.

## Features

### 1. Login Page

- Email & password fields with validation
- Loading state & error handling
- authentication logic

### 2. Dashboard Page

- Total Transactions, Flagged Transactions, Total Customers, Risk Score Summary
- Responsive card layout
- Simple chart/graph
- Loading skeletons
- Clean UI/UX

### 3. Transactions Table

- Columns: Customer Name, Amount, Risk Level, Status, Date
- Search, filter (status/risk), pagination
- Row click opens transaction details modal/drawer

### 4. Transaction Details Drawer/Modal

- Customer details, transaction history, risk indicators, timeline/activity

---

## Technical Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand (or React Query)
- **API/Data:** Mocked JSON data & mock APIs

---

## Setup Instructions

1. **Install dependencies:**

   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   # or
   bun install
   ```

2. **Run the development server:**

   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

3. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

Architecture Decisions

1. Project Structure & Scalability

The application follows a feature-driven architecture designed to improve scalability, maintainability, and separation of concerns.

The codebase is divided into:

src/components
Shared and reusable UI primitives used across multiple features.
Examples: buttons, cards, tables, modals, skeletons, badges, chart wrappers.
src/features
Contains isolated business domains such as:
authentication
dashboard analytics
transactions
theme management

Most features maintains its own:

components
hooks
services
API layer
schemas
types
utilities

This structure prevents unrelated logic from being tightly coupled and makes the application easier to extend as features grow.

The architecture also reduces large “god files” and encourages single-responsibility design.

2. Component Architecture

Components are intentionally separated by responsibility to maintain predictable data flow and improve reusability.

UI Components

Reusable presentation-only components located in:

/src/components

Characteristics:

no business logic
no API calls
reusable across features
fully prop-driven
focused on styling and rendering

Examples:

Cards
Inputs
Buttons
Tables
Skeleton loaders
Dialogs
Feature Components

Feature-scoped components located inside:

/src/features/\*

Responsibilities:

compose UI components
coordinate feature logic
consume hooks and services
manage feature-specific interactions

This separation improves:

readability
testability
scalability
onboarding for other developers

3. State Management Strategy

The application separates server state from client/UI state to avoid unnecessary complexity and prevent duplicated sources of truth.

TanStack Query — Server State

TanStack Query is used for:

API fetching
caching
background refetching
polling simulation
request deduplication
loading/error state management

This significantly simplifies asynchronous state handling and improves user experience through built-in caching and automatic synchronization.

Examples of server state:

transactions
dashboard metrics
customer data
transaction history
Zustand — UI State

Zustand is used exclusively for lightweight client-side UI state.

Examples:

modal visibility
selected transaction
filters
pagination state
theme preferences

Server data is intentionally NOT stored in Zustand to maintain a clean architecture boundary.

This avoids:

duplicated state
stale data issues
unnecessary global complexity

4. Mock Data Strategy

The project uses mock data to simulate backend responses, allowing frontend development to proceed independently of API availability.

Mock data is centralized in dedicated files:

src/lib/transactions-data.ts
src/lib/mock-data.ts

This approach was chosen to:

decouple frontend development from backend
provide realistic sample data
enable rapid iteration
facilitate testing without external dependencies
simplify future API integration

The architecture follows this data flow:

Component → Hook → Mock Data / Future API
Mock Data Structure

Mock data includes:

Transaction records with full details (customer, amount, risk level, status, date)
Transaction history and timeline information
Risk indicators and severity levels
Dashboard metrics and chart data
Formatters and style mappings

Example:

const generatedTransactions = Array.from({ length: 28 }, (\_, index) => ({
id: `TXN-${10420 + index}`,
customerName: string,
amount: number,
riskLevel: "Low" | "Medium" | "High",
status: "Completed" | "Pending" | "Failed",
...
}));

Data Transformation

Hooks consume mock data and apply:

filtering logic
pagination
search capabilities
sorting
status transformations

This separation ensures mock data remains static while application logic handles dynamic state management.

Future API Integration

When a backend becomes available, mock data can be replaced with API calls while maintaining:

identical data shapes
same hook interfaces
no component changes
backward compatibility

5. Form Handling & Validation

Forms are built using:

React Hook Form
Zod schema validation

This combination provides:

performant forms
type-safe validation
predictable form state management
cleaner form logic

Validation schemas are colocated within each feature to improve maintainability and reuse.

6. Styling & UI System

The application uses Tailwind CSS for styling.

Reasons for this choice:

rapid UI development
consistent spacing and design tokens
responsive utility system
maintainable styling architecture
reduced CSS duplication

Reusable design patterns were extracted into shared components to ensure UI consistency across the application.

The interface was designed with:

responsive layouts
accessibility considerations
loading states
hover/focus states
dark mode support
clean spacing hierarchy

7. Responsive Design

The dashboard follows a mobile-first responsive strategy.

Layouts adapt across:

mobile devices
tablets
desktops
widescreen displays

Responsive considerations include:

flexible card grids
horizontally scrollable tables
adaptive spacing
collapsible layouts where appropriate

This ensures usability across varying screen sizes without sacrificing readability.

8. Loading, Error & Empty States

Every asynchronous UI includes:

loading skeletons
error handling
empty states

This was implemented to improve:

perceived performance
user feedback
interface clarity

The application avoids silent failures by ensuring all async operations surface meaningful feedback to the user.

9. Performance Considerations

Several optimizations were implemented to keep the interface responsive and scalable:

component splitting
lazy-loaded dialogs/modals
paginated transaction rendering
minimized unnecessary re-renders
query caching via TanStack Query

Heavy UI sections such as charts and transaction details are isolated to reduce rendering overhead.

10. Dark Mode Support

The application supports dark mode through a centralized theme provider.

This ensures:

consistent theming
accessible contrast ratios
reusable theme-aware components

Both light and dark themes were considered during component design to maintain readability and visual consistency.

11. Type Safety

TypeScript is used throughout the application to enforce strong typing across:

API responses
component props
hooks
services
utility functions
form schemas

Shared domain types are colocated within their respective features to reduce duplication and improve maintainability.

This improves:

developer experience
refactor safety
reliability
scalability

12. Developer Experience & Maintainability

The project emphasizes:

clean folder organization
reusable abstractions
strict separation of concerns
predictable naming conventions
scalable architecture patterns

The codebase was intentionally structured to remain:

easy to extend
easy to review
easy to onboard into
production-oriented

Engineering standards were enforced through a centralized INSTRUCTIONS.md file used to guide architectural consistency and AI-assisted development workflows.
