import React, { Fragment, useEffect, useRef } from 'react';
import { useLottie } from 'lottie-react';
import Loading from '../../assets/Loading.json';
import LoadingBar from '../../assets/Loading-bar.json';
import Typed from 'typed.js';
import './loading.css';

function LoadingScreen() {
    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: [
                "Running cases...",
                "It's probably working(?)",
                "It's definitely working",
                "Trying our best out here"
            ],
            startDelay: 1000,
            typeSpeed: 100,
            backSpeed: 150,
            backDelay: 200,
            loop: true,
            smartBackspace: true,
        });

        return () => {
            typed.destroy();
        };
    }, []);

    const options1 = { animationData: Loading, loop: true };
    const options2 = { animationData: LoadingBar, loop: true };

    const animStyle1 = {
        width: '300px',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    };
    const animStyle2 = {
        width: '600px',
        left: "50%",
        position: "relative",
        transform: "translate(-50%,20%)"
    };

    const { View: LoadingAnimation } = useLottie(options1, animStyle1);
    const { View: LoadingBarAnimation } = useLottie(options2, animStyle2);

    return (
        <Fragment>
            <section className="loadBox">
                <button className="returnBtn2" onClick={() => window.history.back()}>Back</button>
                <h1 className="runTest">Running Tests</h1>
                {LoadingAnimation}
                <div className="typeAnimLoad">
                    <span ref={el} />
                </div>
                {LoadingBarAnimation}
            </section>
        </Fragment>
    );
}

export default LoadingScreen;
