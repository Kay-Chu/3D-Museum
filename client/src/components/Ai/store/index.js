import { proxy } from 'valtio';

const state = proxy({
  intro: true,
  color: '#1c1c1c',
  isLogoTexture: false,
  isFullTexture: false,
  logoDecal: null,
  fullDecal: null,
});

export default state;