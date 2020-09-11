import styled from 'styled-components';

export const Container = styled.div`
    width: 300px;
    background: var(--bg1);
    height: 120px;
    padding: 20px 30px;
    margin-right: 50px;
    margin-bottom: 50px;

    & div {
        margin-bottom: 10px;
    }
`;

export const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
`;
