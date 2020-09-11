import styled from 'styled-components';

export const Wrapper = styled.div`
    margin-bottom: 120px;

    @media only screen and (max-width: 600px) {
        padding: 10px;
        margin-bottom: 50px;
    }
`;

export const Container = styled.div`
    width: 1200px;
    margin: auto;
    height: 80px;
    display: flex;
    justify-content: space-between;

    @media only screen and (max-width: 600px) {
        width: 100%;
    }
`;

export const Logo = styled.img`
    cursor: pointer;
    @media only screen and (max-width: 600px) {
        width: 70%;
        margin-top: 10px;
    }
`;

export const Nav = styled.div`
    display: flex;
    align-items: center;
`;

export const CreateAnchor = styled.a`
    text-decoration: none;
    color: var(--white1);
    font-size: 18px;
    font-weight: 400;
    height: 80px;
    display: flex;
    align-items: center;
    padding: 0 40px;
    transition: all 0.2s ease;

    & svg {
        margin-left: 10px;
    }

    &:hover {
        color: var(--white2);
    }

    @media only screen and (max-width: 600px) {
        width: 100%;
        text-align: center;
        padding: 5px;

        & svg {
            display: none;
        }
    }
`;
