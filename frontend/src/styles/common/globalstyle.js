import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    html, body, #root {
        width: 100%;
        height: 100%;
        font-family: 'Ubuntu';
        background: var(--bg0);
        color: var(--white1);
        -webkit-font-smoothing: antialiased;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
    }

    :root {
        --bg0: #121212; 
        --bg1: #202020;
        --bg2: #2B2B2B;
        --bg3: #333333;
        --white0: rgba(255, 255, 255, 1);
        --white1: rgba(255, 255, 255, .87); 
        --white2: rgba(255, 255, 255, .60); 
        --white3: rgba(255, 255, 255, .3);
        --blue1: #0384fc;
        --blue0: #0462ba;
        --shimmer0: #5b5b5b;
        --shimmer1: #8e8e8e;
    }

    @keyframes shimmer {
        0% {
            background-position: -468px 0;
        }
        
        100% {
            background-position: 468px 0; 
        }
    }    
    
`;
