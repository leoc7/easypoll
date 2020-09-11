import styled from 'styled-components';

export const Container = styled.div`
    width: 1200px;
    margin: auto;

    & h1 {
        font-weight: 500;
    }

    @media only screen and (max-width: 600px) {
        width: 100%;

        & h1{
            text-align: center;
        }
    }
`;

export const PollCardList = styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0 50px 0;
    flex-wrap: wrap;
    justify-content: space-between;

    @media only screen and (max-width: 600px) {
        width: 100%;
        justify-content: center;
    }
`;

export const PollCard = styled.div`
    width: 280px;
    background: var(--bg1);
    padding: 20px 30px;
    margin-right: 10px;
    margin-bottom: 50px;

    & small {
        font-size: 12px;
        color: var(--white2);
    }

    & p {
        font-size: 18px;
        font-weight: 500;
    }
`;

export const PollCardFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
`;
