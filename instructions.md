# FRONTEND ENGINEERING STANDARD

---

# PROJECT ARCHITECTURE

STACK:

- Next.js App Router
- TypeScript
- Tailwind CSS
- TanStack Query
- Zustand (UI state only)
- React Hook Form
- Zod
- Framer Motion
- Recharts

---

# CORE ARCHITECTURE PRINCIPLE

STRICT SEPARATION OF RESPONSIBILITIES

UI Layer → Hooks → Services → API Layer

ENFORCEMENT:

- Components MUST NEVER fetch directly
- Hooks MUST NEVER contain JSX
- Services MUST NEVER import React
- API layer MUST NEVER contain transformations
- Server state MUST NEVER enter Zustand

---

# COMPONENT CLASSIFICATION

ONLY 3 VALID COMPONENT TYPES EXIST

## 1. UI COMPONENT

PURPOSE:

- presentation only

RULES:

- no hooks
- no API calls
- no business logic
- props in → UI out

VALID:

/components/ui
/components/charts
/components/feedback

---

## 2. FEATURE COMPONENT

PURPOSE:

- feature orchestration

RULES:

- may use hooks
- may compose UI components
- may contain feature logic
- MUST stay feature-scoped

VALID:

/features/transactions/components

---

## 3. LAYOUT COMPONENT

PURPOSE:

- spacing
- positioning
- responsiveness
- page shells

RULES:

- no business logic
- no API calls

---

# FILE SIZE RULES

SOFT LIMIT:

- 120 lines

HARD LIMIT:

- 200 lines

MAX LIMIT:

- 300 lines ONLY if justified

ABSOLUTE LIMIT:

- 350 lines forbidden

---

# COMPLEXITY RULE

A FILE MUST BE SPLIT when containing more than ONE of:

- form handling
- API integration
- table logic
- modal logic
- chart logic
- animations
- business logic

EVEN IF FILE IS SMALL.

---

# JSX RULES

## MAX JSX DEPTH

LIMIT:

- nesting depth = 3

IF EXCEEDED:

- extract child component

---

## NO BUSINESS LOGIC INSIDE JSX

INVALID:

```tsx
{
  user.status === "active" ? "Active" : "Inactive";
}
```

## ERROR HANDLING RULE

RULE: CENTRALIZED_ERROR_HANDLER

- All API errors MUST pass through getApiErrorMessage

UTILITY:

export function getApiErrorMessage(error: unknown): string {
if (error && typeof error === "object" && "data" in error) {
const data = (error as { data?: any }).data;

    if (!data) return "Request failed.";

    if (typeof data.message === "string") return data.message;

    if (typeof data.error === "string") return data.error;
    if (typeof data.error === "object" && data.error?.message) {
      return data.error.message;
    }

    if (typeof data.detail === "string") return data.detail;

    if (Array.isArray(data.detail) && data.detail[0]?.msg) {
      return data.detail[0].msg;
    }

    if (typeof data === "object") {
      for (const key in data) {
        const value = data[key];

        if (Array.isArray(value) && typeof value[0] === "string") {
          return value[0];
        }
      }
    }

    if (Array.isArray(data) && typeof data[0] === "string") {
      return data[0];
    }

    try {
      return JSON.stringify(data);
    } catch {
      return "Request failed.";
    }

}

return "Request failed.";
}

---

RULE: ERROR_USAGE

VALID:
onError: (error) => {
toast.error(getApiErrorMessage(error))
}

---
