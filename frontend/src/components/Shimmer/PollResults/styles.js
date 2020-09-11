import styled from 'styled-components';

export const Container = styled.div`
    & div {
        margin-bottom: 10px;
    }
`;

export const ResultList = styled.div`
    margin: 20px 0 !important;

    & div {
        margin-bottom: 20px;
    }
`;

export const Chart = styled.div`
    display: flex;
    padding: 0 10px;
    justify-content: space-between;

    & .chart-labels {
        display: flex;
        flex-direction: column;
        width: 100px;
        margin-top: 20px;
        padding-left: 20px;
    }
`;
