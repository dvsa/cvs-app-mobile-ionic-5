const { SENTRY_ORG, SENTRY_AUTH_TOKEN } = process.env;

export const sentryFile = `
defaults.url=https://sentry.io/
defaults.org=${SENTRY_ORG}
defaults.project=vehicle-testing-application
auth.token=${SENTRY_AUTH_TOKEN}
cli.executable=node_modules/@sentry/cli/bin/sentry-cli
`;
