import {useEffect, useState} from "react";
import {IStateTheme, ITheme, ModeType, ResponsiveType} from "./interface.hooks";

export const useTheme = (): ITheme => {
    const theme = document.documentElement.classList.value || localStorage.theme || 'light';
    const [{isDark, currentTheme}, setIsDark] = useState<IStateTheme>({
        isDark: theme === 'dark',
        currentTheme: theme,
    });

    useEffect(() => {
        setTheme(localStorage.theme)
    }, [currentTheme])

    const setTheme = (theme: ModeType = 'light') => {
        localStorage.theme = theme;
        switch (theme) {
            case "light":
                document.documentElement.classList.remove('dark')
                document.documentElement.classList.add('light');
                setIsDark({isDark: false, currentTheme: theme});
                break;
            case "dark":
                document.documentElement.classList.remove('light')
                document.documentElement.classList.add('dark');
                setIsDark({isDark: true, currentTheme: theme});
                break
        }
    }

    return {
        isDark,
        setTheme,
        currentTheme,
    }
}

export const useResponsive = (): ResponsiveType => {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth)
            setHeight(window.innerHeight)
        });
    })

    return {
        width,
        height,
        isMobile: width > 0 && width < 768,
        tablet: width > 768 && width < 1024,
        xxl: width >= 1600,
        xl: width >= 1200,
        lg: width >= 992,
        md: width >= 768,
        sm: width >= 576,
        xs: width < 576,
        computer: width > 1024
    }
}
