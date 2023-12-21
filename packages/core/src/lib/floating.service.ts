import { Injectable } from '@angular/core';
import { computePosition, autoUpdate } from './type';

@Injectable()
export class FloatingService {
  computePosition = computePosition;
  autoUpdate = autoUpdate;
}

