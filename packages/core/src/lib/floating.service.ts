import { Injectable } from '@angular/core';
import { autoUpdate, computePosition } from './type';

@Injectable()
export class FloatingService {
  computePosition = computePosition;
  autoUpdate = autoUpdate;
}

