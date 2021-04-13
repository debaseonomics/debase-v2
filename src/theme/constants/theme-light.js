const THEME_DARK = {

    colors: {
        baseBackground: '#0C0815',
        baseText: '#FFFFFF',
        
        primary: '#F96CC3',
        primaryLight: '#FCE7F8',
        primaryDark: '#C918DB',
    
        secundary: '#50FEF4',
        secundaryLight: '#83FFF8',
        secundaryDark: '#4699E2',
    
        error: '#FF2F6D',
        success: '#B0FF8B'
    },

    shadows: {
        base: `0 0 10px #FFFFFFCC`,
        primary: `
            outset box-shadow(0 0 10px #F96CC3),
            outset box-shadow(0 0 50px #C918DB),
            inset box-shadow(0 0 10px #F96CC3),
            inset box-shadow(0 0 50px #C918DB)
        `,
        secundary: `
            outset box-shadow(0 0 10px #F96CC399)
        `,
    }

};

export default THEME_DARK;