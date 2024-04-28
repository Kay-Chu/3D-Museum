import { proxy } from 'valtio';

const state = proxy({
  intro: true,
  color: 'black',
  isLogoTexture: false,
  isFullTexture: false,
  logoDecal: '/img/blue.jpeg',
  fullDecal: '/img/lemon.jpeg',
});

export default state;