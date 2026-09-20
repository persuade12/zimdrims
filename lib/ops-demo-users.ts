export type OpsDemoUser = {
  username: string
  password: string
  displayName: string
  role: string
}

/** Demo-only credentials — shown on the login page. */
export const OPS_DEMO_USERS: OpsDemoUser[] = [
  {
    username: 'wonder.mufunda',
    password: 'Dcp@2026',
    displayName: 'Wonder Mufunda',
    role: 'DCP Administrator',
  },
  {
    username: 'neoc.officer',
    password: 'Ops@2026',
    displayName: 'NEOC Officer',
    role: 'NEOC Officer',
  },
]
