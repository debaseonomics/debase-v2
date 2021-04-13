import { debaseLogoPNG, degovLogoPNG, daiLogoPNG, mph88LogoPNG, placeholderTokenPNG } from '@assets';

/* import styles */
import { StyledToken } from './token.styles';

const Token = props => {

    const { type, gutter } = props;

    switch(type) {
        case 'debase': return (
            <StyledToken 
                title="Debase"
                src={debaseLogoPNG}
                alt="Debase"
                style={{ 
                    margin: `${gutter}px`
                }}
            />
        )
        case 'degov': return (
            <StyledToken 
                title="Degov"
                src={degovLogoPNG}
                alt="Degov"
                style={{ 
                    margin: `${gutter}px`
                }}
            />
        )
        case 'dai': return (
            <StyledToken 
                title="Dai"
                src={daiLogoPNG}
                alt="Dai"
                style={{ 
                    margin: `${gutter}px`
                }}
            />
        )
        case 'mph88': return (
            <StyledToken 
                title="Mph88"
                src={mph88LogoPNG}
                alt="mph88"
                style={{ 
                    margin: `${gutter}px`
                }}
            />
        )
        case 'placeholder': return (
            <StyledToken 
                src={placeholderTokenPNG}
                alt="placeholder"
                style={{ 
                    margin: `${gutter}px`
                }}
            />
        )
        default: return (
            <StyledToken 
                src={placeholderTokenPNG}
                style={{ 
                    margin: `${gutter}px`
                }}
            />
        )
    }

};

Token.defaultProps = {
    type: 'debase',
    gutter: 6
};

export default Token;