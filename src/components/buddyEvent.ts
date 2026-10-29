// Window event that opens the Buddy chat; `question` (optional) is asked straight away.
export const OPEN_BUDDY_EVENT = 'open-buddy';

export type OpenBuddyDetail = { question?: string };

export function openBuddy(question?: string) {
  window.dispatchEvent(new CustomEvent<OpenBuddyDetail>(OPEN_BUDDY_EVENT, { detail: { question } }));
}
