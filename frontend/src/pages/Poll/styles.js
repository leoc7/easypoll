import styled, { css } from 'styled-components';

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

    & h1 {
        font-size: 24px;
    }

    & p.date {
        font-size: 12px;
        font-weight: 300;
        color: var(--white2);

        margin-top: 7px;
    }

    & .anchor {
        text-align: center;
        width: 100%;
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

export const Choice = styled.div`
    background: var(--bg2);
    width: 100%;
    height: 50px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-weight: 500;
    border: 2px solid transparent;

    &:hover {
        background: var(--bg3);
    }

    ${p =>
        p.selected &&
        css`
            border: 2px solid var(--blue1);
            border-radius: 3px;
        `}

    & .voted {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    & .voted svg {
        margin-right: 10px;
    }
`;

export const ChoiceList = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 0;
`;
