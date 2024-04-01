import { proxy } from 'valtio';

const state = proxy({
  intro: true,
  color: '#ffffff',
  isLogoTexture: false,
  isFullTexture: true,
  logoDecal: '/img/logo.svg',
  fullDecal: '/img/logo.svg',
});

export default state;