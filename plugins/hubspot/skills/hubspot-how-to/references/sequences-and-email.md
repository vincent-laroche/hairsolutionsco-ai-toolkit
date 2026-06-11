# Sequences & Email — HubSpot How-To

## Create an Email Sequence

Sequences are 1:1 sales emails sent from your connected inbox (not marketing blasts).

1. **Automation → Sequences → Create sequence**
2. Choose: **Automated** (runs on schedule) or **Manual** (you approve each send)
3. Add steps: Email / Call reminder / Task / LinkedIn task
4. For each email: set delay, write subject + body, add personalization tokens
5. Set **business hours** sending (recommended)
6. Save and activate

**Enroll a contact:** Open contact → Actions → Enroll in sequence → pick sequence → confirm

## Create a Marketing Email

1. **Marketing → Email → Create email**
2. Choose: **Regular** (one-time) or **Automated** (triggered by workflow)
3. Build with drag-and-drop or HTML editor
4. Set From name, From email, Subject, Preview text
5. Personalization: `{{ contact.firstname }}`
6. Test: **Preview** + **Send test email**
7. Regular: Schedule or send immediately / Automated: Save and use in workflow

## Create an Email Template

1. **Conversations → Templates → New template**
2. Write subject + body with personalization tokens
3. Save — available in sequences and 1:1 emails

## Email Defaults

[PLACEHOLDER — add your From name, From email, reply-to, signature template]

## Compliance

- Marketing emails auto-include unsubscribe link (required)
- Sequences: contacts who reply or book are auto-unenrolled
- Never send to contacts with `Email opt-out = true`
