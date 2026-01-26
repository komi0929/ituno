# PROJECT_RULES.md - Absolute Development Constitution

> [!IMPORTANT]
> This document defines the **NON-NEGOTIABLE** rules for all development in this project.
> Any deviation from these rules is considered a critical failure.

## 1. Zero-Placeholder Policy (完全実装の義務)
- **Forbidden**: `// TODO`, `// FIXME`, "Rest to be implemented...", `console.log("Not implemented")`
- **Mandate**: All code must be fully functional and production-ready immediately. If a feature is too large, break it down, but never leave half-baked code.
- **Mocking**: If external APIs are unavailable, create *fully functional* mock services, not just empty returns.

## 2. 120% Precision & Safety (超堅牢性)
- **Strict Typing**: `noImplicitAny` is absolute. Explicit schema validation (Zod) is required for all inputs.
- **Error Handling**: Every `await` must be wrapped in `try/catch` or result-type handling. No unhandled promise rejections.
- **Edge Cases**: Must verify empty states, loading states, and error states for *every* UI component.

## 3. Self-Verification First (自己検証の徹底)
- **Verification**: Never report "Done" without proof.
- **Mechanism**:
  1. Automated: Run tests (`npm test`).
  2. Manual: Verify via Puppeteer or manual steps.
  3. Visual: Check UI for broken layouts or unstyled elements.
- **Report**: Final reports must include *evidence* of verification (screenshots, logs).

## 4. Premium Design Standard (圧倒的品質)
- **Aesthetics**: "Good enough" is rejected. It must be "Wow".
- **Interaction**: Hover states, transitions, and loading skeletons are mandatory for interactive elements.
- **Mobile**: Responsive design is not optional; it is a primary requirement.

## 5. Documentation & Transparency (完全な透明性)
- **Plan**: Never write code without an approved `implementation_plan.md`.
- **Commits**: Atomic commits with conventional commits format (`feat:`, `fix:`, `chore:`).
- **Logs**: Keep `walkthrough.md` updated with every significant change.

---

**Signed by**: Antigravity (Agent)
**Enforced by**: User Mandate
