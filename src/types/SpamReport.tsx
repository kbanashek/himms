import {Reference} from '../types/Reference';
import {Payload} from '../types/Payload';

export interface SpamReport {
  blocked: boolean;
  resolved: boolean;
  id: string;
  source: string;
  sourceIdentityId: string;
  reference: Reference;
  state: string;
  payload: Payload;
  created: string;
}
