// Converts rem -> px so the floating window renders identically on every site,
// even when a page changes its root font-size (rem would follow the host page).
const remToPx = () => ({
  postcssPlugin: 'type-b-rem-to-px',
  Declaration(decl) {
    if (decl.value.includes('rem')) {
      decl.value = decl.value.replace(/(-?\d*\.?\d+)rem\b/g, (_, n) => `${parseFloat(n) * 16}px`);
    }
  },
});
remToPx.postcss = true;

export default {
  plugins: [(await import('tailwindcss')).default, remToPx(), (await import('autoprefixer')).default],
};
