/**
 * Definition of all themes
 */

const activeTheme = 'default';

const themes = {
  default: {
    /* Primary Colors */
    'primary-500': '#0A21A8',
    'primary-400': '#3359DF',
    'primary-300': '#6C7ACB',
    'primary-200': '#9DA6DC',
    'primary-150': '#9B9DD4',
    'primary-125': '#6E71C6',
    'primary-100': '#CED3EE',
    'primary-75': '#F5F8FF',
    'primary-50': '#F9FBFF',

    /* Neutral Colors */
    'neutral-600': '#000000',
    'neutral-500': '#4A4B53',
    'neutral-400': '#737581',
    'neutral-350': '#9D9D9D',
    'neutral-300': '#E1E1E1',
    'neutral-200': '#F4F4F4',
    'neutral-100': '#FFFFFF',

    /* Secondary Colors */
    'secondary-500': '#FFAF30',

    /* Status Colors */

    /* Success */
    'success-200': '#367B48',
    'success-100': '#8AAE31',

    /* Error */
    'error-200': '#800A54',
    'error-100': '#DF1995',

    /* Typescale */

    /* H1 */
    h1: '3.5rem',
    h2: '2.44rem',
    h3: '1.95rem',
    h4: '1.56rem',
    h5: '1.25rem',

    /* Paragraph Text */
    paragraph: '1rem',

    /* Helper Text */
    helper: '0.8rem',

    /* Small Text */
    small: '0.64rem',

    /* Copyright */
    copy: '0.51rem',
  },
};

/**
 * An amount in pixels to be converted to rem
 * Base font size is assumed as 16px
 *
 * @param {number} pixelValue the value in pixels
 * @returns {number} the rem value
 */
export const remCalc = (pixelValue: number) => `${pixelValue / 16}rem`;

export default themes[activeTheme];
