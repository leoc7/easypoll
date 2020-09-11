import styled from 'styled-components';

export const Anchor = styled.a`
    transition: all 0.2s ease;
    color: var(--white2);
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    & svg {
        font-size: 18px;
        margin: 0 5px;
    }

    &:hover {
        color: var(--white3);
    }
`;
