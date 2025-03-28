'use client';
//React Imports
import {useRef} from 'react';

//React Hook Form imports
import type { UseFormRegister, SubmitHandler, UseFormHandleSubmit, UseFormTrigger, UseFormGetValues, UseFormSetValue, FieldValues, FieldErrors, UseFormSetError, UseFormStateReturn, UseFormSetFocus } from "react-hook-form";

//Mui imports
import { Box } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import Tooltip from '@mui/material/Tooltip';

//local imports
import IconButton from './IconButton';
import CommonButton from './CommonButton';

interface FormFields {
  name: string;
  placeholder?: TextFieldProps['placeholder'];
  fullWidth?: TextFieldProps['fullWidth'];
  helperText?: TextFieldProps['helperText'];
  label?: TextFieldProps['label'];
  type: TextFieldProps['type']; //enables html type attribute for form validation of different input value types
  required?: boolean;
}

interface FormButton {
  text: string;
  variant?: 'text' | 'outlined' | 'contained';
}

interface RHTTextFieldFormProps {
  fields: FormFields[];
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onSubmit: SubmitHandler<any>;
  errors: FieldErrors;
  setError: UseFormSetError<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  setFocus: UseFormSetFocus<FieldValues>;
  formState: UseFormStateReturn<FieldValues>;
  button: FormButton;
}

//Uncontrolled TextField that allows react-hook-form to register the input field
//The input field is uncontrolled because the value is not stored in the component state
//This component is ideal for forms with many fields
export default function RHFTextFieldForm({fields, register, handleSubmit, onSubmit, errors, setError, setFocus, trigger, getValues, setValue, formState, button = {text: '', variant: 'outlined'}}: RHTTextFieldFormProps) {
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({}); //stores the input field refs

  const handleClear = (name: string) => {
    setValue(name, '');   
    setTimeout(() => setFocus(name), 0); // set focus to the input field
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => {
        const fieldError = errors[field.name];
        const errorMessage =
          typeof fieldError?.message === 'string' ? fieldError.message : '';

        const registration = register(field.name);

        return(
          <Box sx={{marginTop: '20px'}} key={index}>
            <TextField
            {...registration}
            inputRef={(el) => {
              inputRefs.current[field.name] = el;
              registration.ref(el); // ensure RHF gets the ref too
            }}
            onBlur={async (e) => {
              registration.onBlur(e); 
              await trigger(field.name);
              const currentValue = getValues(field.name); 
              if (field.required && !currentValue) {
                setError(field.name, {
                  type: 'required',
                  message: 'This field is required',
                });
              }
            }}
            placeholder={field.placeholder}
            error={!!errorMessage}
            required={field.required}
            fullWidth={field.fullWidth}
            helperText={errorMessage || field.helperText}
            label={field.label}
            type={field.type}
            size="small"
            InputLabelProps={{color: "primary"}}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {errorMessage ? (
                    <Tooltip title={errorMessage}><ErrorOutlineOutlinedIcon /></Tooltip>
                  ) : <IconButton icon={<CancelOutlinedIcon />} onMouseDown={() => handleClear(field.name)} size="small" color='success' />}
                </InputAdornment>
              ),
            }}
          />
          </Box>
        )
    })}
       <Box sx={{marginTop: '20px'}}>
        <CommonButton text={button.text} type='submit' variant={button.variant} disabled={!formState.isValid}/>
      </Box>
    </form>
  );
}
