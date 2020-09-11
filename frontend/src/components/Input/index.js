import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { InputGroup } from './styles';


export default function Input({ name, input, ...rest }) {
    const inputRef = useRef(null);
    const { fieldName, defaultValue, registerField, error, clearError } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    const element = React.cloneElement(input, {
        ref: inputRef,
        defaultValue,
        errored: (!!error).toString(),
        onKeyDown: clearError,
        ...rest,
    });

    return (
        <InputGroup>
            {element} {error && <span>* {error}</span>}
        </InputGroup>
    );
}
