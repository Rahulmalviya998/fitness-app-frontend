import React, { useState } from "react";
import LogIn from "./login";
import SignUp from "./signup";
import Forgetpass from "./forgetPass";
function Regispage({ onLogin }) {
    const [activeComponent, setActivecomponent] = useState('login');
    return (
        <div className="home-page-content">
            <div className="auth-section">
                {activeComponent === 'signup' && <SignUp setActivecomponent={setActivecomponent} />}
                {activeComponent === 'login' && <LogIn setActivecomponent={setActivecomponent} onLogin={onLogin} />}
                {activeComponent === 'forget' && <Forgetpass setActivecomponent={setActivecomponent} />}

            </div>
        </div>
    )

}
export default Regispage