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

interface ControlledTextFieldProps {
    initialValue: TextFieldProps['value'];
    placeholder?: TextFieldProps['placeholder'];
    fullWidth?: TextFieldProps['fullWidth'];
    helperText?: TextFieldProps['helperText'];
    label: TextFieldProps['label'];
    required?: TextFieldProps['required']; //enables html required attribute for form validation
    type: TextFieldProps['type']; //enables html type attribute for form validation of different input value types
    pattern?: string; //enables html pattern attribute for regex matching of input values
    title?: string; //html attribute, message if the regex pattern isn't matched
    inputRef?: React.RefObject<HTMLInputElement>;
    parentErrorMessage?: string; //passed from parent only if the onParentBlur prop is used
    onParentBlur?: (value: string) => void; //optional prop to control form validation from parent
}

//Controlled TextFields keep your application state in sync with user input on every keystroke, providing more granular control and easier data-flow tracking.
// Ideal for dynamic or complex forms requiring immediate validation or updates, or where you need the value in real-time to update other parts of the app.
export default function ControlledTextField({initialValue, placeholder, fullWidth, helperText, label, required=false, type, pattern, title="", inputRef, parentErrorMessage, onParentBlur}: ControlledTextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [value, setValue] = useState(initialValue || '');
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
    setValue('');
    setTimeout(() => {
      if (finalRef.current) {
        finalRef.current.focus();
      }
    }, 0);
  };

  return (
        <TextField
          inputRef={finalRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
          InputLabelProps={{color: "primary"}}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {(parentErrorMessage || errorMessage) && !isFocused ? (
                  <Tooltip title={parentErrorMessage || errorMessage}><ErrorOutlineOutlinedIcon /></Tooltip>
                ) : <IconButton icon={<CancelOutlinedIcon />} onMouseDown={handleClear} size="small" color='success' />}
              </InputAdornment>
            ),
          }}
        />
  );
}
