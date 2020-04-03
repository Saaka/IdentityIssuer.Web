import {themes} from './themes.js';

class ThemeHelper {

    updateCurrentTheme = (themeName) => {

        const selectedTheme = themes.find(t =>
            t.name.toLowerCase() === themeName.toLowerCase()) || {};
        const html = document.getElementsByTagName('html')[0];

        Object.keys(selectedTheme).forEach((property, i) => {
            if (property === 'name')
                return;
            
            html.style.setProperty(property, selectedTheme[property]);
        });
    }
}

export {ThemeHelper};