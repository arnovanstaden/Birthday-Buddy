import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [{
    directory: '../app/components',
    files: '**/*.stories.*',
  }],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
