'use client';
//React Imports
import {useState, useRef} from 'react';

//Mui imports
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import Tooltip from '@mui/material/Tooltip';

//local components
import IconButton from './IconButton';

interface UncontrolledTextFieldProps {
    defaultValue?: TextFieldProps['defaultValue'];
    placeholder?: TextFieldProps['placeholder'];
    fullWidth?: TextFieldProps['fullWidth'];
    helperText?: TextFieldProps['helperText'];
    label?: TextFieldProps['label'];
    required?: TextFieldProps['required']; //enables html required attribute for form validation
    type: TextFieldProps['type']; //enables html type attribute for form validation of different input value types
    pattern?: string; //enables html pattern attribute for regex matching of input values
    title?: string; //html attribute, message if the regex pattern isn't matched
    inputRef?: React.RefObject<HTMLInputElement>;
    parentErrorMessage?: string; //passed from parent only if the onParentBlur prop is used
    onParentBlur?: (value: string) => void; //optional prop to control form validation from parent
}

//Uncontrolled TextFields let the browser manage the input’s internal state, simplifying the code but making it harder to track intermediate values or run real-time validations.
//Ideal for simpler or less interactive forms, or when you only need the value once the user has finished input (e.g., upon form submission).
export default function UncontrolledTextField({defaultValue,placeholder, fullWidth, helperText, label, required=false, type, pattern, title="", inputRef, parentErrorMessage, onParentBlur}: UncontrolledTextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const internalRef = useRef<HTMLInputElement>(null);
  const finalRef = inputRef || internalRef;

  const handleFocus = () => {
    setIsFocused(true);
  };

  //for use with single text field validation
  const handleSelfBlur = () => {
    setIsFocused(false);

    if(finalRef.current) {
      const value = finalRef.current.value.trim();

      //apply error message when required field is empty
      if (required && !value) {
        setErrorMessage("This field is required.");
        return;
      }

      //apply error message when regex pattern isn't matched
      if (pattern && value) {
        const regex = new RegExp(pattern);
        if (!regex.test(value)) {
            setErrorMessage(title || "Invalid input");
            return;
        }
      }

      //clear error message if all validation checks pass
      setErrorMessage("");
    }
  };

  //for use with complex form validation to prevent form submissions
  const handleBlur = () => {
    if (onParentBlur && finalRef.current) {
      onParentBlur(finalRef.current.value);
    } else {
      handleSelfBlur(); 
    }
};

  const handleClear = () => {
    setTimeout(() => {
      if (finalRef.current) {
        finalRef.current.value = '';
        finalRef.current.focus();
      }
    }, 0);
  };

  return (
        <TextField
          inputRef={finalRef}
          defaultValue={defaultValue}
          placeholder={placeholder}
          error={!!errorMessage || !!parentErrorMessage}
          required={required}
          fullWidth={fullWidth}
          helperText={parentErrorMessage || errorMessage || helperText}
          label={label}
          type={type}
          size="small"
          onFocus={handleFocus}
          onBlur={handleBlur}
          slotProps={{
            inputLabel: {color: "primary"},
            input: {endAdornment: (
              <InputAdornment position="end">
              {(parentErrorMessage || errorMessage) && !isFocused ? (
                <Tooltip title={parentErrorMessage || errorMessage}><ErrorOutlineOutlinedIcon /></Tooltip>
              ) : <IconButton icon={<CancelOutlinedIcon />} onMouseDown={handleClear} size="small" color='success' />}
            </InputAdornment>
            )}
          }}
        />
  );
}
