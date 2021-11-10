import { Tour, Step } from "react-rtg";
import "react-rtg/build/index.css";

export const TourGuide = ({ isOpen, setOpen }) => {
    return (
        <Tour isOpen={isOpen}
            onClose={setOpen.bind(null, false)}
            onOpen={setOpen.bind(null, true)}>
            <Step placement="center">
                Welcome to BigDocker!
            </Step>
            <Step selector=".darkmodeStuff" placement="bottom-left">
                Here you can toggle dark mode
            </Step>
            <Step selector=".loginButton" placement="right">
                We recommend logging in for the best user experience
            </Step>
            <Step selector=".btnHelp" placement="right">
                Need help with coding? Click here!
            </Step>
            <Step selector=".btnSandbox" placement="right">
                Ready to start coding? Click here!
            </Step>
            <Step placement="center" closeOnBackdrop={true}>
                Have a great time!
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
                You can upload your files here
            </Step>
            <Step placement="center">
                Once you've uploaded a file, you should get a URL pointing to your file
            </Step>
            <Step placement="center">
                Copy this link, you can use this link in the sandbox to reference your files!
            </Step>
            <Step selector="center" placement="center">
                    For example, <br/>
                    import pandas as pd<br/>
                    df = pd.read_csv('INSERT YOUR LINK HERE')<br/>
                    df.head()<br/>
            </Step>
            <Step selector=".cellsdropdown"placement="right">
                Need more cells? Add them here!<br/>
                Want less cells? Remove them here!
            </Step>
            <Step placement="center" closeOnBackdrop={true}>
                Have a great time!
            </Step>
        </Tour>
    )
};