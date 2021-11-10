import { Tour, Step } from "react-rtg";
import "react-rtg/build/index.css";

export const TourGuide = ({ isOpen, setOpen }) => {
    return (
        <Tour isOpen={isOpen}
            onClose={setOpen.bind(null, false)}
            onOpen={setOpen.bind(null, true)}>
            <Step placement="center">
                <p>Welcome to BigDocker!</p>
            </Step>
            <Step selector=".darkmodeStuff" placement="bottom-left">
                <p>Here you can toggle dark mode</p>
            </Step>
            <Step selector=".loginButton" placement="right">
                <p>We recommend logging in for the best user experience</p>
            </Step>
            <Step selector=".btnHelp" placement="right">
                <p>Need help with coding? Click here!</p>
            </Step>
            <Step selector=".btnSandbox" placement="right">
                <p>Ready to start coding? Click here!</p>
            </Step>
            <Step placement="center" closeOnBackdrop={true}>
                <p>Have a great time!</p>
            </Step>
        </Tour>
    )
};

export const SandboxGuide = ({ isOpen, setOpen }) => {
    return (
        <Tour isOpen={isOpen}
            onClose={setOpen.bind(null, false)}
            onOpen={setOpen.bind(null, true)}>
            <Step selector=".filedropdown"placement="right">
                <p>You can upload your files here</p>
            </Step>
            <Step placement="center">
                <p>Once you've uploaded a file, you should get a URL pointing to your file</p>
            </Step>
            <Step placement="center">
                <p>Copy this link, you can use this link in the sandbox to reference your files!</p>
            </Step>
            <Step selector="center" placement="center">
                <p> 
                    For example, <br/>
                    import pandas as pd<br/>
                    df = pd.read_csv('INSERT YOUR LINK HERE')<br/>
                    df.head()<br/>
                </p>
            </Step>
            <Step selector=".cellsdropdown"placement="right">
                <p>Need more cells? Add them here!</p>
                <p>Want less cells? Remove them here!</p>
            </Step>
            <Step placement="center" closeOnBackdrop={true}>
                <p>Have a great time!</p>
            </Step>
        </Tour>
    )
};