import React from 'react';
import ReactDOM from 'react-dom';
import {I18nextProvider} from 'react-i18next';
import i18n from './shared/i18n';
import App from './app/App';
import './index.css';
import {SessionProvider} from "./shared/providers/context/session.provider";

ReactDOM.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18n}>
            <SessionProvider>
                <App/>
            </SessionProvider>
        </I18nextProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
