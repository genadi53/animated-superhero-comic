import gsap from 'gsap/all';
import config from '../config';
import { getRandomInt } from './utils';

/**
 * App entry point.
 * All configurations are described in src/config.js
 */
export default class Application {
  constructor() {
    this.config = config;
    this.data = { };
  }
}

