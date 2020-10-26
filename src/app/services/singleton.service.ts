import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SingletonService {
  type: string;
  searchModel: string = '';
  constructor() {}
}
