import styled from 'styled-components';

export const Container = styled.div`
    background: var(--bg1);
    width: 400px;
    margin: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    padding: 30px;
    color: var(--white1);

    & input {
        background: var(--bg2);
        border: 2px solid transparent;
        height: 40px;
        padding: 10px 20px;
        width: 100%;
        transition: all 0.2s ease;
        color: var(--white1);
    }

    & input:focus {
        border: 2px solid var(--blue1);
        border-radius: 3px;
    }

    & button {
        background: var(--blue1);
        height: 40px;
        border-radius: 5px;
        border: none;
        width: 100%;
        color: var(--white1);
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    & button.dark {
        background: var(--bg3);
    }

    & button.dark:hover {
        background: #242424;
    }

    & button:hover {
        background: var(--blue0);
    }

    & h2 {
        margin-bottom: 20px;
    }

    @media only screen and (max-width: 600px) {
        position: relative;
        left: 0;
        top: 0;
        transform: none;
        width: 100%;
        background: none;
    }
`;

export const ChoiceList = styled.div`
    margin: 20px 0;
`;

export const Choice = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;

    & button {
        width: 40px;
    }

    & input {
        width: 280px;
    }

    @media only screen and (max-width: 600px) {
        & input {
            width: 240px;
        }
    }
`;
