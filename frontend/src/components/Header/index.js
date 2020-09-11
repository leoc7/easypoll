import React from 'react';

import { Wrapper, Logo, Container, Nav, CreateAnchor } from './styles';
import { MdAdd } from 'react-icons/md';
export default function Header() {
    return (
        <Wrapper>
            <Container>
                <a href='/'>
                    <Logo src='/assets/logo.png' />
                </a>
                <Nav>
                    <CreateAnchor href='/create'>
                        Criar votação {''}
                        <MdAdd />
                    </CreateAnchor>
                </Nav>
            </Container>
        </Wrapper>
    );
}
