import { AbstractControl } from "@angular/forms";
export interface AllValidationErrors {
  key: string;
  keyError: string;
  error: any;
}

export interface FormGroupControls {
  [key: string]: AbstractControl;
}
