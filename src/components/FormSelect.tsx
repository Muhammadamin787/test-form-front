/** @format */

import { ReactNode } from "react";
import { Form, Spinner } from "react-bootstrap";
import { ISector } from "../types";
import FormError from "./FormError";

interface IFormSelect {
    name: string;
    error: string;
    value: number;
    options: ISector[];
    isLoading: boolean;
    required?: boolean;
    onSelect: (v: number) => void;
}

function FormSelect({
    name,
    options = [],
    required = true,
    isLoading,
    value,
    error,
    onSelect,
}: IFormSelect) {
    // Functions
    const getSpace = (index: number) => {
        if (index < 2) return "";
        return Array(index)
            .fill(1)
            .map(() => "\u2003\u2003");
    };

    const makeOption = (sector: ISector, nestNumber: number): ReactNode => {
        if (sector.children.length) {
            nestNumber++;
            return sector.children.map((child) =>
                makeOption(child, nestNumber)
            );
        }
        return (
            <option value={sector.id} key={sector.id}>
                {getSpace(nestNumber)}
                {sector.name}
            </option>
        );
    };

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSelect(Number(e.target.value));
    };

    return (
        <div>
            <Form.Group className="d-flex">
                <Form.Select
                    name={name}
                    disabled={isLoading}
                    value={value}
                    required={required}
                    onChange={onChange}
                >
                    <option value={0}>Select a sector</option>
                    {options.map(makeOption, 0)}
                </Form.Select>
                <span>
                    {isLoading ? (
                        <Spinner
                            className="mx-2"
                            animation={"border"}
                            variant="primary"
                        />
                    ) : (
                        ""
                    )}
                </span>
            </Form.Group>
            <FormError message={error} />
        </div>
    );
}

export default FormSelect;
