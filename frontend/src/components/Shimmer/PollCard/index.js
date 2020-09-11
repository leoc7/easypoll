import React from 'react';
import { Container, Footer } from './styles';
import { Line } from '../Skeleton';

export default function PollCardShimmer() {
    return (
        <Container>
            <Line />
            <Line width='80%' />
            <Footer>
                <Line width='40%' />
                <Line width='30%' />
            </Footer>
        </Container>
    );
}
