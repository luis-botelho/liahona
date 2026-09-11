import { describe, expect, it } from 'vitest';

import {
  canRecruiterSetStatus,
  canWorkerSetStatus,
  isApplicationStatus,
  isTerminalStatus,
} from './status.js';

describe('isApplicationStatus', () => {
  it('accepts all valid statuses', () => {
    for (const status of [
      'APPLIED',
      'REVIEWING',
      'INTERVIEW',
      'APPROVED',
      'REJECTED',
      'WITHDRAWN',
    ]) {
      expect(isApplicationStatus(status)).toBe(true);
    }
  });

  it('rejects unknown statuses', () => {
    expect(isApplicationStatus('ACCEPTED')).toBe(false);
    expect(isApplicationStatus('')).toBe(false);
  });
});

describe('canRecruiterSetStatus', () => {
  it('allows reviewing, interview, approved and rejected', () => {
    expect(canRecruiterSetStatus('REVIEWING')).toBe(true);
    expect(canRecruiterSetStatus('INTERVIEW')).toBe(true);
    expect(canRecruiterSetStatus('APPROVED')).toBe(true);
    expect(canRecruiterSetStatus('REJECTED')).toBe(true);
  });

  it('blocks applied, withdrawn and unknown statuses', () => {
    expect(canRecruiterSetStatus('APPLIED')).toBe(false);
    expect(canRecruiterSetStatus('WITHDRAWN')).toBe(false);
    expect(canRecruiterSetStatus('CLOSED')).toBe(false);
  });
});

describe('canWorkerSetStatus', () => {
  it('allows withdrawing an application', () => {
    expect(canWorkerSetStatus('WITHDRAWN')).toBe(true);
  });

  it('blocks worker from setting recruiter statuses', () => {
    expect(canWorkerSetStatus('REVIEWING')).toBe(false);
    expect(canWorkerSetStatus('APPROVED')).toBe(false);
  });
});

describe('isTerminalStatus', () => {
  it('flags approved, rejected and withdrawn as terminal', () => {
    expect(isTerminalStatus('APPROVED')).toBe(true);
    expect(isTerminalStatus('REJECTED')).toBe(true);
    expect(isTerminalStatus('WITHDRAWN')).toBe(true);
  });

  it('keeps active pipeline statuses as non-terminal', () => {
    expect(isTerminalStatus('APPLIED')).toBe(false);
    expect(isTerminalStatus('REVIEWING')).toBe(false);
    expect(isTerminalStatus('INTERVIEW')).toBe(false);
  });
});