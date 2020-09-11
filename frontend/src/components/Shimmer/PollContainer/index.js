import React from 'react';
import { Container, ChoiceList, Footer } from './styles';
import { Line } from '../Skeleton';

export default function PollContainerShimmer() {
    return (
        <Container>
            <Line />
            <Line width='30%' />
            <ChoiceList>
                <Line height='50px' />
                <Line height='50px' />
                <Line height='50px' />
                <Line height='50px' />
            </ChoiceList>
            <Footer>
                <Line width='150px' />
            </Footer>
        </Container>
    );
}
