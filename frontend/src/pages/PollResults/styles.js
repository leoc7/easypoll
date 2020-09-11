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
    
    & .apexcharts-legend-text {
        color: var(--white1) !important;
    }

    & .anchor {
        margin-top: 20px;
    }

    @media only screen and (max-width: 600px) {
        position: relative;
        left: 0;
        top: 0;
        transform: none;
        width: 100%;
        background: none;
        padding-top: 0;
    }
`;

export const ProgressWrapper = styled.div`
  margin: 20px 0;
`;

export const ProgressHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;