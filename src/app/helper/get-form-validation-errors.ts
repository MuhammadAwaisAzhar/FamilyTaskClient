import { FormGroup, ValidationErrors } from "@angular/forms";
import { AllValidationErrors } from "../interface/allValidationErrors";
export function getFormValidationErrors(myForm: FormGroup) {
  let errors: AllValidationErrors[] = [];
  Object.keys(myForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = myForm.get(key).errors;
    if (controlErrors != null) {
      Object.keys(controlErrors).forEach(keyError => {
        errors.push({
          key: key // insert a space before all caps
            .replace(/ID/g, "Id")
            .replace(/([A-Z])/g, " $1")
            // uppercase the first character
            .replace(/^./, function(str) {
              return str.toUpperCase();
            }),
          keyError: keyError.replace(/_/g, " "),
          error: controlErrors[keyError]
        });
      });
    }
    errors;
  });
  return errors;
}
