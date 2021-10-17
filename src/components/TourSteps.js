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