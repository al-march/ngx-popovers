import { Injectable } from '@angular/core';
import { computePosition } from './type';

@Injectable()
export class FloatingService {
  computePosition = computePosition;
}

