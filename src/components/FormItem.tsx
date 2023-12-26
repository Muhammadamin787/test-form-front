/** @format */

import { InputHTMLAttributes } from "react";
import { Form } from "react-bootstrap";
import FormError from "./FormError";

interface IFormItem {
    label: string;
    name: string;
    value: string;
    error: string;
    required?: boolean;
    isLoading?: boolean;
    type: InputHTMLAttributes<HTMLInputElement>["type"];
    placeholder?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

function FormItem({
    label,
    type,
    isLoading,
    name,
    value,
    error,
    placeholder,
    required = true,
    onChange,
}: IFormItem) {
    return (
        <Form.Group>
            <Form.Label htmlFor={"form-id-" + name}>{label}</Form.Label>
            <Form.Control
                disabled={isLoading}
                type={type}
                value={value}
                required={required}
                id={"form-id-" + name}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
            />
            <FormError message={error}/>
        </Form.Group>
    );
}

export default FormItem;
