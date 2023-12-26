/** @format */

import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import useSectors from "../../services/useSectors";
import useUser from "../../services/useUser";
import { IUser } from "../../types";
import FormCheckbox from "../FormCheckbox";
import FormItem from "../FormItem";
import FormSelect from "../FormSelect";
import "./UserForm.scss";

type ChangeEventType = ChangeEvent<HTMLInputElement>;

const errorValues = {
    name: "",
    sector_id: "",
    is_agreed: "",
};

function UserForm() {
    // States
    const [errors, setErrors] = useState(errorValues);

    // Queries
    const { sectors = [], isFetchingSectors } = useSectors();
    const { user, setUser, postData, isFetchingUsers } = useUser();

    // Functions
    const onSubmit = (userData: IUser) => {
        postData(userData);
    };

    const onChange = (e: ChangeEventType) => {
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const onSelect = (sector_id: number) => {
        setUser((prev) => ({
            ...prev,
            sector_id,
        }));
    };

    const onIsAgreeChange = (e: ChangeEventType) => {
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target && e.target?.checked,
        }));
    };

    const isValid = (err: typeof errorValues) =>
        !err.name && !err.is_agreed && !err.sector_id;

    const validate = () => {
        const errors = { ...errorValues };
        if (!user.name.length) errors.name = "Name is required";
        if (user.sector_id === 0) errors.sector_id = "Sector is required";
        if (!user.is_agreed) errors.is_agreed = "Checkbox is required";

        if (isValid(errors)) {
            setErrors(errorValues);
            return true;
        }

        setErrors(errors);
        return false;
    };

    const handler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) onSubmit(user);
    };

    return (
        <Form
            noValidate
            validated={!isValid(errors)}
            onSubmit={handler}
            className="user-form"
            style={{
                color: isFetchingUsers ? "#777" : "#000",
            }}
        >
            <div className="user-form__body">
                <h4>
                    Please enter your name and pick the Sectors you are
                    currently involved in.
                </h4>
                <FormItem
                    label="Name:"
                    type="text"
                    name="name"
                    value={user.name}
                    isLoading={isFetchingUsers}
                    onChange={onChange}
                    error={errors.name}
                    placeholder="name"
                />
                <FormSelect
                    name="sector_id"
                    options={sectors}
                    value={user.sector_id}
                    error={errors.sector_id}
                    isLoading={isFetchingSectors}
                    onSelect={onSelect}
                />
                <FormCheckbox
                    label="Agree to terms"
                    name="is_agreed"
                    checked={!!user.is_agreed}
                    error={errors.is_agreed}
                    isLoading={isFetchingUsers}
                    onChange={onIsAgreeChange}
                />
            </div>
            <Button
                disabled={isFetchingUsers || isFetchingSectors}
                type="submit"
                className="form-submit"
            >
                Save
            </Button>
        </Form>
    );
}

export default UserForm;
