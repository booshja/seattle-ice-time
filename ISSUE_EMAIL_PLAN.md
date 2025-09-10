### Plan: Send an email alongside creating a GitHub issue

This plan adds a server-side email notification when the Issue form is submitted and a GitHub issue is successfully created. It renders the email template on the server (no component passing from client to server) using `@react-email/render` and sends via SES using the existing `sendEmail` helper.

### Key idea

- Do not pass React components through `useActionState` to the server action.
- Pass only serializable fields via `FormData`.
- Render the email template on the server with `@react-email/render` and send using `sendEmail` from `src/lib/aws/emailSender.ts`.

### Prerequisites

- Ensure these env vars are configured in the deployment environment:
    - `GITHUB_ISSUE_TOKEN`
    - `AWS_ACCESS_KEY`, `AWS_SECRET_KEY`, `AWS_REGION`
    - `EMAIL_FROM_ADDRESS`, `EMAIL_TO_ADDRESS`
- SES sandbox note: if your SES account is in sandbox, `EMAIL_TO_ADDRESS` must be verified.

### Steps

1. Install server-side email rendering

- Add the render utility for React Email:

```bash
npm i @react-email/render
```

2. (Optional) Extend the Issue form to capture reporter email

- Add a non-required `email` input to `IssueForm` so we can populate the template’s `email` prop.

```tsx
// In src/components/Form/IssueForm/IssueForm.tsx, inside <FormStyled>
<LabelStyled htmlFor="email">
    Email (optional):
    <LabelDetailsStyled>
        If you want a follow-up, leave your email
    </LabelDetailsStyled>
</LabelStyled>
<InputStyled type="email" id="email" name="email" placeholder="you@example.com" />
```

3. Render and send the email in the server action

- Update `src/actions/createGithubIssue.ts` to render the template and send after a successful GitHub issue creation.

```ts
import { render } from "@react-email/render";
import { FeedbackEmail } from "@/components/Email/FeedbackEmail";
import { sendEmail } from "@/lib"; // re-exports aws/emailSender

export async function createGithubIssue(_: any, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const reporterEmail = (formData.get("email") as string) || "unknown@seattle-ice-time";

  // 1) Create the GitHub issue (existing axios call)
  const res = await axios.post(/* ...existing config... */);

  if (res.status === 201) {
    // 2) Render and send the email
    const html = render(
      <FeedbackEmail
        email={reporterEmail}
        feedbackMessage={`${title}\n\n${description}`}
      />
    );

    try {
      await sendEmail({ subject: `New Issue: ${title}`, content: html });
    } catch (err) {
      // Do not fail the overall submission if email fails after issue creation
      console.error("Email send failed", err);
    }

    return { message: "Issue created successfully" };
  }

  return { message: "Issue creation failed" };
}
```

4. Error handling policy

- Treat email sending as “best-effort” after a successful issue creation. If sending fails, log and still return success to the client.

5. Optional: Use the issue-specific email template

- If you prefer a richer email with an issue link, swap to `IssueEmail` (already in `src/components/Email/IssueEmail.tsx`). After creating the issue, pull the `html_url` from the GitHub response:

```ts
const issueLink = res.data.html_url as string;
const html = render(
  <IssueEmail title={title} description={description} issueLink={issueLink} />
);
await sendEmail({ subject: `New Issue: ${title}`, content: html });
```

### Security and privacy

- Never expose `GITHUB_ISSUE_TOKEN` to the client; keep all network calls and rendering on the server.
- Consider redacting PII in the email if the `description` may contain sensitive data.

### Testing checklist

- Local/dev: point to a test repo or fork; set all required env vars.
- Verify GitHub issue is created with correct title/body.
- Verify email reception and formatting (SES sandbox requires verified recipient).
- Simulate email failure (e.g., unset an AWS var) and confirm UI still shows success after issue creation.

### Rollback

- This change is isolated to the server action and optional form field. To rollback email sending, remove the import/usage of `render`, `FeedbackEmail`, and `sendEmail` from `createGithubIssue`.
