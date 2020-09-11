import React from 'react';
import { Container, ResultList, Chart } from './styles';
import { Line, Circle } from '../Skeleton';

export default function PollResultsShimmer() {
    return (
        <Container>
            <Line />
            <ResultList>
                <Line height='50px' />
                <Line height='50px' />
                <Line height='50px' />
                <Line height='50px' />
            </ResultList>
            <Chart>
                <Circle height='220px' width='220px' />
                <div className='chart-labels'>
                    <Line />
                    <Line />
                    <Line />
                    <Line />
                </div>
            </Chart>
        </Container>
    );
}
