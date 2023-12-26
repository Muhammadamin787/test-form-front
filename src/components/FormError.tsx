/** @format */

interface IFormError {
    message: string;
}
function FormError({ message }: IFormError) {
    if (!message) return "";
    return <span className="form-error">{message}</span>;
}

export default FormError;
