import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { IFormFieldProps } from '@interfaces/ComponentProps/IFormFieldProps';
import React from 'react';

const FormField: React.FC<IFormFieldProps> = ({ label, field }) => {
  return (
    <FormControl>
      {label && (
        <FormLabel mb={4} fontSize="14px">
          {label}
        </FormLabel>
      )}
      {field}
    </FormControl>
  );
};

export default FormField;
