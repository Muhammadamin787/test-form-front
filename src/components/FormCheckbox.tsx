/** @format */

import { Form } from "react-bootstrap";
import FormError from "./FormError";

interface IFormCheckbox {
    label: string;
    name: string;
    error: string;
    checked: boolean;
    placeholder?: string;
    required?: boolean;
    isLoading: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function FormCheckbox({
    label,
    name,
    checked,
    error,
    isLoading,
    onChange,
    required = true,
}: IFormCheckbox) {
    return (
        <Form.Group
            style={{ display: "flex", gap: "12px", alignItems: "center" }}
        >
            <Form.Check
                required={required}
                type="checkbox"
                name={name}
                disabled={isLoading}
                checked={checked}
                style={{ position: "relative", top: "1px" }}
                id={"form-id-" + name}
                onChange={onChange}
            />
            <Form.Label
                htmlFor={"form-id-" + name}
                style={{ position: "relative", top: "4px" }}
            >
                {label}
            </Form.Label>
            <FormError message={error} />
        </Form.Group>
    );
}

export default FormCheckbox;
