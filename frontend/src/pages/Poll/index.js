import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { Container, ChoiceList, Choice } from './styles';
import { Anchor } from '../../styles/common/input';
import { MdDone } from 'react-icons/md';
import moment from 'moment';
import PollContainerShimmer from '../../components/Shimmer/PollContainer';
require('moment/locale/pt-br');
moment.locale('pt-br');

export default function Poll({ match }) {
    const [poll, setPoll] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedChoice, setSelectedChoice] = useState(-1);

    function getPoll() {
        const pollId = match.params.id;

        API.get(`polls/${pollId}`).then(({ data }) => {
            setPoll({ ...data, date: moment(data.date).fromNow() });
            setLoading(false);
        });
    }

    function vote(choiceId) {
        if (selectedChoice !== -1) return;
        
        API.post(`polls/vote/`, {
            choice: choiceId,
            poll: poll.id,
        })
            .then(res => {
                setSelectedChoice(choiceId);
            })
            .catch(err => {
                alert('Ocorreu um erro ao votar');
            });
    }

    useEffect(getPoll, []);

    return (
        <Container>
            {loading ? (
                <PollContainerShimmer />
            ) : (
                <>
                    <h1>{poll.title}</h1>
                    <p className='date'>Criado {poll.date}</p>

                    <ChoiceList>
                        {poll.choices.map(choice => (
                            <Choice
                                key={choice.id}
                                selected={selectedChoice == choice.id}
                                onClick={() => vote(choice.id)}
                            >
                                <span>{choice.description}</span>
                                {selectedChoice == choice.id && (
                                    <span className='voted'>
                                        <MdDone /> Votado com sucesso
                                    </span>
                                )}
                            </Choice>
                        ))}
                    </ChoiceList>
                    <div className='anchor'>
                        <Anchor href={`${match.url}/results`}>
                            Ver resultados
                        </Anchor>
                    </div>
                </>
            )}
        </Container>
    );
}
