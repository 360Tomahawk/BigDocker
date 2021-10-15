


export const Steps = [
    {
        id: 'intro',
        attachTo: { element: '.first-element', on: 'bottom' },
        buttons: [
            // {
            //     classes: 'shepherd-button-secondary',
            //     text: 'Exit',
            //     type: 'cancel'
            // },
            // {
            //     classes: 'shepherd-button-primary',
            //     text: 'Back',
            //     type: 'back'
            // },
            {
                classes: 'shepherd-button-primary',
                text: 'Next',
                type: 'next'
            }
        ],
        // classes: 'custom-class-name-1 custom-class-name-2',
        // highlightClass: 'highlight',
        // scrollTo: false,
        // cancelIcon: {
        //     enabled: true,
        // },
        title: 'Welcome to BigDocker!',
        text: ['BigDocker is a app to to help students learn about Data Science.'],
        when: {
            show: () => {
                console.log('show step');
            },
            hide: () => {
                console.log('hide step');
            }
        }
    },
    // ...
];