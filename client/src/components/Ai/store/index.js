import { proxy } from 'valtio';

const state = proxy({
  intro: true,
  color: '#1c1c1c',
  isLogoTexture: false,
  isFullTexture: false,
  logoDecal: '/img/blue.jpeg',
  fullDecal: '/img/blue.jpeg',
});

export default state;