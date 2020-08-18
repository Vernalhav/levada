import React, { SelectHTMLAttributes, OptionHTMLAttributes } from 'react';

import './styles.css';

interface OptionProps extends OptionHTMLAttributes<HTMLOptionElement> {
    optKey: string;
    optLabel: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    name: string;
    options: Array<OptionProps>;
    initValueText?: string;
}

function Select({ label, name, options, initValueText, ...rest }: SelectProps): JSX.Element {
    return (
        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select id={name} {...rest}>
                {initValueText && (
                    <option value="" disabled hidden>
                        {initValueText}
                    </option>
                )}
                {options.map(({ optKey, optLabel, ...optRest }) => {
                    return (
                        <option key={optKey} value={optLabel} {...optRest}>
                            {optLabel}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}

export default Select;
