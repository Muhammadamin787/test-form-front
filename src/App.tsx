/** @format */

import { Container } from "react-bootstrap";
import "./styles/app.scss";
import "./styles/media.scss";
import UserForm from "./components/UserForm/UserForm";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <main>
            <Container className={"form-container"}>
                <UserForm />
            </Container>
            <Toaster />
        </main>
    );
}

export default App;
