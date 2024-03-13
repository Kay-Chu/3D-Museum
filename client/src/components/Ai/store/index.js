import { proxy } from 'valtio';

const state = proxy({
  intro: true,
  color: '#EFBD48',
  isLogoTexture: false,
  isFullTexture: true,
  logoDecal: '/img/logo.svg',
  fullDecal: '/img/logo.svg',
});

export default state;